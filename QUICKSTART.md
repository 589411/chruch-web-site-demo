# 快速開始指南
## 5分鐘上手教會官網 SDD 系統

---

## 🎯 三種使用方式

### 方式一：使用 LLM（最簡單，推薦）

1. **開啟專案**
   ```bash
   cd church-web-site-demo
   code .
   ```

2. **在 LLM 聊天視窗輸入**
   ```
   開始建立教會官網
   ```

3. **跟隨引導回答 24 個問題**
   - 階段 1：基礎資訊（8題）
   - 階段 2：核心功能（6題）
   - 階段 3：進階功能（5題）
   - 階段 4：部署設定（6題）

4. **完成後輸入**
   ```
   生成網站
   ```

5. **預覽網站**
   ```
   預覽網站
   ```

---

### 方式二：執行 CLI 工具

1. **安裝依賴**
   ```bash
   npm install
   ```

2. **啟動建構工具**
   ```bash
   npm run build:church
   ```

3. **跟隨終端機指示回答問題**

4. **生成網站**
   ```bash
   npm run generate
   ```

5. **啟動開發伺服器**
   ```bash
   npm run dev
   ```

---

### 方式三：直接編輯 JSON（適合進階使用者）

1. **複製範例檔案**
   ```bash
   cp examples/church-basic.example.json output/church-basic.json
   cp examples/core-features.example.json output/core-features.json
   ```

2. **編輯配置檔**
   - 使用任何文字編輯器開啟 `output/*.json`
   - 根據你的教會資訊修改

3. **驗證配置**
   ```bash
   npm run validate
   ```

4. **生成網站**
   ```bash
   npm run generate
   ```

---

## 📝 需要準備的資料

### 必備資料

- ✅ 教會全稱與簡稱
- ✅ 完整地址
- ✅ 主日崇拜時間
- ✅ 使命陳述（1-2句話）
- ✅ 主要牧者資訊（至少1位）
- ✅ 聯絡電話與 Email

### 建議準備

- 📷 教會 Logo（SVG 或 PNG）
- 📷 團隊成員照片（至少3位）
- 📷 教會環境照片（3-5張）
- 🔗 社交媒體帳號連結
- 🔗 Google Maps 連結

### 可之後補充

- 🎥 講道影片連結
- 💰 奉獻 QR Code
- 📅 Google Calendar 整合
- 📄 週報 PDF 檔案

---

## ⏱️ 時間預估

| 階段 | 問題數 | 預估時間 |
|------|--------|---------|
| 階段 1：基礎資訊 | 8題 | 30-45分鐘 |
| 階段 2：核心功能 | 6題 | 30-45分鐘 |
| 階段 3：進階功能 | 5題 | 45-60分鐘 |
| 階段 4：部署設定 | 6題 | 30-45分鐘 |
| **總計** | **25題** | **2.5-4小時** |

💡 **提示**：可以分多次完成，系統會自動儲存進度

---

## 🎨 選擇模板風格

系統提供三種風格模板：

### 現代風格 (Modern)
- 簡約設計
- 大量留白
- 無襯線字體
- 適合：年輕教會、都會型教會

### 優雅風格 (Elegant)
- 優雅設計
- 襯線字體
- 漸層效果
- 適合：中型教會、注重美感

### 傳統風格 (Traditional)
- 經典設計
- 深色系
- 莊重感
- 適合：歷史悠久教會、大型教會

💡 **提示**：風格可隨時切換，不影響內容

---

## 🚀 部署到網路

### 選項一：Netlify（推薦新手）

1. **註冊 Netlify 帳號**
   - 前往 https://www.netlify.com
   - 使用 GitHub 帳號註冊

2. **部署網站**
   ```bash
   npm run deploy:netlify
   ```

3. **獲得網址**
   - 自動網址：`your-church.netlify.app`
   - 可綁定自訂網域

**費用**：免費（100GB/月流量）

---

### 選項二：Vercel

1. **註冊 Vercel 帳號**
   - 前往 https://vercel.com
   - 使用 GitHub 帳號註冊

2. **部署網站**
   ```bash
   npm run deploy:vercel
   ```

**費用**：免費（100GB/月流量）

---

### 選項三：GitHub Pages

1. **推送到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/你的帳號/你的專案.git
   git push -u origin main
   ```

2. **啟用 GitHub Pages**
   - 前往 Repository Settings
   - 找到 Pages 選項
   - Source 選擇 `main` branch

**費用**：免費（1GB空間）

---

## 📱 測試清單

網站生成後，請測試以下項目：

### 基本功能
- [ ] 首頁正常顯示
- [ ] 導航列連結正常
- [ ] 手機版選單可開啟
- [ ] 頁尾資訊正確

### 內容檢查
- [ ] 教會名稱正確
- [ ] 地址與地圖正確
- [ ] 聚會時間正確
- [ ] 聯絡資訊正確

### 功能測試
- [ ] 聯絡表單可送出
- [ ] 社交媒體連結正常
- [ ] 圖片正常載入
- [ ] 手機版顯示正常

---

## 🔧 常用指令

```bash
# 啟動互動式建構工具
npm run build:church

# 驗證配置檔
npm run validate

# 生成網站
npm run generate

# 本地開發
npm run dev

# 建置生產版本
npm run build

# 部署到 Netlify
npm run deploy:netlify

# 部署到 Vercel
npm run deploy:vercel

# 備份資料
npm run backup

# 還原資料
npm run restore
```

---

## 💡 實用提示

### 如何暫停並稍後繼續？

系統會自動儲存進度到 `output/progress.json`，下次執行時會詢問是否繼續。

### 如何修改已完成的內容？

**方式一（使用 LLM）**：
```
修改教會電話為 02-1234-5678
```

**方式二（編輯 JSON）**：
1. 開啟 `output/complete-sdd.json`
2. 找到要修改的欄位
3. 儲存後執行 `npm run generate`

### 如何新增頁面？

使用 LLM 輸入：
```
新增一個「小組介紹」頁面
包含：小組名稱、聚會時間、聯絡人
```

### 如何更改配色？

使用 LLM 輸入：
```
把主色調改成深藍色 #1e40af
```

---

## 🆘 遇到問題？

### 常見問題

**Q: 執行 npm run build:church 出現錯誤**  
A: 請先執行 `npm install` 安裝依賴套件

**Q: 生成的網站無法啟動**  
A: 進入 `output/website` 資料夾，執行 `npm install`

**Q: 圖片無法顯示**  
A: 確認圖片路徑正確，且檔案已放入 `public/images/` 資料夾

**Q: 手機版顯示跑版**  
A: 清除瀏覽器快取，或使用無痕模式測試

### 獲得協助

1. **查看完整文件**
   - [SDD-GUIDE.md](./SDD-GUIDE.md) - 完整指引
   - [COMMANDS.md](./llm-commands/COMMANDS.md) - LLM 指令集

2. **詢問 LLM**
   ```
   我遇到問題：[描述問題]
   ```

3. **聯絡支援**
   - Email: support@church-sdd.org
   - GitHub Issues

---

## 🎉 完成後的下一步

### 1. 定期更新內容

使用 LLM 維護：
```
新增活動：母親節感恩禮拜，5月12日上午10點
上傳本週講道：標題「母親的信心」...
```

### 2. 監控網站流量

- Google Analytics（免費）
- Netlify Analytics（付費）

### 3. SEO 優化

```
更新首頁 SEO：
標題：台北信望愛基督教會 | 歡迎您
描述：位於台北市的基督教會...
```

### 4. 持續改進

收集會友回饋：
- 哪些資訊最常查詢？
- 手機版使用體驗如何？
- 需要新增哪些功能？

---

## 📚 延伸學習

### 推薦資源

- [Next.js 官方文件](https://nextjs.org/docs)
- [TailwindCSS 文件](https://tailwindcss.com/docs)
- [Web 無障礙指南](https://www.w3.org/WAI/)

### 進階功能

- 會員系統整合
- 線上直播
- 多語言切換
- 推送通知（PWA）

---

**準備好了嗎？立即開始！**

```bash
npm install
npm run build:church
```

或在 LLM 聊天視窗輸入：
```
開始建立教會官網
```

---

**最後更新**：2024年1月  
**版本**：v1.0
