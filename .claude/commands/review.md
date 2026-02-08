---
description: コミット前のセルフレビューを実行する
argument-hint: "[レビュー対象のスコープやファイル]"
---

まず `.claude/skills/review/SKILL.md` を Read ツールで読み、チェックリストを把握すること。

## 手順

1. `git diff` または `git diff --staged` で変更差分を取得
2. `pnpm vitest run` でテスト pass を確認
3. `pnpm build` で型エラーがないことを確認
4. `pnpm lint` で静的解析を確認
5. スキルのチェックリストに従ってレビュー
6. 問題を重大度別（error / warn / info）に報告

## 引数

$ARGUMENTS が指定されていればレビュー対象のスコープとして使う。
