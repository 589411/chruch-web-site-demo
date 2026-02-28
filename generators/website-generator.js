#!/usr/bin/env node

/**
 * 網站生成器
 * Website Generator for Church SDD
 * 
 * 根據配置檔生成完整的 Next.js 網站
 */

const fs = require('fs-extra');
const path = require('path');

// 配置路徑
const OUTPUT_DIR = path.join(__dirname, '..', 'output');
const WEBSITE_DIR = path.join(OUTPUT_DIR, 'website');
const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');

/**
 * 主要生成函數
 */
async function generateWebsite() {
  console.log('\n🔨 開始生成教會官網...\n');

  try {
    // 1. 載入配置檔
    console.log('📖 載入配置檔...');
    const config = await loadConfig();

    // 2. 選擇模板
    console.log('🎨 選擇模板風格...');
    const templateStyle = config.branding?.style || 'modern';
    
    // 3. 建立專案結構
    console.log('📁 建立專案結構...');
    await createProjectStructure();

    // 4. 生成 Next.js 配置
    console.log('⚙️  生成 Next.js 配置...');
    await generateNextConfig(config);

    // 5. 生成頁面
    console.log('📄 生成頁面...');
    await generatePages(config, templateStyle);

    // 6. 生成元件
    console.log('🧩 生成元件...');
    await generateComponents(config, templateStyle);

    // 7. 生成樣式
    console.log('🎨 生成樣式配置...');
    await generateStyles(config);

    // 8. 複製靜態資源
    console.log('📦 複製靜態資源...');
    await copyStaticAssets();

    // 9. 生成 package.json
    console.log('📝 生成 package.json...');
    await generatePackageJson(config);

    // 10. 安裝依賴
    console.log('📦 安裝依賴套件...');
    await installDependencies();

    console.log('\n✅ 網站生成完成！\n');
    console.log('📁 位置：', WEBSITE_DIR);
    console.log('\n接下來您可以：');
    console.log('  cd output/website');
    console.log('  npm run dev        # 啟動開發伺服器');
    console.log('  npm run build      # 建置生產版本');
    console.log('  npm run deploy     # 部署到 Netlify/Vercel\n');

  } catch (error) {
    console.error('\n❌ 生成失敗：', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

/**
 * 載入配置檔
 */
async function loadConfig() {
  const configFile = path.join(OUTPUT_DIR, 'complete-sdd.json');
  
  if (!await fs.pathExists(configFile)) {
    throw new Error('找不到配置檔：' + configFile);
  }

  return await fs.readJson(configFile);
}

/**
 * 建立專案結構
 */
async function createProjectStructure() {
  const dirs = [
    'src/app',
    'src/components',
    'src/lib',
    'src/styles',
    'public/images',
    'public/uploads'
  ];

  for (const dir of dirs) {
    await fs.ensureDir(path.join(WEBSITE_DIR, dir));
  }
}

/**
 * 生成 Next.js 配置
 */
async function generateNextConfig(config) {
  const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
`;

  await fs.writeFile(
    path.join(WEBSITE_DIR, 'next.config.js'),
    nextConfig
  );
}

/**
 * 生成頁面
 */
async function generatePages(config, templateStyle) {
  // 首頁
  await generateHomePage(config, templateStyle);
  
  // 關於我們
  await generateAboutPage(config, templateStyle);
  
  // 聚會資訊
  if (config.schedule) {
    await generateSchedulePage(config, templateStyle);
  }
  
  // 講道信息
  if (config.sermons?.enabled) {
    await generateSermonsPage(config, templateStyle);
  }
  
  // 活動日曆
  if (config.events?.enabled) {
    await generateEventsPage(config, templateStyle);
  }
  
  // 聯絡我們
  if (config.contact?.enabled) {
    await generateContactPage(config, templateStyle);
  }
  
  // 奉獻頁面
  if (config.donation?.enabled) {
    await generateDonationPage(config, templateStyle);
  }
}

/**
 * 生成首頁
 */
async function generateHomePage(config, templateStyle) {
  const template = await loadTemplate(templateStyle, 'home');
  const content = renderTemplate(template, config);
  
  await fs.writeFile(
    path.join(WEBSITE_DIR, 'src/app/page.tsx'),
    content
  );
}

/**
 * 生成關於頁面
 */
async function generateAboutPage(config, templateStyle) {
  const template = await loadTemplate(templateStyle, 'about');
  const content = renderTemplate(template, config);
  
  await fs.ensureDir(path.join(WEBSITE_DIR, 'src/app/about'));
  await fs.writeFile(
    path.join(WEBSITE_DIR, 'src/app/about/page.tsx'),
    content
  );
}

/**
 * 生成聚會資訊頁面
 */
async function generateSchedulePage(config, templateStyle) {
  const pageContent = `export default function SchedulePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">聚會資訊</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        ${config.schedule.map(item => `
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">${item.name}</h2>
          <p className="text-gray-600 mb-2">${item.day} ${item.time}</p>
          ${item.location ? `<p className="text-gray-600">地點：${item.location}</p>` : ''}
          ${item.description ? `<p className="mt-4">${item.description}</p>` : ''}
        </div>
        `).join('')}
      </div>
    </div>
  );
}`;

  await fs.ensureDir(path.join(WEBSITE_DIR, 'src/app/schedule'));
  await fs.writeFile(
    path.join(WEBSITE_DIR, 'src/app/schedule/page.tsx'),
    pageContent
  );
}

/**
 * 生成講道頁面
 */
async function generateSermonsPage(config, templateStyle) {
  const pageContent = `export default function SermonsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">講道信息</h1>
      <p>講道內容將在此顯示</p>
    </div>
  );
}`;

  await fs.ensureDir(path.join(WEBSITE_DIR, 'src/app/sermons'));
  await fs.writeFile(
    path.join(WEBSITE_DIR, 'src/app/sermons/page.tsx'),
    pageContent
  );
}

/**
 * 生成活動頁面
 */
async function generateEventsPage(config, templateStyle) {
  const pageContent = `export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">活動報名</h1>
      <p>活動資訊將在此顯示</p>
    </div>
  );
}`;

  await fs.ensureDir(path.join(WEBSITE_DIR, 'src/app/events'));
  await fs.writeFile(
    path.join(WEBSITE_DIR, 'src/app/events/page.tsx'),
    pageContent
  );
}

/**
 * 生成聯絡頁面
 */
async function generateContactPage(config, templateStyle) {
  const pageContent = `export default function ContactPage() {
  const contact = ${JSON.stringify(config.contact)};
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">聯絡我們</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">聯絡資訊</h2>
          <p className="mb-2">電話：{contact.phone}</p>
          <p className="mb-2">Email：{contact.email}</p>
          {contact.officeHours && <p>辦公時間：{contact.officeHours}</p>}
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">聯絡表單</h2>
          <form className="space-y-4">
            <input type="text" placeholder="姓名" className="w-full p-2 border rounded" />
            <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
            <textarea placeholder="訊息" rows={4} className="w-full p-2 border rounded"></textarea>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">送出</button>
          </form>
        </div>
      </div>
    </div>
  );
}`;

  await fs.ensureDir(path.join(WEBSITE_DIR, 'src/app/contact'));
  await fs.writeFile(
    path.join(WEBSITE_DIR, 'src/app/contact/page.tsx'),
    pageContent
  );
}

/**
 * 生成奉獻頁面
 */
async function generateDonationPage(config, templateStyle) {
  const pageContent = `export default function DonationPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">奉獻支持</h1>
      <p>奉獻資訊將在此顯示</p>
    </div>
  );
}`;

  await fs.ensureDir(path.join(WEBSITE_DIR, 'src/app/donate'));
  await fs.writeFile(
    path.join(WEBSITE_DIR, 'src/app/donate/page.tsx'),
    pageContent
  );
}

/**
 * 生成元件
 */
async function generateComponents(config, templateStyle) {
  // 導航列
  await generateNavbar(config);
  
  // 頁尾
  await generateFooter(config);
}

/**
 * 生成導航列元件
 */
async function generateNavbar(config) {
  const navItems = config.navigation?.items || [
    { label: '首頁', path: '/' },
    { label: '關於我們', path: '/about' },
    { label: '聚會資訊', path: '/schedule' },
    { label: '講道信息', path: '/sermons' },
    { label: '活動報名', path: '/events' },
    { label: '聯絡我們', path: '/contact' }
  ];

  const navbarContent = `import Link from 'next/link';

export default function Navbar() {
  const churchName = "${config.churchInfo?.shortName || '教會'}";
  
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold">
            {churchName}
          </Link>
          
          <div className="hidden md:flex space-x-6">
            ${navItems.map(item => `
            <Link href="${item.path}" className="hover:text-blue-600">
              ${item.label}
            </Link>
            `).join('')}
          </div>
        </div>
      </div>
    </nav>
  );
}`;

  await fs.writeFile(
    path.join(WEBSITE_DIR, 'src/components/Navbar.tsx'),
    navbarContent
  );
}

/**
 * 生成頁尾元件
 */
async function generateFooter(config) {
  const footerContent = `export default function Footer() {
  const contact = ${JSON.stringify(config.contact)};
  
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">聯絡資訊</h3>
            <p>{contact.phone}</p>
            <p>{contact.email}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">地址</h3>
            <p>${config.address?.street || ''}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">社交媒體</h3>
            {/* 社交媒體連結 */}
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2024 ${config.churchInfo?.fullName || '教會'}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}`;

  await fs.writeFile(
    path.join(WEBSITE_DIR, 'src/components/Footer.tsx'),
    footerContent
  );
}

/**
 * 生成樣式配置
 */
async function generateStyles(config) {
  const colors = {
    primary: config.branding?.primaryColor || '#3B82F6',
    secondary: config.branding?.secondaryColor || '#10B981',
    accent: config.branding?.accentColor || '#F59E0B'
  };

  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '${colors.primary}',
        secondary: '${colors.secondary}',
        accent: '${colors.accent}',
      },
      fontFamily: {
        sans: ['${config.branding?.fontFamily || 'Noto Sans TC'}', 'sans-serif'],
      },
    },
  },
  plugins: [],
}`;

  await fs.writeFile(
    path.join(WEBSITE_DIR, 'tailwind.config.js'),
    tailwindConfig
  );

  // globals.css
  const globalsCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: '${config.branding?.fontFamily || 'Noto Sans TC'}', sans-serif;
}`;

  await fs.writeFile(
    path.join(WEBSITE_DIR, 'src/app/globals.css'),
    globalsCss
  );
}

/**
 * 複製靜態資源
 */
async function copyStaticAssets() {
  // 這裡可以複製 logo、圖片等靜態資源
  // 目前建立空的目錄結構
}

/**
 * 生成 package.json
 */
async function generatePackageJson(config) {
  const packageJson = {
    name: config.churchInfo?.shortName?.toLowerCase().replace(/\s+/g, '-') || 'church-website',
    version: '1.0.0',
    private: true,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      export: 'next build && next export'
    },
    dependencies: {
      next: '^14.1.0',
      react: '^18.2.0',
      'react-dom': '^18.2.0'
    },
    devDependencies: {
      '@types/node': '^20',
      '@types/react': '^18',
      '@types/react-dom': '^18',
      autoprefixer: '^10.4.17',
      postcss: '^8.4.33',
      tailwindcss: '^3.4.1',
      typescript: '^5'
    }
  };

  await fs.writeJson(
    path.join(WEBSITE_DIR, 'package.json'),
    packageJson,
    { spaces: 2 }
  );
}

/**
 * 安裝依賴
 */
async function installDependencies() {
  console.log('(模擬安裝中... 實際使用時需執行 npm install)');
  // 實際環境中應執行：
  // const { exec } = require('child_process');
  // exec('npm install', { cwd: WEBSITE_DIR });
}

/**
 * 載入模板
 */
async function loadTemplate(style, page) {
  // 簡化版：返回基本模板
  return `// ${page} template for ${style} style`;
}

/**
 * 渲染模板
 */
function renderTemplate(template, config) {
  // 簡化版：基本字串替換
  return template;
}

// 執行主函數
if (require.main === module) {
  generateWebsite().catch(console.error);
}

module.exports = { generateWebsite };
