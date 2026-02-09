---
name: review
description: コミット前のセルフレビュー。プロジェクトの規約に沿っているかチェックする。 Apply when the user asks to review code, check conventions, or requests a self-review before committing.
---

# セルフレビュー

コミット前に変更差分を規約に照らしてチェックする。

## 手順

1. `git diff` または `git diff --staged` で変更差分を取得
2. `pnpm eslint` で静的解析を実行し、エラー・警告を確認
3. 以下のチェックリストに従ってレビュー
4. 問題を **重大度別** に報告（error / warn / info）
5. 修正提案は具体的なコード例で示す

## チェックリスト

### 関数型スタイル (error)

- [ ] `function` 宣言が使われていないか → アロー関数に
- [ ] `class` が使われていないか → plain object + functions に
- [ ] 引数や戻り値が直接 mutate されていないか
- [ ] 広いスコープ（export）で `Readonly<>` / `readonly` が欠けていないか

### 型 (error)

- [ ] `any` が使われていないか → `unknown` + 型の絞り込みに
- [ ] `enum` が使われていないか → union type に
- [ ] `interface` がデータ型に使われていないか → `type` + `Readonly` に
- [ ] `export default` が使われていないか → named export に

### エラーハンドリング (error)

- [ ] モジュール境界で `throw` していないか → `Result` / `ResultAsync` に
- [ ] `try-catch` が安易に使われていないか → `ResultAsync.fromPromise` 等に

### 不変性 (warn)

- [ ] 配列の `.push()` / `.splice()` が外部に漏れていないか
- [ ] オブジェクトのプロパティを直接書き換えていないか → spread で新規作成
- [ ] ローカルスコープ内の一時的な mutation は許容

### 命名 (warn)

- [ ] ファイル名が kebab-case か
- [ ] boolean に `is` / `has` / `can` 接頭辞があるか
- [ ] イベントハンドラが `handle` 接頭辞、コールバック props が `on` 接頭辞か

### import (info)

- [ ] 順序: external → `@/` → relative → `import type`
- [ ] `import type` が使えるところで通常 import になっていないか

### バリデーション (warn)

- [ ] 外部入力（API, form）に Zod スキーマが適用されているか
- [ ] Zod の結果が Result 型に変換されているか

## 報告フォーマット

```
## レビュー結果

### error (修正必須)
- `src/features/auth/login.ts:15` — `function` 宣言 → アロー関数に変更
- `src/features/auth/login.ts:28` — `throw` → Result 型で返す

### warn (推奨)
- `src/components/user-list.tsx:8` — Props に `Readonly` が未適用

### info (参考)
- `src/lib/fetch.ts:3` — `import type` に変更可能
```

重大度の判断基準:
- **error**: 規約違反。コミット前に修正
- **warn**: 推奨だが、明確な理由があれば許容
- **info**: 改善提案。対応は任意
