---
name: typescript-conventions
description: 関数型プログラミングベースのTypeScriptコーディング規約。 TypeScriptコード（.ts/.tsx）の実装時に適用する。 型、アロー関数、Result型エラーハンドリング、不変性、命名、import、async、pipe/合成を規定。
---

# TypeScript 規約

## 基本原則

1. **純関数** — 副作用なし、同じ入力 = 同じ出力
2. **不変な値** — mutate せず、新しい値を導出する
3. **Result 型エラー** — throw せず `neverthrow` の Result で返す
4. **スコープ別厳格度** — モジュール境界では厳格に、ローカルでは柔軟に

## スコープ別厳格度

| スコープ | ルール |
|---------|--------|
| export / 公開 API | `Readonly<>`, `readonly` 配列, Result 戻り値, mutation 禁止 |
| モジュール内部 | Readonly 推奨、ローカル `let` は封じ込めれば可 |
| 関数ローカル | 外に漏れない一時的な mutation は許容 |

## 型

```ts
// interface ではなく type alias + Readonly
type User = Readonly<{
  id: string
  name: string
  roles: readonly string[]
}>

// 型の導出
type UserInput = Omit<User, "id">

// ドメインプリミティブにはブランド型
type Email = string & { readonly __brand: "Email" }

// enum ではなくユニオン型
type Status = "active" | "inactive" | "pending"

// 設定オブジェクトには as const satisfies
const ROUTES = {
  home: "/",
  user: (id: string) => `/users/${id}`,
} as const satisfies Record<string, string | ((...args: never[]) => string)>
```

## 関数

アロー関数を優先。`function` 宣言は非推奨。

```ts
export const formatName = (user: Readonly<{ first: string; last: string }>): string =>
  `${user.first} ${user.last}`

// 引数3つ以上 → パラメータオブジェクト
type SearchParams = Readonly<{ query: string; limit: number; offset: number }>
export const search = (params: SearchParams): ResultAsync<readonly User[], AppError> => { ... }
```

## エラーハンドリング (neverthrow)

```ts
import { ok, err, Result, ResultAsync } from "neverthrow"

// ドメインエラーは判別可能ユニオンで定義
type AppError =
  | Readonly<{ code: "NOT_FOUND"; id: string }>
  | Readonly<{ code: "VALIDATION"; message: string }>

// throw せず Result で返す
export const validateAge = (input: unknown): Result<number, AppError> => {
  const age = Number(input)
  return Number.isNaN(age) || age < 0
    ? err({ code: "VALIDATION", message: `Invalid age: ${input}` })
    : ok(age)
}

// andThen / map でチェーン
export const createUser = (input: RawInput): ResultAsync<User, AppError> =>
  validateInput(input).andThen(checkDuplicate).asyncAndThen(saveToDb)
```

## 不変性パターン

```ts
// 配列操作 — 常に新しい配列を返す
const addItem = <T>(items: readonly T[], item: T): readonly T[] => [...items, item]
const updateAt = <T>(items: readonly T[], i: number, fn: (v: T) => T): readonly T[] =>
  items.map((item, idx) => idx === i ? fn(item) : item)

// ローカルスコープの mutation は封じ込めれば OK
const buildLookup = (users: readonly User[]): ReadonlyMap<string, User> => {
  const map = new Map<string, User>()
  for (const u of users) map.set(u.id, u)
  return map
}
```

## 非同期 (ResultAsync)

```ts
// 並行
const result = await ResultAsync.combine([fetchUser(id), fetchOrders(id)])
result.map(([user, orders]) => ({ user, orders }))

// 逐次
const result = await validateInput(raw)
  .asyncAndThen(findUser)
  .andThen(checkPermission)
  .asyncAndThen(execute)
```

## Pipe / 合成

```ts
const pipe = <T>(value: T, ...fns: readonly ((v: T) => T)[]): T =>
  fns.reduce((acc, fn) => fn(acc), value)

const processName = (raw: string) =>
  pipe(raw, (s) => s.trim(), (s) => s.toLowerCase(), (s) => s.replace(/\s+/g, "-"))
```

## 命名

| 種類 | 規則 | 例 |
|------|------|-----|
| ファイル | kebab-case | `format-date.ts` |
| 関数 / 変数 | camelCase | `formatDate` |
| 真偽値 | `is`/`has`/`can` 接頭辞 | `isActive` |
| ファクトリ | `create` 接頭辞 | `createService` |
| 定数 | UPPER_SNAKE_CASE | `MAX_RETRY` |
| 型 | PascalCase | `UserProfile` |
| イベントハンドラ | `handle` 接頭辞 | `handleSubmit` |
| コールバック props | `on` 接頭辞 | `onSubmit` |

## Import 順序

external → `@/` エイリアス → 相対パス → `import type`

```ts
import { z } from "zod"
import { ok, type Result } from "neverthrow"

import { parseWith } from "@/lib/zod-utils"

import { validate } from "./validate"

import type { User } from "./types"
```

## 禁止事項

- `function` 宣言 → アロー関数を使う
- `class` → plain object + functions
- `enum` → ユニオン型
- `any` → `unknown` + 型の絞り込み
- データ型の `interface` → `type` + `Readonly`
- 期待されるエラーの `throw` → Result
- `export default` → named export
- ミュータブルなグローバル状態
