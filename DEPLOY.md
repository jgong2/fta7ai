# DEPLOY — fta7ai.com 部署说明书（仓库自带真相 / self-contained）

> 目的：任何人（含未来断了记忆的 AI）打开这个仓库，**不依赖任何外部记忆**就能看懂"这是什么、怎么上线"。
> 最后更新：2026-07-14 · Steward: Jose (CTO)

---

## 这是什么 / What this repo is
这是公司正式站 **fta7ai.com** 的源码仓库（唯一真源）。
- 本地固定路径（**位置冻结**）：`/Users/jgtest/Documents/ob2026/CODE/fta7ai_site_repo/`
- 正本远程仓：`github.com/jgong2/fta7ai`，分支 `main`
- 首页 = 根目录 `index.html`；视频/海报在 `videos/`

## 怎么挂到域名 / Hosting
GitHub Pages 直出：`main` 分支根目录 → `fta7ai.com`。
- `CNAME` 文件内容 = `fta7ai.com`（**别删**，删了域名会掉）
- DNS：A 记录 `185.199.108.153`（GitHub Pages）；`www` CNAME → `jgong2.github.io`
- 推送 `main` 后约 1 分钟，线上生效。

## 上线动作 / Go-live（治理红线：由 Boss 亲手点）
1. 把最终版覆盖进根目录 `index.html`
2. `git add -A && git commit -m "..."` → `git push origin main`
3. 等 ~1 分钟，刷新 fta7ai.com 验收
- 推送凭证 PAT：`~/.github_fta7ai_token`（约 2026-10-11 到期，过期需 Boss 重发）
- **红线**：发布 = Boss 本人点，AI 只准备/暂存、不代推。

## 上线前必做：旧版存档 / Rollback safety
切换前给当前线上版打 tag：
`git tag pre-<date>-oldhome && git push origin --tags`
需要回滚时 `git checkout <tag> -- index.html` 再推。

## 预览怎么做（不碰正式站）/ Preview — independent, never touch prod
预览**绝不推 main、绝不覆盖 fta7ai.com**。用**独立**仓库：
- 仓库：`jgong2/fta7ai-preview`（单独一个 repo，无 CNAME）
- 地址：`https://jgong2.github.io/fta7ai-preview/`
- 预览单文件海报可引用现有 `https://fta7ai.com/videos/*_poster.jpg` 实资源，故预览可以是单个 index.html。

## 相关台账 / Cross-refs（在 Boss 电脑上，非本仓）
- 技术资产清单：`ob2026/CTO/Tech-Asset-Register.md`（#1/#4/#15/#16/#17）
- CTO 开机记忆：`ob2026/CTO/josememory.md`（在办主线）
- 发片流程：skill3 `web-publish-mp4`（SKILL.md §3 REPO 行须与本仓路径一致）
