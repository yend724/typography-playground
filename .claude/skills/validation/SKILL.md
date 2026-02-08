---
name: validation
description: >
  Zod + neverthrow を使った入力バリデーション規約。
  バリデーションスキーマ、外部入力のパース、
  API/フォーム境界での Zod → Result ブリッジの実装時に適用する。
---

# バリデーション規約（Zod + neverthrow）

## 基本スキーマ

```ts
import { z } from "zod"

const UserInputSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().int().min(0).max(150),
})

type UserInput = z.infer<typeof UserInputSchema>
```

## Zod → Result ブリッジ

```ts
import { ok, err, Result } from "neverthrow"

type ValidationError = Readonly<{
  code: "VALIDATION"
  issues: readonly z.ZodIssue[]
}>

const parseWith = <T>(schema: z.ZodType<T>, data: unknown): Result<T, ValidationError> => {
  const result = schema.safeParse(data)
  return result.success
    ? ok(result.data)
    : err({ code: "VALIDATION", issues: result.error.issues })
}
```

## API ルート境界

```ts
const handleCreateUser = async (req: Request): Promise<Response> => {
  const body = await req.json()
  return parseWith(UserInputSchema, body)
    .asyncAndThen(createUser)
    .match(
      (user) => Response.json(user, { status: 201 }),
      (error) => Response.json({ error }, { status: 400 }),
    )
}
```

## Server Action 境界（Next.js）

```ts
"use server"

const PostSchema = z.object({
  title: z.string().min(1).max(200),
  body: z.string().min(1),
  tags: z.array(z.string()).max(5),
})

const createPost = async (formData: FormData) =>
  parseWith(PostSchema, { ...Object.fromEntries(formData), tags: formData.getAll("tags") })
    .asyncAndThen(savePost)
```

## スキーマの合成

```ts
const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  zip: z.string().regex(/^\d{3}-?\d{4}$/),
})

const OrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().positive(),
  })).min(1),
  shipping: AddressSchema,
  billing: AddressSchema.optional(),
})
```
