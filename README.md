# 教會官網 SDD 建構系統
## Church Website Specification-Driven Development System

> 讓非技術人員透過問答式流程，使用 LLM 建立專業教會官網

## 🎯 系統特色

- **零程式碼建站**：透過問答式引導，逐步建構完整官網
- **SDD 精神**：規格驅動開發，先定義需求後自動生成
- **模組化設計**：功能模組可獨立啟用/升級
- **LLM 友善**：所有配置皆為 JSON，方便 AI 維護
- **即時預覽**：每階段完成即可查看網站原型

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

## 📚 延伸閱讀

- [完整 SDD 指引](./SDD-GUIDE.md)
- [JSON Schema 說明](./schemas/README.md)
- [模板自訂指南](./templates/README.md)
- [LLM 維護手冊](./llm-commands/COMMANDS.md)

## 🤝 貢獻

歡迎提交 Issue 或 Pull Request 來改善這個系統！

## 📄 授權

MIT License

---

**製作者**：為台灣教會量身打造  
**技術支援**：透過 LLM 進行即時協助
