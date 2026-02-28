# 教會官網 SDD 完整指引
## Church Website Specification-Driven Development Guide

> 本指引採用 SDD（Specification-Driven Development）精神，透過問答式流程引導非技術人員建立專業教會官網

---

## 📋 目錄

1. [SDD 概念介紹](#sdd-概念介紹)
2. [系統架構](#系統架構)
3. [四階段詳細流程](#四階段詳細流程)
4. [使用方式](#使用方式)
5. [常見問題](#常見問題)

---

## 🎯 SDD 概念介紹

### 什麼是 SDD？

**Specification-Driven Development（規格驅動開發）**是一種開發方法論：

1. **先定義規格**：透過結構化問答收集完整需求
2. **生成配置檔**：將需求轉換為 JSON 格式
3. **自動生成代碼**：根據配置檔生成網站
4. **持續迭代**：修改配置即可更新網站

### 為什麼適合教會官網？

✅ **非技術友善**：問答式，不需懂程式碼  
✅ **標準化**：80% 教會需求相似，可模板化  
✅ **易維護**：改 JSON 檔案即可，LLM 可協助  
✅ **可擴展**：模組化設計，隨時新增功能  

---

## 🏗 系統架構

### 資料流程圖

```
用戶回答問題
    ↓
驗證與儲存 (JSON)
    ↓
生成配置檔
    ↓
網站生成器
    ↓
完整網站 (Next.js + TailwindCSS)
    ↓
部署到平台
```

### 技術堆疊

| 層級 | 技術選擇 | 原因 |
|------|---------|------|
| 前端框架 | Next.js 14 | SSG/SSR、SEO 優化、現代化 |
| UI 庫 | shadcn/ui | 美觀、可客製、TypeScript |
| 樣式 | TailwindCSS | 快速開發、響應式 |
| 圖示 | Lucide React | 清晰、一致性高 |
| CMS | Notion/Airtable | 非技術人員友善 |
| 認證 | Supabase | 免費、易整合 |
| 部署 | Netlify/Vercel | 免費、自動化 |

---

## 📝 四階段詳細流程

### 階段 1：必填基礎資訊

**目標**：建構網站骨架，確定品牌定位

#### Q1: 教會全稱與簡稱？

**目的**：設定網站標題與導航列顯示

**範例輸入**：
```json
{
  "fullName": "台北信望愛基督教會",
  "shortName": "信望愛教會",
  "englishName": "Faith Hope Love Church Taipei"
}
```

**LLM 驗證**：
- 全稱不超過 30 字
- 簡稱不超過 15 字
- 建議提供英文名稱（SEO）

---

#### Q2: 完整地址與 Google Maps 連結？

**目的**：生成聯絡頁面地圖與交通資訊

**範例輸入**：
```json
{
  "address": {
    "street": "台北市中正區羅斯福路一段1號",
    "city": "台北市",
    "district": "中正區",
    "zipCode": "100"
  },
  "googleMapsUrl": "https://goo.gl/maps/xxxxx",
  "coordinates": {
    "lat": 25.0330,
    "lng": 121.5654
  }
}
```

**LLM 輔助**：
- 自動驗證 Google Maps 連結
- 可選：從地址生成座標
- 建議加入「如何到達」說明

---

#### Q3: 聚會時間表？

**目的**：生成首頁時間卡片與日曆

**範例輸入**：
```json
{
  "schedule": [
    {
      "name": "主日崇拜",
      "day": "週日",
      "time": "10:00-12:00",
      "location": "主堂",
      "description": "英語/華語同步翻譯",
      "recurring": "weekly"
    },
    {
      "name": "週三禱告會",
      "day": "週三",
      "time": "19:30-21:00",
      "location": "副堂",
      "recurring": "weekly"
    }
  ]
}
```

**LLM 驗證**：
- 至少需要主日崇拜時間
- 建議提供 2-5 個常態聚會
- 檢查時間格式 (HH:MM)

---

#### Q4: 使命陳述？

**目的**：首頁 Hero 區塊與關於頁面

**範例輸入**：
```json
{
  "mission": "活出基督的愛，建造榮神益人的教會",
  "vision": "成為社區的祝福，傳揚福音直到地極",
  "values": [
    "敬拜：以心靈誠實敬拜神",
    "團契：彼此相愛的群體",
    "服事：發揮恩賜服事人群",
    "傳福音：分享耶穌的好消息"
  ]
}
```

**LLM 建議**：
- 使命 1-2 句（20-50 字）
- 異象 1 句（15-30 字）
- 核心價值 3-5 項

---

#### Q5: 領導團隊？

**目的**：生成「認識我們」團隊頁面

**範例輸入**：
```json
{
  "team": [
    {
      "name": "王恩典",
      "title": "主任牧師",
      "photo": "/images/pastor-wang.jpg",
      "bio": "神學院道學碩士，牧養教會15年，熱愛青年事工",
      "email": "pastor@church.org",
      "order": 1
    },
    {
      "name": "李平安",
      "title": "傳道",
      "photo": "/images/pastor-lee.jpg",
      "bio": "負責兒童與家庭事工",
      "order": 2
    }
  ]
}
```

**LLM 要求**：
- 至少 1 位主要牧者 + 2 位同工
- 照片建議 400x400px 正方形
- 簡介 50-150 字

---

#### Q6: 聯絡資訊？

**目的**：頁尾聯絡區塊與聯絡頁面

**範例輸入**：
```json
{
  "contact": {
    "phone": "02-2345-6789",
    "email": "info@faithhopelove.org",
    "line": "@faithhopelove",
    "facebook": "https://facebook.com/faithhopelove",
    "instagram": "https://instagram.com/faithhopelove",
    "youtube": "https://youtube.com/@faithhopelove"
  },
  "officeHours": "週二至週五 10:00-17:00"
}
```

**LLM 驗證**：
- Email 格式正確
- 社交媒體連結有效
- 建議至少 2 種聯絡方式

---

#### Q7: 品牌風格？

**目的**：定義網站配色與視覺風格

**範例輸入**：
```json
{
  "branding": {
    "primaryColor": "#3B82F6",
    "secondaryColor": "#10B981",
    "accentColor": "#F59E0B",
    "logoUrl": "/images/logo.svg",
    "fontFamily": "Noto Sans TC",
    "style": "modern"
  }
}
```

**風格選項**：
- **modern**：簡約、大量留白、現代字體
- **elegant**：優雅、襯線字體、漸層
- **traditional**：經典、深色系、莊重

**LLM 輔助**：
- 提供配色建議
- 檢查對比度（無障礙）
- 可從 Logo 提取主色

---

#### Q8: 目標訪客？

**目的**：優化內容與功能優先級

**範例輸入**：
```json
{
  "targetAudience": {
    "primary": ["families", "youth"],
    "ageGroups": ["25-40", "18-25"],
    "languages": ["zh-TW", "en"],
    "needs": [
      "尋找教會",
      "了解信仰",
      "參與活動"
    ]
  },
  "mobileUsagePercent": 75
}
```

**LLM 優化**：
- 手機使用率 >70% → 行動優先設計
- 青年為主 → 加強社交媒體整合
- 多語需求 → 啟用多語言功能

---

### ✅ 階段 1 輸出

**檔案**：`output/church-basic.json`

**自動生成**：
1. **首頁** (index.html)
   - Hero 區塊（使命陳述）
   - 聚會時間卡片
   - 聯絡資訊
2. **關於我們** (about.html)
   - 教會簡介
   - 領導團隊
   - 異象價值
3. **全域配置**
   - 導航列
   - 頁尾
   - 配色系統

**預覽指令**：
```bash
npm run preview:stage1
```

---

## 階段 2：核心功能確認

**目標**：啟用 80% 教會都需要的功能

### 核心功能清單

| 功能 | 說明 | 複雜度 | 必要性 |
|------|------|--------|--------|
| 1. 聚會時間表 | 動態顯示各類聚會 | 低 | ★★★★★ |
| 2. 講道信息 | 音頻/影片播放器 | 中 | ★★★★★ |
| 3. 活動日曆 | 活動預覽+報名 | 中 | ★★★★☆ |
| 4. 聯絡表單 | 即時通知 | 低 | ★★★★★ |
| 5. 奉獻功能 | QR碼+線上支付 | 中-高 | ★★★★☆ |
| 6. 社交媒體 | FB/IG 嵌入 | 低 | ★★★★☆ |

---

#### Q9: 確認核心功能

**輸入方式**：
```
請輸入要啟用的功能編號（逗號分隔）：1,2,3,4,5,6
```

**LLM 驗證**：
- 至少選擇 4 項
- 若未選「聯絡表單」會警告
- 評估總開發時間

---

#### Q10: 講道主要格式？

**範例輸入**：
```json
{
  "sermons": {
    "primaryFormat": "video",
    "platforms": ["youtube", "vimeo"],
    "enableDownload": true,
    "showNotes": true,
    "categories": ["主日信息", "專題講座", "查經"],
    "displayStyle": "grid"
  }
}
```

**格式選項**：
- **video**：YouTube 嵌入（推薦）
- **audio**：音頻播放器
- **text**：講章文字

---

#### Q11: 奉獻需求？

**範例輸入**：
```json
{
  "donation": {
    "methods": [
      {
        "type": "qrcode",
        "name": "轉帳 QR Code",
        "image": "/images/donation-qr.png",
        "bankInfo": {
          "bank": "台灣銀行",
          "account": "123-456-789",
          "name": "信望愛教會"
        }
      },
      {
        "type": "online",
        "provider": "stripe",
        "currency": "TWD",
        "enableRecurring": true
      }
    ],
    "taxReceipt": true
  }
}
```

**LLM 建議**：
- 僅 QR 碼：簡單、免費
- 完整支付：需 Stripe 帳號（手續費 2.9%）

---

#### Q12-14: 其他核心功能配置

簡化輸入，使用預設值：

```json
{
  "calendar": {
    "provider": "google",
    "calendarId": "xxxxx@group.calendar.google.com",
    "enableRegistration": true
  },
  "contactForm": {
    "provider": "emailjs",
    "fields": ["name", "email", "phone", "message"],
    "notifyEmail": "info@church.org"
  },
  "socialMedia": {
    "enableFeed": true,
    "platforms": ["facebook", "instagram", "youtube"]
  }
}
```

---

### ✅ 階段 2 輸出

**檔案**：`output/core-features.json`

**新增頁面**：
- 講道信息頁面
- 活動日曆頁面
- 奉獻頁面
- 聯絡我們頁面

**預覽指令**：
```bash
npm run preview:stage2
```

---

## 階段 3：進階功能選擇

**目標**：依需求加入特色功能

### 進階功能分類

#### 📱 互動功能（中複雜度）

##### ① 代禱事項

```json
{
  "prayer": {
    "enabled": true,
    "backend": "airtable",
    "features": {
      "submit": true,
      "view": true,
      "category": ["個人", "家庭", "教會", "社會"],
      "moderation": true
    },
    "displayLimit": 10
  }
}
```

##### ② 信仰見證

```json
{
  "testimonies": {
    "enabled": true,
    "backend": "notion",
    "displayStyle": "carousel",
    "categories": ["受洗見證", "生命故事", "服事心得"],
    "requireApproval": true
  }
}
```

##### ③ 會員系統

```json
{
  "memberPortal": {
    "enabled": true,
    "provider": "supabase",
    "features": {
      "attendanceRecord": true,
      "serviceHistory": true,
      "groupManagement": true,
      "privateContent": true
    }
  }
}
```

---

#### 📄 內容管理（低複雜度）

##### ④ 週報系統

```json
{
  "bulletin": {
    "enabled": true,
    "format": "pdf",
    "archiveYears": 3,
    "autoPublish": "sunday-8am"
  }
}
```

##### ⑤ 靈修資源

```json
{
  "devotional": {
    "enabled": true,
    "source": "notion-embed",
    "readingPlan": true,
    "categories": ["每日靈修", "讀經計畫", "禱告文"]
  }
}
```

---

#### 🚀 技術增強（高複雜度）

##### ⑥ 直播串流

```json
{
  "livestream": {
    "enabled": true,
    "platform": "youtube",
    "schedule": "sunday-10am",
    "replayAvailable": true,
    "chatEnabled": false
  }
}
```

##### ⑦ 多語言支持

```json
{
  "i18n": {
    "enabled": true,
    "languages": ["zh-TW", "zh-CN", "en", "id"],
    "defaultLanguage": "zh-TW",
    "autoDetect": true
  }
}
```

---

#### Q15-17: 進階功能問答

**Q15: 選擇進階功能**
```
請輸入要啟用的進階功能（輸入名稱或編號）：
代禱事項, 信仰見證, 直播串流
```

**Q16: 功能預設狀態**
```json
{
  "prayer": { "defaultOpen": true },
  "testimonies": { "defaultOpen": true },
  "livestream": { "defaultOpen": true }
}
```

**Q17: 特殊需求**
```
有無特殊需求？（例：會友專區密碼保護）
> 會友專區需要登入，代禱事項需審核後顯示
```

---

### ✅ 階段 3 輸出

**檔案**：`output/advanced-features.json`

**新增功能**：
- 所有選定的進階功能模組
- 後端 API 配置
- 資料庫 Schema

**預覽指令**：
```bash
npm run preview:stage3
```

---

## 階段 4：UI/UX 與部署設定

**目標**：最佳化使用者體驗與上線準備

#### Q18: 手機使用比例？

**範例輸入**：
```json
{
  "mobileOptimization": {
    "usagePercent": 80,
    "priority": "high",
    "adjustments": {
      "largerButtons": true,
      "simplifiedNav": true,
      "reducedAnimations": true
    }
  }
}
```

**LLM 優化**：
- \>70%：行動優先，桌面為輔
- 50-70%：響應式平衡
- <50%：桌面優先

---

#### Q19: 首頁重點展示？

**範例輸入**：
```json
{
  "homepage": {
    "hero": {
      "content": "welcome-message",
      "cta": ["參加聚會", "認識我們"]
    },
    "sections": [
      { "type": "upcoming-events", "order": 1 },
      { "type": "latest-sermon", "order": 2 },
      { "type": "donation", "order": 3 },
      { "type": "testimonies", "order": 4 }
    ]
  }
}
```

---

#### Q20: 導航列配置？

**預設結構**：
```json
{
  "navigation": {
    "style": "sticky",
    "items": [
      { "label": "首頁", "path": "/" },
      { "label": "關於我們", "path": "/about", "dropdown": [
        { "label": "教會簡介", "path": "/about#intro" },
        { "label": "信仰告白", "path": "/about#faith" },
        { "label": "同工團隊", "path": "/about#team" }
      ]},
      { "label": "聚會資訊", "path": "/schedule" },
      { "label": "講道信息", "path": "/sermons" },
      { "label": "活動報名", "path": "/events" },
      { "label": "奉獻支持", "path": "/donate" },
      { "label": "聯絡我們", "path": "/contact" }
    ],
    "mobileCollapse": true
  }
}
```

---

#### Q21: 部署平台？

**選項比較**：

| 平台 | 免費額度 | 適合對象 | 難度 |
|------|---------|---------|------|
| **Netlify** | 100GB/月 | 推薦新手 | ⭐ |
| **Vercel** | 100GB/月 | 推薦開發者 | ⭐⭐ |
| **GitHub Pages** | 1GB | 靜態網站 | ⭐⭐ |
| **Webflow** | $14/月 | 非技術人員 | ⭐ |

**範例選擇**：
```json
{
  "deployment": {
    "platform": "netlify",
    "domain": "faithhopelove.netlify.app",
    "customDomain": "www.faithhopelove.org",
    "ssl": true,
    "autoPublish": true
  }
}
```

---

#### Q22: 維護人員技術水平？

**範例輸入**：
```json
{
  "maintenance": {
    "technicalLevel": "basic",
    "primaryEditor": "notion",
    "backupEditor": "airtable",
    "llmAssistance": true,
    "trainingNeeded": ["新增活動", "上傳講道", "修改聯絡資訊"]
  }
}
```

**技術水平定義**：
- **none**：只會用 Word/社交媒體
  - 使用 Notion 作為 CMS
  - 提供圖文操作手冊
- **basic**：會用 Google Docs/Sheets
  - 使用 Airtable
  - 提供影片教學
- **advanced**：懂 HTML/CSS
  - 直接編輯 JSON
  - 提供開發文件

---

#### Q23: LLM 維護指令範例需求？

**範例輸入**：
```json
{
  "llmCommands": {
    "enabled": true,
    "commonTasks": [
      "新增活動",
      "更新講道",
      "修改聚會時間",
      "新增同工",
      "更改配色",
      "新增週報"
    ],
    "customInstructions": [
      "所有新增內容需審核",
      "重要變更需通知管理員",
      "保持品牌一致性"
    ]
  }
}
```

---

### ✅ 階段 4 輸出

**檔案**：`output/complete-sdd.json`

**最終產出**：
1. **完整網站原始碼** (`output/website/`)
2. **部署設定檔** (`netlify.toml` 或 `vercel.json`)
3. **維護手冊** (`MAINTENANCE.md`)
4. **LLM 指令集** (`llm-commands.json`)

**一鍵部署指令**：
```bash
npm run deploy
```

---

## 🚀 使用方式

### 在 VS Code 使用 LLM (推薦)

1. **開啟專案**
   ```bash
   cd church-web-site-demo
   code .
   ```

2. **啟動 LLM (Cascade/Roo Code)**
   在聊天面板輸入：
   ```
   開始建立教會官網
   ```

3. **跟隨引導回答問題**
   LLM 會逐題引導，並即時驗證

4. **預覽網站**
   每階段完成後輸入：
   ```
   預覽目前的網站
   ```

5. **部署上線**
   完成四階段後輸入：
   ```
   部署網站到 Netlify
   ```

---

### 使用 CLI 工具

```bash
# 啟動互動式建構工具
node sdd-builder/church-builder.js

# 或使用 npm 腳本
npm run build:church

# 跟隨終端機指示回答問題
```

---

### 直接編輯 JSON（進階）

1. **複製範例檔案**
   ```bash
   cp examples/church-basic.example.json config/church-basic.json
   ```

2. **編輯配置**
   使用任何文字編輯器修改 JSON

3. **驗證格式**
   ```bash
   npm run validate
   ```

4. **生成網站**
   ```bash
   npm run generate
   ```

---

## ❓ 常見問題

### Q: 我完全不懂程式碼，也能使用嗎？

**A**: 可以！只要：
1. 會使用電腦打字
2. 能回答關於教會的問題
3. 安裝 VS Code + LLM 插件

LLM 會處理所有技術細節。

---

### Q: 需要付費嗎？

**A**: 基本功能完全免費：
- ✅ Next.js、TailwindCSS（開源）
- ✅ Netlify/Vercel 部署（免費方案）
- ✅ Notion/Airtable（免費方案）

需付費的選項：
- 💰 自訂網域（約 $10-15/年）
- 💰 線上支付手續費（Stripe 2.9%）
- 💰 進階功能（會員系統、直播等）

---

### Q: 網站多久可以完成？

**A**: 依複雜度：
- 基礎版（階段 1-2）：1-2 小時
- 標準版（階段 1-3）：3-4 小時
- 完整版（階段 1-4）：5-6 小時

實際時間包含：回答問題、確認預覽、調整細節。

---

### Q: 之後要怎麼維護網站？

**A**: 三種方式：
1. **使用 LLM**（推薦）
   ```
   新增一個活動：聖誕節慶典，12月25日...
   ```

2. **使用 Notion/Airtable**
   在資料庫新增/編輯內容，自動同步

3. **編輯 JSON 檔案**
   修改配置檔後重新部署

---

### Q: 可以換模板或配色嗎？

**A**: 可以！輸入：
```
切換到優雅風格模板
把主色調改成深藍色 #1e40af
```

LLM 會自動重新生成。

---

### Q: 資料安全嗎？

**A**: 
- 所有資料存在你的電腦/GitHub
- 使用 Supabase 時資料加密
- 不會分享給第三方
- 建議定期備份配置檔

---

### Q: 需要準備哪些素材？

**A**: 建議準備：
- ✅ 教會 Logo（SVG 或 PNG）
- ✅ 團隊照片（至少 3 位同工）
- ✅ 教會環境照片（3-5 張）
- ✅ 聚會時間與地點資訊
- ✅ 社交媒體帳號連結
- ⭕ 講道影片連結（可之後補）
- ⭕ 奉獻 QR Code（可之後補）

---

### Q: 手機版會自動優化嗎？

**A**: 會！系統自動產生響應式設計：
- 手機：單欄、大按鈕、簡化導航
- 平板：雙欄、最佳化觸控
- 桌面：多欄、完整功能

---

### Q: SEO 優化有做嗎？

**A**: 有！自動包含：
- ✅ 結構化資料（Schema.org）
- ✅ Open Graph（社交分享）
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ 語意化 HTML
- ✅ 圖片 alt 文字

---

### Q: 可以整合現有的 YouTube/Facebook 嗎？

**A**: 可以！在階段 2 提供連結即可：
- YouTube 頻道自動嵌入最新影片
- Facebook 專頁顯示貼文牆
- Instagram 顯示照片牆

---

### Q: 多語言網站複雜嗎？

**A**: 不會！選擇語言後：
```json
{
  "languages": ["zh-TW", "en"]
}
```

系統自動：
1. 生成語言切換器
2. 翻譯 UI 介面（按鈕、選單等）
3. 你只需翻譯內容（使命、簡介等）

可使用 Google Translate API 自動翻譯。

---

### Q: 出問題了怎麼辦？

**A**: 
1. **輸入問題給 LLM**
   ```
   網站首頁顯示不正常
   ```

2. **查看錯誤日誌**
   ```bash
   npm run logs
   ```

3. **回復上一版本**
   ```bash
   npm run rollback
   ```

4. **聯絡支援**（提供 `complete-sdd.json`）

---

## 📚 延伸資源

### 官方文件
- [Next.js 文件](https://nextjs.org/docs)
- [TailwindCSS 文件](https://tailwindcss.com/docs)
- [shadcn/ui 元件庫](https://ui.shadcn.com/)

### 教學影片
- [如何使用本系統](https://youtu.be/xxxxx)（待製作）
- [LLM 維護教學](https://youtu.be/xxxxx)（待製作）

### 範例網站
- 現代風格：[demo-modern.netlify.app](https://demo-modern.netlify.app)
- 優雅風格：[demo-elegant.netlify.app](https://demo-elegant.netlify.app)
- 傳統風格：[demo-traditional.netlify.app](https://demo-traditional.netlify.app)

---

## 🤝 回饋與改進

有任何建議或問題，歡迎：
- 📧 Email: support@church-sdd.org
- 💬 GitHub Issues
- 📞 LINE: @church-sdd

---

**最後更新**：2024年1月  
**版本**：v1.0  
**製作團隊**：為台灣教會量身打造
