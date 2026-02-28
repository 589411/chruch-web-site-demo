# 📸 快速截圖教學

## 🎯 目標

為 README.md 添加示範網站的截圖，讓訪客一眼就看到成果。

---

## ⚡ 最快方式（Chrome/Edge）

### 1. 啟動本地網站或訪問線上版本

**選項 A：本地測試**
```bash
cd output/website
npm run dev
# 開啟 http://localhost:3000
```

**選項 B：線上網站**
```
直接開啟你的 Netlify 網址
```

---

### 2. 拍攝桌面版截圖

#### 步驟：

1. **開啟首頁**
   - 訪問網站首頁

2. **開啟開發者工具**
   - 按 `F12` 或 `Cmd + Option + I`（Mac）

3. **開啟命令面板**
   - 按 `Cmd + Shift + P`（Mac）
   - 或 `Ctrl + Shift + P`（Windows）

4. **拍攝完整頁面截圖**
   - 輸入：`screenshot`
   - 選擇：`Capture full size screenshot`
   - 自動下載到 Downloads

5. **重新命名並移動**
   ```bash
   # 移到專案目錄
   cd /Users/jjaim2/github/chruch-web-site-demo
   
   # 重新命名並移動檔案
   mv ~/Downloads/screenshot.png screenshots/desktop-home.png
   ```

6. **重複其他頁面**
   - 關於我們 → `desktop-about.png`
   - 活動報名 → `desktop-events.png`
   - 講道信息 → `desktop-sermons.png`

---

### 3. 拍攝手機版截圖

#### 步驟：

1. **切換裝置模式**
   - 開發者工具已開啟的狀態下
   - 按 `Cmd + Shift + M`（Mac）或 `Ctrl + Shift + M`（Windows）
   - 或點擊工具列的手機圖示

2. **選擇裝置**
   - 在上方選擇："iPhone SE" 或 "iPhone 12 Pro"
   - 尺寸應顯示 375 x 667 或類似

3. **拍攝截圖**
   - 訪問首頁
   - 按 `Cmd + Shift + P` → `Capture full size screenshot`
   - 儲存為 `mobile-home.png`

4. **重複其他頁面**
   - 聚會資訊 → `mobile-schedule.png`
   - 聯絡我們 → `mobile-contact.png`

---

## 📋 需要拍攝的頁面清單

### 桌面版（4張）
- [ ] 首頁 - `desktop-home.png`
- [ ] 關於我們 - `desktop-about.png`
- [ ] 活動報名 - `desktop-events.png`
- [ ] 講道信息 - `desktop-sermons.png`

### 手機版（3張）
- [ ] 首頁 - `mobile-home.png`
- [ ] 聚會資訊 - `mobile-schedule.png`
- [ ] 聯絡我們 - `mobile-contact.png`

---

## 🔧 使用終端機快速移動檔案

拍攝完所有截圖後：

```bash
# 前往專案目錄
cd /Users/jjaim2/github/chruch-web-site-demo

# 移動所有截圖（假設都在 Downloads）
mv ~/Downloads/desktop-*.png screenshots/
mv ~/Downloads/mobile-*.png screenshots/

# 確認檔案
ls -lh screenshots/

# 提交到 Git
git add screenshots/
git add README.md
git commit -m "docs: 新增示範網站截圖展示"
git push
```

---

## 🎨 截圖建議

### 拍攝時機
✅ 選擇網站內容最完整的時候
✅ 確保所有圖片都已載入
✅ 檢查文字沒有亂碼

### 畫面設定
✅ 隱藏瀏覽器書籤列（更乾淨）
✅ 使用無痕模式（避免擴充套件干擾）
✅ 確保網站顯示正常

### 不要包含
❌ 個人資訊
❌ 測試資料
❌ 錯誤訊息

---

## 💡 替代方案

### 方案一：使用線上工具

**Screenshot.guru**
- 訪問：https://screenshot.guru
- 輸入你的網站網址
- 選擇桌面或手機版
- 下載截圖

**Screely**
- 訪問：https://screely.com
- 上傳現有截圖
- 自動加上漂亮的背景和邊框

### 方案二：使用瀏覽器擴充套件

**Awesome Screenshot**
- Chrome/Edge 擴充套件
- 一鍵截取整頁
- 支援註解和編輯

---

## 🖼️ 優化截圖（可選）

### 壓縮圖片

```bash
# 使用 TinyPNG（線上）
# 訪問 https://tinypng.com
# 拖放圖片即可壓縮

# 或使用命令列（需安裝 ImageMagick）
brew install imagemagick
cd screenshots
mogrify -quality 85 *.png
```

### 調整尺寸

```bash
# 如果截圖太大，可以縮小
# 保持寬度在 1440px
convert desktop-home.png -resize 1440x desktop-home.png
```

---

## ✅ 完成後檢查

- [ ] 所有 7 張截圖都已拍攝
- [ ] 檔案命名正確
- [ ] 圖片清晰可讀
- [ ] 已移動到 `screenshots/` 資料夾
- [ ] README.md 可以正確顯示
- [ ] 已提交到 Git

---

## 🚀 立即開始

**最快 5 分鐘完成！**

1. 開啟網站（本地或線上）
2. F12 開啟開發者工具
3. Cmd+Shift+P → "Capture full size screenshot"
4. 重複 7 次（不同頁面、桌面/手機版）
5. 移動檔案到 `screenshots/`
6. Git 提交

---

## 📞 需要幫助？

如果遇到問題，可以：

1. **查看詳細指南**
   ```bash
   cat screenshots/README.md
   ```

2. **使用 LLM 協助**
   ```
   我在拍攝截圖時遇到問題：[描述問題]
   ```

3. **檢查範例**
   - 參考其他開源專案的截圖方式
   - GitHub 上搜尋 "church website" 查看範例

---

**準備好了嗎？開始拍攝你的精美網站截圖！** 📸✨
