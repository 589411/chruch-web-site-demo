# 教會官網 SDD 建構系統
## Church Website Specification-Driven Development System

> 讓非技術人員透過問答式流程，使用 LLM 建立專業教會官網

## 🎯 系統特色

- **零程式碼建站**：透過問答式引導，逐步建構完整官網
- **SDD 精神**：規格驅動開發，先定義需求後自動生成
- **模組化設計**：功能模組可獨立啟用/升級
- **LLM 友善**：所有配置皆為 JSON，方便 AI 維護
- **即時預覽**：每階段完成即可查看網站原型

## 🌐 示範網站預覽

### 線上 Demo
🔗 **[點擊查看示範網站](你的Netlify網址)**

### 桌面版畫面
![首頁桌面版](screenshots/desktop-home.png)
*現代化設計，清晰的視覺層級*

![關於我們](screenshots/desktop-about.png)
*團隊介紹與教會使命*

### 手機版畫面
<p float="left">
  <img src="screenshots/mobile-home.png" width="250" alt="手機版首頁" />
  <img src="screenshots/mobile-schedule.png" width="250" alt="手機版聚會" />
  <img src="screenshots/mobile-contact.png" width="250" alt="手機版聯絡" />
</p>

*完美適配各種裝置尺寸*

### 功能展示
![活動報名頁面](screenshots/desktop-events.png)
*精美的活動展示與報名功能*

![講道信息頁面](screenshots/desktop-sermons.png)
*整合 YouTube 影片的講道列表*

## 📁 專案結構

```
church-web-site-demo/
├── README.md                          # 專案說明（本文件）
├── SDD-GUIDE.md                       # 完整 SDD 指引手冊
├── sdd-builder/                       # 互動式建構工具
│   ├── church-builder.js              # 主要問答流程腳本
│   ├── questions.json                 # 完整問題定義
│   └── validator.js                   # 輸入驗證器
├── schemas/                           # JSON Schema 定義
│   ├── church-basic.schema.json       # 階段1：基礎資訊
│   ├── core-features.schema.json      # 階段2：核心功能
│   ├── advanced-features.schema.json  # 階段3：進階功能
│   └── complete-sdd.schema.json       # 階段4：完整規格
├── examples/                          # 範例配置檔案
│   ├── church-basic.example.json
│   ├── core-features.example.json
│   ├── advanced-features.example.json
│   └── complete-sdd.example.json
├── templates/                         # 網站模板
│   ├── modern/                        # 現代風格
│   ├── elegant/                       # 優雅風格
│   └── traditional/                   # 傳統風格
├── generators/                        # 程式碼生成器
│   ├── website-generator.js           # 主生成器
│   ├── components/                    # UI 元件生成
│   └── pages/                         # 頁面生成
├── llm-commands/                      # LLM 維護指令集
│   ├── COMMANDS.md                    # 指令說明文件
│   └── command-examples.json          # 常用指令範例
└── output/                            # 生成的網站檔案（自動建立）
```

## 🚀 快速開始

### 方法一：使用 LLM（推薦給非技術人員）

在你的 IDE（如 VS Code + Cascade/Roo Code）中，直接輸入：

```
開始建立教會官網
```

LLM 會自動引導你完成四階段問答。

### 方法二：執行互動式腳本

```bash
# 安裝相依套件
npm install

# 啟動建構工具
npm run build:church

# 或直接執行
node sdd-builder/church-builder.js
```

### 方法三：直接編輯 JSON

1. 複製 `examples/` 中的範例檔案
2. 根據你的需求修改
3. 執行生成器：`npm run generate`

## 📖 四階段流程概覽

### 階段 1：基礎資訊 (8 題)
- 教會名稱、地址、聚會時間
- 使命陳述、領導團隊
- 聯絡資訊、品牌風格
- **輸出**：`church-basic.json` + 首頁/關於頁面

### 階段 2：核心功能 (6 題)
- 聚會時間表、講道信息、活動日曆
- 聯絡表單、奉獻功能、社交媒體
- **輸出**：`core-features.json` + 功能模組

### 階段 3：進階功能 (5 題)
- 代禱事項、信仰見證、會員系統
- 週報系統、直播串流、多語言
- **輸出**：`advanced-features.json` + 完整功能

### 階段 4：部署設定 (6 題)
- UI/UX 配置、導航設計
- 部署平台、維護策略
- **輸出**：`complete-sdd.json` + 完整網站

## 🛠 技術架構

### 前端技術棧
- **框架**：Next.js 14 (React)
- **樣式**：TailwindCSS + shadcn/ui
- **圖示**：Lucide React
- **動畫**：Framer Motion

### 後端/資料管理
- **CMS**：Notion API / Airtable
- **認證**：Supabase Auth
- **支付**：Stripe / 綠界科技
- **表單**：EmailJS / Google Sheets

### 部署選項
- **免費**：Netlify、Vercel、GitHub Pages
- **付費**：Webflow、WordPress

## 📝 LLM 維護指令範例

完成建站後，你可以使用自然語言維護網站：

```
# 新增活動
新增一個活動：聖誕節慶典，12月25日下午3點

# 更新講道
上傳本週講道：標題「愛的真諦」，講員王牧師，YouTube連結...

# 修改樣式
把首頁主色調改成深藍色 #1e40af

# 新增團隊成員
新增同工：張姊妹，青年事工負責人，簡介...
```

詳細指令請參考 `llm-commands/COMMANDS.md`

## 🎨 設計原則

1. **行動優先**：70%+ 使用者來自手機
2. **簡潔易讀**：清晰的視覺層級
3. **快速載入**：優化圖片與資源
4. **無障礙**：符合 WCAG 2.1 AA 標準
5. **SEO 友善**：結構化資料與語意標籤

## 🚀 部署流程記錄

### 成功案例：示範網站

本專案已成功生成並部署示範網站：

#### 1️⃣ 建置網站
```bash
cd output/website
npm install
npm run build
```

#### 2️⃣ 部署到 Netlify（兩種方式）

**方式 A：Netlify CLI**
```bash
cd output/website
npx netlify-cli deploy --prod --dir=out
# 選擇 "Create & configure a new project"
# 選擇你的 Team
# 輸入網站名稱或使用預設值
```

**方式 B：Netlify Drop（最簡單）**
1. 開啟 https://app.netlify.com/drop
2. 拖放 `output/website/out` 資料夾
3. 等待 30 秒，完成！

#### 3️⃣ 推送到 GitHub
```bash
# 初始化 Git（已完成）
git init
git add .
git commit -m "Initial commit: Church Website SDD System with demo site"
git branch -M main

# 連接 GitHub（請先在 GitHub 建立 repository）
git remote add origin https://github.com/你的帳號/church-website-sdd.git
git push -u origin main
```

### 部署結果
- ✅ **網站已上線**：可透過 Netlify 網址訪問
- ✅ **自動 SSL**：HTTPS 已啟用
- ✅ **全球 CDN**：快速載入
- ✅ **響應式設計**：手機/桌面完美適配

---

## 📚 延伸閱讀

- [完整 SDD 指引](./SDD-GUIDE.md)
- [快速啟動指南](./START-DEMO.md)
- [部署完整教學](./DEPLOY-GUIDE.md)
- [LLM 維護手冊](./llm-commands/COMMANDS.md)

## 🤝 貢獻

歡迎提交 Issue 或 Pull Request 來改善這個系統！

## 📄 授權

MIT License

---

**製作者**：為台灣教會量身打造  
**技術支援**：透過 LLM 進行即時協助
