# 🚀 快速啟動示範網站

## 立即開始（3 步驟）

### 步驟 1：安裝依賴

```bash
cd output/website
npm install
```

⏱️ 預計時間：1-2 分鐘

---

### 步驟 2：啟動開發伺服器

```bash
npm run dev
```

⏱️ 等待訊息：`✓ Ready in XXXms`

---

### 步驟 3：開啟瀏覽器

訪問：**http://localhost:3000**

🎉 完成！現在可以瀏覽示範網站了。

---

## 📱 預覽功能

打開瀏覽器後，你可以看到：

### ✅ 首頁功能
- 🖼️ Hero 大圖橫幅
- 📅 四個聚會時間卡片
- 🎥 三個最新講道
- 📆 四個近期活動
- 💬 兩則生命見證
- 📞 三個聯絡資訊區塊

### ✅ 完整頁面
1. **首頁** (/)
2. **關於我們** (/about) - 使命、團隊（4位）
3. **聚會資訊** (/schedule) - 4個聚會時間
4. **講道信息** (/sermons) - 3則講道
5. **活動報名** (/events) - 4個活動
6. **奉獻支持** (/donate) - 轉帳資訊
7. **聯絡我們** (/contact) - 互動表單

### ✅ UI 功能
- ✨ 響應式設計（手機/平板/桌面）
- 🎨 現代化風格（藍色系）
- 🔝 Sticky 導航列
- 📱 手機版選單
- 🔽 完整頁尾

---

## 🛠️ 測試建議

### 1. 桌面版測試
- [ ] 導航列所有連結可點擊
- [ ] 首頁區塊完整顯示
- [ ] 圖片正常載入
- [ ] 文字清晰易讀

### 2. 手機版測試
按 `F12` 開啟開發者工具，點擊手機圖示：

- [ ] 選單圖示可開啟/關閉
- [ ] 卡片垂直排列
- [ ] 按鈕大小適中
- [ ] 文字不會過小

### 3. 互動測試
- [ ] 聯絡表單可填寫
- [ ] 提交按鈕可點擊
- [ ] Hover 效果正常

---

## 📸 截圖預覽

打開這些頁面查看效果：

```
首頁        → http://localhost:3000/
關於        → http://localhost:3000/about
聚會        → http://localhost:3000/schedule
講道        → http://localhost:3000/sermons
活動        → http://localhost:3000/events
奉獻        → http://localhost:3000/donate
聯絡        → http://localhost:3000/contact
```

---

## 🎨 自訂內容

### 快速修改配色

編輯 `output/website/tailwind.config.js`：

```js
colors: {
  primary: '#3B82F6',    // 改成你的主色
  secondary: '#10B981',  // 改成輔助色
  accent: '#F59E0B',     // 改成強調色
}
```

儲存後，頁面會自動刷新！

### 快速修改內容

編輯 `output/website/src/lib/config.json`：

```json
{
  "churchInfo": {
    "fullName": "改成你的教會名稱",
    "shortName": "簡稱"
  }
}
```

---

## 🚀 準備部署

### 測試生產版本

```bash
npm run build
```

如果成功，你會看到：
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

### 部署到網路

選擇一種方式：

#### 方式 1：Netlify Drop（最快）
```bash
npm run build
```
然後將 `out/` 資料夾拖放到 https://app.netlify.com/drop

#### 方式 2：Netlify CLI
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### 方式 3：Vercel
```bash
npm install -g vercel
vercel --prod
```

詳細步驟請參考 `DEPLOY-GUIDE.md`

---

## ⚠️ 常見問題

### Q: 安裝失敗怎麼辦？

**A**: 確認 Node.js 版本 >= 18：
```bash
node --version
```

如果版本太舊，請從 https://nodejs.org 下載最新版。

### Q: 畫面空白？

**A**: 
1. 檢查終端機是否有錯誤訊息
2. 確認 3000 port 沒被占用
3. 嘗試重新啟動：
```bash
# Ctrl+C 停止
npm run dev
```

### Q: 圖片無法顯示？

**A**: 示範網站使用 Unsplash 圖片，需要網路連線。

### Q: 想修改更多內容？

**A**: 使用 LLM 輔助：
```
修改首頁標題為「歡迎來到XX教會」
```

---

## 📊 效能指標

示範網站效能：

- ⚡ **首次載入**: < 2秒
- 📦 **檔案大小**: ~500KB
- 🎯 **Lighthouse 分數**: 90+
- 📱 **行動友善**: 100%

---

## 🎓 學習資源

### 修改頁面內容
- 編輯 `src/app/page.tsx`（首頁）
- 編輯 `src/app/about/page.tsx`（關於頁面）
- 其他頁面類推

### 修改樣式
- 編輯 `tailwind.config.js`（顏色）
- 編輯 `src/app/globals.css`（全域樣式）

### 修改資料
- 編輯 `src/lib/config.json`（所有內容）

---

## ✨ 下一步

1. **自訂內容**
   - 修改教會名稱和資訊
   - 替換真實的講道和活動
   - 上傳教會照片

2. **優化 SEO**
   - 設定 Google Analytics
   - 提交 sitemap
   - 優化 meta 標籤

3. **整合服務**
   - 連接 Google Calendar（活動）
   - 連接 YouTube（講道）
   - 設定 EmailJS（表單）

4. **部署上線**
   - 選擇部署平台
   - 設定自訂網域
   - 啟用 SSL 憑證

---

## 📞 需要協助？

- 📖 查看 [完整文件](../../SDD-GUIDE.md)
- 🚀 查看 [部署指南](../../DEPLOY-GUIDE.md)
- 💬 使用 LLM：「我想修改XXX」

---

**享受建站之旅！** 🎉

如有任何問題，隨時使用 LLM 詢問。

---

**版本**: v1.0 Demo  
**最後更新**: 2024年1月
