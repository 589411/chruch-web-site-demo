# 部署指南
## 如何將示範網站部署到網路

---

## 🎯 部署前準備

### 1. 確認網站已建置完成

```bash
cd output/website
npm install
npm run dev
```

開啟 http://localhost:3000 確認網站正常運作。

### 2. 測試生產版本

```bash
npm run build
```

確認無錯誤訊息。

---

## 🚀 方法一：Netlify（最簡單，推薦）

### A. 使用 Netlify Drop（拖放部署）

1. **建置網站**
   ```bash
   cd output/website
   npm run build
   ```

2. **前往 Netlify Drop**
   - 訪問 https://app.netlify.com/drop
   - 將 `out/` 資料夾拖放到頁面

3. **獲得網址**
   - 自動生成網址，例如：`random-name-123.netlify.app`
   - 可在設定中修改為自訂名稱

### B. 使用 Git 連接（自動部署）

1. **推送到 GitHub**
   ```bash
   cd output/website
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/你的帳號/專案名稱.git
   git push -u origin main
   ```

2. **連接 Netlify**
   - 登入 https://netlify.com
   - 點擊 "Add new site" → "Import an existing project"
   - 選擇 "GitHub" 並授權
   - 選擇你的專案

3. **設定建置**
   - Build command: `npm run build`
   - Publish directory: `out`
   - 點擊 "Deploy site"

4. **完成**
   - 等待 2-3 分鐘
   - 獲得網址：`your-site-name.netlify.app`

### C. 使用 Netlify CLI

1. **安裝 Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **登入**
   ```bash
   netlify login
   ```

3. **部署**
   ```bash
   cd output/website
   netlify deploy --prod
   ```

4. **選擇選項**
   - Create & configure a new site
   - 選擇團隊
   - 輸入網站名稱
   - Publish directory: `out`

---

## 🌐 方法二：Vercel

### A. 使用 Vercel CLI

1. **安裝 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **部署**
   ```bash
   cd output/website
   vercel --prod
   ```

3. **跟隨指示**
   - 登入 Vercel 帳號
   - 確認專案設定
   - 自動部署

### B. 使用 Git 連接

1. **推送到 GitHub**（同上）

2. **連接 Vercel**
   - 登入 https://vercel.com
   - 點擊 "Add New" → "Project"
   - 選擇 GitHub 專案
   - 點擊 "Import"

3. **自動偵測設定**
   - Vercel 會自動偵測 Next.js
   - 直接點擊 "Deploy"

---

## 📄 方法三：GitHub Pages

### 1. 修改配置

編輯 `output/website/next.config.js`：

```js
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: '/專案名稱', // ← 加上這行（如果不是根目錄）
}
```

### 2. 建置

```bash
cd output/website
npm run build
```

### 3. 推送到 gh-pages 分支

```bash
# 安裝 gh-pages
npm install -g gh-pages

# 部署
gh-pages -d out
```

### 4. 啟用 GitHub Pages

1. 前往 GitHub 專案設定
2. 找到 "Pages" 選項
3. Source 選擇 `gh-pages` 分支
4. 點擊 "Save"

### 5. 訪問網站

網址：`https://你的帳號.github.io/專案名稱/`

---

## 🎨 自訂網域

### Netlify

1. 前往 Site settings → Domain management
2. 點擊 "Add custom domain"
3. 輸入你的網域（例如：www.yourchurch.org）
4. 依照指示設定 DNS

### Vercel

1. 前往 Project settings → Domains
2. 點擊 "Add"
3. 輸入網域
4. 設定 DNS 記錄

### DNS 設定範例

在你的網域註冊商（如 GoDaddy、Namecheap）設定：

**Netlify:**
```
Type: CNAME
Name: www
Value: your-site-name.netlify.app
```

**Vercel:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## 🔒 SSL 憑證

所有平台都會**自動提供免費 SSL 憑證**：

- Netlify: Let's Encrypt（自動）
- Vercel: Let's Encrypt（自動）
- GitHub Pages: 支援 HTTPS（自動）

無需額外設定！

---

## 📊 部署平台比較

| 功能 | Netlify | Vercel | GitHub Pages |
|------|---------|--------|--------------|
| **免費額度** | 100GB/月 | 100GB/月 | 1GB 空間 |
| **自動部署** | ✅ | ✅ | ⚠️ 需手動 |
| **自訂網域** | ✅ 免費 | ✅ 免費 | ✅ 免費 |
| **SSL 憑證** | ✅ 自動 | ✅ 自動 | ✅ 自動 |
| **建置速度** | 快 | 快 | 中 |
| **難度** | ⭐ 簡單 | ⭐ 簡單 | ⭐⭐ 中等 |
| **適合對象** | 新手 | 開發者 | 開源專案 |

---

## ✅ 部署檢查清單

### 部署前

- [ ] 本地測試通過（`npm run dev`）
- [ ] 生產建置無錯誤（`npm run build`）
- [ ] 檢查所有連結正常
- [ ] 圖片正常顯示
- [ ] 手機版顯示正常

### 部署後

- [ ] 首頁可正常訪問
- [ ] 所有頁面可正常導航
- [ ] 表單可正常提交
- [ ] 在不同瀏覽器測試
- [ ] 在手機上測試
- [ ] Google 搜尋測試（1-2週後）

---

## 🐛 常見問題

### Q1: 部署後頁面 404

**A**: 檢查 `netlify.toml` 或部署設定中的 redirect 規則。

### Q2: 圖片無法顯示

**A**: 確認圖片路徑正確，使用絕對路徑或外部 URL。

### Q3: 樣式跑版

**A**: 清除瀏覽器快取，或使用無痕模式測試。

### Q4: 建置失敗

**A**: 
```bash
# 刪除快取重新安裝
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Q5: 自訂網域無法訪問

**A**: DNS 設定需要 24-48 小時生效，請耐心等候。

---

## 📈 部署後優化

### 1. 設定 Google Analytics

在 `src/app/layout.tsx` 加入：

```tsx
<Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
<Script id="google-analytics">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

### 2. SEO 優化

- 提交 sitemap 到 Google Search Console
- 設定 robots.txt
- 確保每頁都有適當的 meta 標籤

### 3. 效能優化

- 壓縮圖片
- 使用 WebP 格式
- 啟用快取

---

## 🆘 需要協助？

1. **查看文件**
   - [Netlify 文件](https://docs.netlify.com)
   - [Vercel 文件](https://vercel.com/docs)
   - [Next.js 部署指南](https://nextjs.org/docs/deployment)

2. **使用 LLM**
   ```
   我在部署時遇到問題：[描述問題]
   ```

3. **聯絡支援**
   - Email: support@church-sdd.org

---

## 🎉 完成範例

**成功部署的示範網站**：

- Netlify: `https://church-demo.netlify.app`
- Vercel: `https://church-demo.vercel.app`
- GitHub: `https://username.github.io/church-demo`

---

**最後更新**: 2024年1月  
**版本**: v1.0
