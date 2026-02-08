---
name: commit
description: >
  Git コミットメッセージの規約。Conventional Commits 形式、日本語。
  Apply when creating git commits, reviewing commit messages,
  or when the user asks to commit changes.
---

# Commit Conventions

Conventional Commits 形式。メッセージは日本語。

## フォーマット

```
<type>(<scope>): <subject>

<body>
```

- `scope` と `body` は任意
- `subject` は日本語、簡潔に（50文字以内目安）
- `body` は「なぜ」を箇条書き（`-`）で書く。「何を」はdiffで分かる

## Type 一覧

| Type | 用途 |
|------|------|
| `feat` | 新機能 |
| `fix` | バグ修正 |
| `refactor` | リファクタリング（機能変更なし） |
| `style` | フォーマット、セミコロン等（動作に影響なし） |
| `docs` | ドキュメントのみ |
| `test` | テストの追加・修正 |
| `chore` | ビルド、CI、依存関係等 |
| `perf` | パフォーマンス改善 |

## 例

```
feat(auth): ログイン画面にパスワードリセット機能を追加

- ユーザーからの問い合わせが多いため、セルフサービスで対応可能にする
```

```
fix(cart): 数量0の商品がカートに残る問題を修正
```

```
refactor(api): ユーザー取得処理をResult型に移行
```

```
chore: neverthrowとzodを依存関係に追加
```

## Breaking Changes

破壊的変更は `!` を付与し、body に `BREAKING CHANGE:` を記載。

```
feat(api)!: レスポンス形式をResult型ベースに変更

BREAKING CHANGE: エラーレスポンスの構造が { code, message } に統一された
```

## ルール

- 1コミット = 1つの論理的変更
- WIP コミットは `chore: WIP` で仮置き、後でsquash
- fixup/amend は直前のコミットに対してのみ
- コミット前に `git diff --staged` で差分を確認
- `Co-Authored-By` 行は付けない（自動挿入されるものも含め、一切禁止）
