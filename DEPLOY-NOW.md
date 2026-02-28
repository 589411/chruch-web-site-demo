# 🚀 立即部署指南

網站已建置完成！選擇以下任一方式部署：

---

## ⚡ 方法一：Netlify Drop（最快，推薦）

### 步驟（只需 2 分鐘）：

1. **開啟 Netlify Drop**
   
   點擊： https://app.netlify.com/drop

2. **拖放資料夾**
   
   在 Finder 中開啟這個資料夾：
   ```
   /Users/jjaim2/github/chruch-web-site-demo/output/website/out
   ```
   
   將整個 `out` 資料夾**拖放**到瀏覽器視窗

3. **完成！**
   
   - 自動獲得網址：`https://random-name-123.netlify.app`
   - 可立即訪問
   - SSL 憑證自動配置

4. **（可選）自訂名稱**
   
   - 點擊 "Site settings"
   - 選擇 "Change site name"
   - 改成：`faith-hope-love-church` 或你想要的名稱
   - 新網址：`https://your-name.netlify.app`

---

## 🌐 方法二：GitHub + Netlify（自動部署）

### 步驟：

1. **推送到 GitHub**
   
   ```bash
   cd /Users/jjaim2/github/chruch-web-site-demo/output/website
   git init
   git add .
   git commit -m "Initial commit - Church website"
   git branch -M main
   git remote add origin https://github.com/你的帳號/church-website.git
   git push -u origin main
   ```

2. **連接 Netlify**
   
   - 訪問：https://app.netlify.com/start
   - 點擊 "Import from Git"
   - 選擇 GitHub
   - 選擇你的專案
   - 設定：
     - Build command: `npm run build`
     - Publish directory: `out`
   - 點擊 "Deploy site"

3. **完成**
   
   每次推送代碼，自動重新部署！

---

## 🔷 方法三：Vercel（也很好用）

### 使用 Vercel CLI：

```bash
cd /Users/jjaim2/github/chruch-web-site-demo/output/website

# 安裝 Vercel CLI
npm install -g vercel

# 部署
vercel --prod
```

跟隨指示登入並部署。

### 或使用 Git：

1. 推送到 GitHub（同上）
2. 訪問：https://vercel.com/new
3. 選擇你的 GitHub 專案
4. 點擊 "Import"
5. 點擊 "Deploy"

---

## 📦 方法四：GitHub Pages（免費）

### 步驟：

1. **修改配置**
   
   編輯 `next.config.js`，加入 `basePath`：
   ```js
   const nextConfig = {
     output: 'export',
     basePath: '/church-website',
     images: {
       unoptimized: true,
     },
     trailingSlash: true,
   }
   ```

2. **重新建置**
   
   ```bash
   npm run build
   ```

3. **安裝 gh-pages**
   
   ```bash
   npm install -g gh-pages
   ```

4. **部署**
   
   ```bash
   gh-pages -d out
   ```

5. **啟用 GitHub Pages**
   
   - 前往 GitHub 專案
   - Settings → Pages
   - Source 選擇 `gh-pages` 分支
   - 儲存

6. **訪問**
   
   `https://你的帳號.github.io/church-website/`

---

## 🎯 我的建議

### 最快方式：Netlify Drop
- ✅ 無需帳號（可匿名）
- ✅ 2 分鐘完成
- ✅ 自動 SSL
- ✅ 免費額度足夠

### 長期方案：GitHub + Netlify
- ✅ 自動部署
- ✅ 版本控制
- ✅ 團隊協作
- ✅ 免費

---

## 📍 部署後的網址

部署成功後，你會得到類似這樣的網址：

- **Netlify**: `https://faith-hope-love.netlify.app`
- **Vercel**: `https://church-website.vercel.app`
- **GitHub**: `https://username.github.io/church-website`

---

## 🔧 部署後檢查清單

訪問你的網站，檢查：

- [ ] 首頁正常顯示
- [ ] 所有 7 個頁面都可訪問
- [ ] 導航列連結正常
- [ ] 手機版選單正常
- [ ] 圖片正常載入
- [ ] 聯絡表單可使用
- [ ] 在手機上測試

---

## 🎨 部署後自訂網域（可選）

如果你有自己的網域（如 www.yourchurch.org）：

### Netlify：

1. 前往 Site settings → Domain management
2. 點擊 "Add custom domain"
3. 輸入你的網域
4. 按照指示設定 DNS：
   ```
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```

### Vercel：

1. 前往 Project settings → Domains
2. 點擊 "Add"
3. 輸入網域
4. 設定 DNS：
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

DNS 設定需要 24-48 小時生效。

---

## 📊 費用說明

### 完全免費的配置：

- ✅ **Netlify 免費版**：100GB 流量/月
- ✅ **Vercel 免費版**：100GB 流量/月
- ✅ **GitHub Pages**：1GB 空間
- ✅ **SSL 憑證**：自動免費

**估計流量**：
- 一般教會網站：< 10GB/月
- 完全在免費額度內！

### 需要付費的項目（可選）：

- 💰 **自訂網域**：$10-15/年（如 .org, .com）
- 💰 **進階功能**：$0（基本功能足夠）

---

## ❓ 需要協助？

### 如果遇到問題：

1. **查看部署日誌**
   - Netlify/Vercel 控制台會顯示錯誤

2. **常見問題**
   - 404 錯誤 → 檢查 `netlify.toml` 配置
   - 圖片不顯示 → 確認網路連線
   - 樣式跑版 → 清除瀏覽器快取

3. **使用 LLM**
   ```
   我部署遇到問題：[描述錯誤訊息]
   ```

---

## 🎉 立即開始

**最簡單的方式**：

1. 打開 Finder
2. 前往 `/Users/jjaim2/github/chruch-web-site-demo/output/website/out`
3. 開啟 https://app.netlify.com/drop
4. 拖放 `out` 資料夾
5. 完成！

---

**祝部署順利！** 🚀

有任何問題隨時詢問。
