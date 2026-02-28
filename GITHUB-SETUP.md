# 📦 GitHub 推送完整指南

本專案已完成本地 Git 初始化，現在只需要推送到 GitHub。

---

## ✅ 已完成步驟

```bash
✓ git init
✓ git add .
✓ git commit -m "Initial commit: Church Website SDD System with demo site"
✓ git branch -M main
```

**本地倉庫狀態**：
- 分支：`main`
- Commit：1 個（包含 17 個檔案，6845 行程式碼）
- 狀態：準備推送

---

## 🚀 推送到 GitHub

### 步驟 1：建立 GitHub Repository

1. **前往 GitHub**
   
   訪問：https://github.com/new

2. **設定 Repository**
   
   - **Repository name**: `church-website-sdd`（或你想要的名稱）
   - **Description**: `教會官網 SDD 建構系統 - Church Website Specification-Driven Development System`
   - **Public/Private**: 選擇 Public（公開）或 Private（私密）
   - **不要**勾選 "Add a README file"（我們已有 README）
   - **不要**勾選 "Add .gitignore"（已存在）
   - 點擊 **"Create repository"**

### 步驟 2：連接遠端倉庫

GitHub 會顯示指令，複製並執行：

```bash
cd /Users/jjaim2/github/chruch-web-site-demo

# 連接遠端倉庫（替換成你的 GitHub 帳號和專案名稱）
git remote add origin https://github.com/你的帳號/church-website-sdd.git

# 推送程式碼
git push -u origin main
```

**範例**（假設你的帳號是 `jjaim2`）：
```bash
git remote add origin https://github.com/jjaim2/church-website-sdd.git
git push -u origin main
```

### 步驟 3：驗證推送

推送成功後會顯示：

```
Enumerating objects: 20, done.
Counting objects: 100% (20/20), done.
Delta compression using up to 8 threads
Compressing objects: 100% (17/17), done.
Writing objects: 100% (20/20), 55.23 KiB | 5.52 MiB/s, done.
Total 20 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/你的帳號/church-website-sdd.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

### 步驟 4：確認

訪問你的 GitHub Repository：
```
https://github.com/你的帳號/church-website-sdd
```

應該可以看到：
- ✅ README.md 已顯示
- ✅ 所有檔案都在
- ✅ 17 個檔案，1 次 commit

---

## 🔄 之後的更新流程

當你修改專案後，使用以下指令推送更新：

```bash
# 1. 查看修改
git status

# 2. 加入所有變更
git add .

# 3. 提交變更（寫清楚你改了什麼）
git commit -m "新增功能：XXX"

# 4. 推送到 GitHub
git push
```

---

## 🌐 整合 Netlify 自動部署

推送到 GitHub 後，可以設定自動部署：

### 設定步驟：

1. **前往 Netlify**
   
   登入：https://app.netlify.com

2. **新增站點**
   
   - 點擊 "Add new site"
   - 選擇 "Import an existing project"
   - 選擇 "GitHub"

3. **選擇專案**
   
   - 授權 Netlify 訪問 GitHub
   - 選擇 `church-website-sdd`

4. **設定建置**
   
   - **Base directory**: `output/website`
   - **Build command**: `npm run build`
   - **Publish directory**: `output/website/out`
   - 點擊 "Deploy site"

5. **完成**
   
   之後每次 `git push`，Netlify 會自動重新部署！

---

## 📊 專案統計

### 檔案結構
```
church-website-sdd/
├── 17 個檔案
├── 6,845 行程式碼
├── 7 個完整頁面（示範網站）
└── 完整的 SDD 系統
```

### 主要內容
- ✅ 完整 README 與文檔
- ✅ SDD 建構系統
- ✅ Next.js 示範網站
- ✅ LLM 維護指令集
- ✅ 部署配置檔案

---

## 💡 實用技巧

### 查看 Git 狀態
```bash
git status          # 查看當前狀態
git log --oneline   # 查看提交歷史
git remote -v       # 查看遠端倉庫
```

### 分支管理
```bash
git branch              # 查看所有分支
git checkout -b dev     # 建立並切換到 dev 分支
git merge dev           # 合併 dev 到當前分支
```

### 撤銷操作
```bash
git restore <file>      # 撤銷檔案修改
git reset --soft HEAD~1 # 撤銷最後一次 commit（保留修改）
```

---

## 🔒 .gitignore 說明

專案已包含 `.gitignore`，以下檔案不會被推送：

```
node_modules/        # 依賴套件
output/              # 生成的網站（可選）
.env                 # 環境變數
.DS_Store            # macOS 系統檔案
*.log                # 日誌檔案
```

**注意**：`output/` 目錄被忽略，如果你想推送示範網站，需要移除 `.gitignore` 中的 `output/` 這行。

---

## ❓ 常見問題

### Q: 忘記 GitHub 帳號密碼怎麼辦？

**A**: 使用 Personal Access Token（PAT）：

1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. 選擇權限：`repo`
4. 複製 token
5. 推送時使用 token 作為密碼

### Q: push 被拒絕？

**A**: 可能是權限問題，確認：
```bash
git remote -v  # 檢查遠端 URL 是否正確
```

### Q: 想改 commit 訊息？

**A**: 如果還沒 push：
```bash
git commit --amend -m "新的訊息"
```

---

## 🎉 推送成功後

你的專案將可以：

1. ✅ **線上協作**：團隊成員可以一起開發
2. ✅ **版本控制**：追蹤所有修改歷史
3. ✅ **自動部署**：連接 Netlify 自動上線
4. ✅ **開源分享**：讓其他教會也能使用
5. ✅ **備份保護**：程式碼安全儲存在雲端

---

## 📞 需要協助？

如果推送遇到問題：

1. **檢查錯誤訊息**
   ```bash
   git push -v  # 顯示詳細資訊
   ```

2. **確認遠端倉庫**
   ```bash
   git remote -v
   ```

3. **使用 LLM 協助**
   ```
   我在 git push 時遇到錯誤：[貼上錯誤訊息]
   ```

---

**準備好了嗎？立即推送到 GitHub！**

```bash
# 建立 GitHub repo 後執行：
git remote add origin https://github.com/你的帳號/church-website-sdd.git
git push -u origin main
```

---

**最後更新**: 2024年1月  
**專案**: Church Website SDD System
