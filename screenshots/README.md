# 📸 截圖指南

這個資料夾用來存放示範網站的截圖，展示在 README.md 中。

## 📋 需要的截圖

### 桌面版（1920x1080 或 1440x900）

1. **desktop-home.png** - 首頁完整畫面
   - 包含 Hero 橫幅
   - 顯示聚會時間卡片
   - 最新講道區塊

2. **desktop-about.png** - 關於我們頁面
   - 使命異象區塊
   - 團隊成員展示

3. **desktop-events.png** - 活動報名頁面
   - 活動卡片展示
   - 圖文並茂的活動資訊

4. **desktop-sermons.png** - 講道信息頁面
   - 講道列表
   - 影片縮圖展示

### 手機版（375x667 iPhone SE 尺寸）

5. **mobile-home.png** - 手機版首頁
6. **mobile-schedule.png** - 手機版聚會資訊
7. **mobile-contact.png** - 手機版聯絡我們

---

## 🎯 如何拍攝截圖

### 方法一：使用瀏覽器開發者工具（推薦）

#### 桌面版截圖

1. **開啟網站**
   ```
   開啟你的 Netlify 網址
   ```

2. **全頁截圖**
   - **Chrome/Edge**：
     - 按 `F12` 開啟開發者工具
     - 按 `Cmd + Shift + P`（Mac）或 `Ctrl + Shift + P`（Windows）
     - 輸入 "screenshot"
     - 選擇 "Capture full size screenshot"
   
   - **Firefox**：
     - 按 `F12` 開啟開發者工具
     - 點擊右上角 `...` 
     - 選擇 "Take a screenshot" → "Save full page"

3. **儲存檔案**
   - 依照上面的命名規則儲存
   - 放入 `screenshots/` 資料夾

#### 手機版截圖

1. **切換裝置模式**
   - 按 `F12` 開啟開發者工具
   - 點擊裝置切換按鈕（手機/平板圖示）
   - 或按 `Cmd + Shift + M`（Mac）/ `Ctrl + Shift + M`（Windows）

2. **選擇裝置**
   - 選擇 "iPhone SE" 或 "iPhone 12 Pro"
   - 尺寸：375 x 667

3. **拍攝截圖**
   - 同上面的全頁截圖方式
   - 或直接按 `Cmd + Shift + P` → "Capture node screenshot"

### 方法二：使用截圖工具

#### macOS
```bash
# 截取特定區域
Cmd + Shift + 4

# 截取整個視窗
Cmd + Shift + 4，然後按空白鍵，點擊視窗
```

#### Windows
```bash
# 使用 Snipping Tool
Win + Shift + S
```

---

## 📐 建議尺寸

| 類型 | 寬度 | 備註 |
|------|------|------|
| 桌面版 | 1440px 或 1920px | 可顯示完整內容 |
| 手機版 | 375px | iPhone SE 標準尺寸 |

---

## 🎨 截圖優化

### 壓縮圖片（減少檔案大小）

1. **線上工具**
   - TinyPNG: https://tinypng.com
   - Squoosh: https://squoosh.app

2. **命令列工具**
   ```bash
   # 安裝 ImageMagick
   brew install imagemagick  # macOS
   
   # 壓縮圖片
   convert desktop-home.png -quality 85 desktop-home.png
   ```

### 建議設定
- **格式**：PNG（保持清晰度）或 WebP（更小檔案）
- **品質**：85-90%
- **單檔大小**：< 500KB

---

## 📝 添加到 README

截圖已經在 README.md 中預留位置：

```markdown
![首頁桌面版](screenshots/desktop-home.png)
```

只要將截圖檔案放入 `screenshots/` 資料夾，GitHub 就會自動顯示。

---

## ✅ 檢查清單

拍攝截圖時確認：

- [ ] 網址列整潔（隱藏或清除）
- [ ] 沒有個人資訊
- [ ] 內容完整顯示
- [ ] 色彩正常
- [ ] 文字清晰可讀
- [ ] 檔案命名正確
- [ ] 圖片已壓縮

---

## 🚀 快速步驟

```bash
# 1. 開啟你的網站
open http://localhost:3000  # 本地測試
# 或
open https://your-site.netlify.app  # 線上網站

# 2. 使用瀏覽器拍攝截圖
#    Chrome: F12 → Cmd+Shift+P → "Capture full size screenshot"

# 3. 將截圖移動到正確位置
mv ~/Downloads/desktop-*.png screenshots/
mv ~/Downloads/mobile-*.png screenshots/

# 4. 提交到 Git
git add screenshots/
git commit -m "docs: 新增示範網站截圖"
git push
```

---

## 📸 範例截圖清單

完成後，你的 `screenshots/` 資料夾應該包含：

```
screenshots/
├── README.md              # 本說明檔案
├── desktop-home.png       # 桌面版首頁
├── desktop-about.png      # 桌面版關於
├── desktop-events.png     # 桌面版活動
├── desktop-sermons.png    # 桌面版講道
├── mobile-home.png        # 手機版首頁
├── mobile-schedule.png    # 手機版聚會
└── mobile-contact.png     # 手機版聯絡
```

---

## 💡 提示

1. **一致性**：所有截圖使用相同的瀏覽器和設定
2. **時間點**：選擇網站內容最完整的時候拍攝
3. **更新**：當網站有重大更新時，記得更新截圖

---

**準備好了嗎？立即開始拍攝你的示範網站！** 📸
