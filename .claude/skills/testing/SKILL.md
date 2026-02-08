---
name: testing
description: >
  Vitest を使った TypeScript テスト規約。
  テスト（.test.ts, .test.tsx）の作成・レビュー時に適用する。
  純関数テスト、Result 型テスト、React コンポーネントテスト、モックを規定。
---

# テスト規約（Vitest）

## 純関数

```ts
import { describe, it, expect } from "vitest"

describe("formatCurrency", () => {
  it("正の金額をフォーマットする", () => {
    expect(formatCurrency(1234.5)).toBe("$1,234.50")
  })

  it("0を処理する", () => {
    expect(formatCurrency(0)).toBe("$0.00")
  })
})
```

## Result 型

ok と err の両方のパスを明示的にテストする。

```ts
describe("validateEmail", () => {
  it("有効なメールで ok を返す", () => {
    const result = validateEmail("user@example.com")
    expect(result.isOk()).toBe(true)
    expect(result._unsafeUnwrap()).toBe("user@example.com")
  })

  it("無効なメールで err を返す", () => {
    const result = validateEmail("not-an-email")
    expect(result.isErr()).toBe(true)
    expect(result._unsafeUnwrapErr().code).toBe("INVALID_EMAIL")
  })
})
```

## ResultAsync

```ts
describe("fetchUser", () => {
  it("成功時にユーザーを返す", async () => {
    const result = await fetchUser("user-1")
    expect(result.isOk()).toBe(true)
    expect(result._unsafeUnwrap().id).toBe("user-1")
  })
})
```

## React コンポーネント（Testing Library）

実装ではなく振る舞いをテストする。

```tsx
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

describe("SearchForm", () => {
  it("送信時に onSearch をクエリ付きで呼ぶ", async () => {
    const onSearch = vi.fn()
    render(<SearchForm onSearch={onSearch} />)

    await userEvent.type(screen.getByRole("textbox"), "hello")
    await userEvent.click(screen.getByRole("button", { name: /search/i }))

    expect(onSearch).toHaveBeenCalledWith("hello")
  })
})
```

## ファイル配置

テストはソースファイルと同じ場所に。

```
features/auth/
├── validate.ts
└── validate.test.ts
```

## モック

モックは最小限に。モジュールモックより依存性注入を優先。

```ts
// 依存を注入 → フェイクでテスト
const fakeRepo: UserRepository = {
  findById: (id) => okAsync({ id, name: "Test" }),
}

const service = createUserService(fakeRepo)
const result = await service.getUser("1")
expect(result.isOk()).toBe(true)
```
