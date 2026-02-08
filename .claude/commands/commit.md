---
description: コミット規約に従って git commit を実行する
argument-hint: "[コミットのヒントやスコープ]"
---

まず `.claude/skills/commit-conventions/SKILL.md` を Read ツールで読み、規約を把握すること。

## 手順

1. `git status` と `git diff` で変更内容を確認
2. `git log --oneline -5` で直近のコミットメッセージを確認
3. 規約に従ってコミットメッセージを作成
4. ステージング → コミット → `git status` で結果確認

## 引数

$ARGUMENTS が指定されていればコミット対象のスコープやヒントとして使う。
