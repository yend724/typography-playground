---
name: react
description: React / Next.js の TypeScript 規約。 コンポーネント（.tsx）、hooks、Server Components、Client Components、 Server Actions の実装時に適用する。
---

# React / Next.js 規約

## コンポーネント

アロー関数のみ。class コンポーネントと `React.FC` は禁止。

```tsx
type Props = Readonly<{
  title: string
  items: readonly string[]
  onSelect: (item: string) => void
}>

const UserList = ({ title, items, onSelect }: Props) => (
  <section>
    <h2>{title}</h2>
    <ul>
      {items.map((item) => (
        <li key={item}>
          <button type="button" onClick={() => onSelect(item)}>{item}</button>
        </li>
      ))}
    </ul>
  </section>
)
```

## Props

- `Readonly<{...}>` の type alias（interface は使わない）
- 配列は `readonly string[]`
- 引数で分割代入

## Hooks

```tsx
const useFilter = <T,>(items: readonly T[], predicate: (item: T) => boolean) =>
  useMemo(() => items.filter(predicate), [items, predicate])
```

## State — 常に不変

```tsx
setItems((prev) => [...prev, newItem])
setItems((prev) => prev.map((item) => item.id === id ? { ...item, done: true } : item))
```

## イベントハンドラ

実装は `handle` 接頭辞、props は `on` 接頭辞。

```tsx
const SearchForm = ({ onSearch }: Readonly<{ onSearch: (q: string) => void }>) => {
  const [query, setQuery] = useState("")
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }
  return (
    <form onSubmit={handleSubmit}>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
    </form>
  )
}
```

## Next.js Server Components（デフォルト）

純粋 — 副作用なし、hooks なし。データは直接 fetch。

```tsx
type PageProps = Readonly<{ params: Promise<{ slug: string }> }>

const ArticlePage = async ({ params }: PageProps) => {
  const { slug } = await params
  const article = await fetchArticle(slug)
  return <Article data={article} />
}
// Next.js のページは default export が必要
export default ArticlePage
```

## Next.js Client Components

- hooks やブラウザ API が必要な場合のみ `"use client"`
- 小さく、末端に配置

## Next.js Server Actions

Result 型で返す。境界でバリデーション。

```tsx
"use server"

import { ok, err, type Result } from "neverthrow"

const createPost = async (formData: FormData): Promise<Result<Post, ValidationError>> => {
  const parsed = parsePostInput(formData)
  if (parsed.isErr()) return err(parsed.error)
  const post = await db.post.create({ data: parsed.value })
  return ok(post)
}
```

## プロジェクト構成

```
src/
├── app/                    # ルート（App Router）
│   ├── layout.tsx
│   └── users/page.tsx
├── features/               # 機能モジュール（純粋ロジック + actions）
│   └── auth/
│       ├── validate.ts
│       └── actions.ts
├── components/             # 共有 UI コンポーネント
└── lib/                    # 共有ユーティリティ
```

機能ファースト。テストはソースと同じ場所に。純粋なコアを `features/` に、I/O は `app/` 境界に。
