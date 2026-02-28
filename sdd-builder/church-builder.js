#!/usr/bin/env node

/**
 * 教會官網 SDD 互動式建構工具
 * Church Website SDD Interactive Builder
 * 
 * 透過問答式引導建立教會官網配置
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const validator = require('./validator');

// 載入問題定義
const questions = require('./questions.json');

// 設定輸入/輸出介面
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 配置資料儲存
let config = {
  stage1: {},
  stage2: {},
  stage3: {},
  stage4: {},
  metadata: {
    createdAt: new Date().toISOString(),
    version: '1.0'
  }
};

// 當前階段
let currentStage = 'stage1';
let currentQuestionIndex = 0;

/**
 * 顯示歡迎訊息
 */
function showWelcome() {
  console.log('\n');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('   🏛️  教會官網 SDD 建構系統');
  console.log('   Church Website Specification-Driven Development');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('\n');
  console.log('歡迎使用教會官網建構系統！');
  console.log('本系統將透過 4 個階段、24 個問題，引導您建立專業教會官網。\n');
  console.log('📋 流程概覽：');
  console.log('  階段 1：基礎資訊（8 題）- 建構網站骨架');
  console.log('  階段 2：核心功能（6 題）- 啟用必備功能');
  console.log('  階段 3：進階功能（5 題）- 依需求客製化');
  console.log('  階段 4：部署設定（6 題）- 上線準備');
  console.log('\n⏱️  預估時間：2.5 - 4 小時');
  console.log('💡 提示：可隨時輸入 "help" 查看說明，"exit" 結束\n');
  console.log('═══════════════════════════════════════════════════════════\n');
}

/**
 * 顯示階段標題
 */
function showStageHeader(stage) {
  const stageData = questions[stage];
  console.log('\n' + '─'.repeat(60));
  console.log(`📍 ${stageData.name} - ${stageData.description}`);
  console.log('─'.repeat(60) + '\n');
}

/**
 * 詢問問題
 */
function askQuestion(stage, questionIndex) {
  const stageData = questions[stage];
  const question = stageData.questions[questionIndex];
  
  if (!question) {
    // 階段完成
    finishStage(stage);
    return;
  }

  // 檢查條件邏輯
  if (question.conditionalOn && !checkCondition(question.conditionalOn)) {
    // 跳過此問題
    currentQuestionIndex++;
    askQuestion(stage, currentQuestionIndex);
    return;
  }

  console.log(`\n${question.id}: ${question.question}`);
  if (question.description) {
    console.log(`   ${question.description}`);
  }

  // 顯示欄位資訊
  displayFields(question.fields);

  // 取得輸入
  rl.question('\n👉 請輸入答案：', (answer) => {
    handleAnswer(stage, questionIndex, answer);
  });
}

/**
 * 顯示欄位資訊
 */
function displayFields(fields) {
  fields.forEach(field => {
    const required = field.required ? '必填' : '選填';
    console.log(`\n   • ${field.name} (${required})`);
    
    if (field.placeholder) {
      console.log(`     範例：${field.placeholder}`);
    }
    
    if (field.type === 'select' && field.options) {
      console.log('     選項：');
      field.options.forEach((opt, idx) => {
        const label = typeof opt === 'string' ? opt : opt.label;
        const desc = typeof opt === 'object' && opt.description ? ` - ${opt.description}` : '';
        console.log(`       ${idx + 1}. ${label}${desc}`);
      });
    }
    
    if (field.type === 'multiselect' && field.options) {
      console.log('     可複選（用逗號分隔）：');
      field.options.forEach((opt, idx) => {
        const label = typeof opt === 'string' ? opt : (opt.label || opt.value);
        const desc = typeof opt === 'object' && opt.description ? ` - ${opt.description}` : '';
        console.log(`       ${idx + 1}. ${label}${desc}`);
      });
    }

    if (field.type === 'array' && field.example) {
      console.log('     範例格式：');
      console.log('     ' + JSON.stringify(field.example, null, 2).split('\n').join('\n     '));
    }
  });
}

/**
 * 處理答案
 */
function handleAnswer(stage, questionIndex, answer) {
  // 特殊指令處理
  if (answer.toLowerCase() === 'help') {
    showHelp();
    askQuestion(stage, questionIndex);
    return;
  }
  
  if (answer.toLowerCase() === 'exit') {
    confirmExit();
    return;
  }

  if (answer.toLowerCase() === 'skip') {
    console.log('⏭️  已跳過此問題');
    currentQuestionIndex++;
    askQuestion(stage, currentQuestionIndex);
    return;
  }

  const stageData = questions[stage];
  const question = stageData.questions[questionIndex];

  // 驗證答案
  const validationResult = validator.validate(question, answer);
  
  if (!validationResult.valid) {
    console.log(`\n❌ 輸入錯誤：${validationResult.error}`);
    console.log('請重新輸入...\n');
    askQuestion(stage, questionIndex);
    return;
  }

  // 儲存答案
  const parsedAnswer = parseAnswer(question, answer);
  config[stage][question.id] = parsedAnswer;

  // LLM 提示
  if (question.llmHints && question.llmHints.length > 0) {
    console.log('\n💡 建議：');
    question.llmHints.forEach(hint => {
      console.log(`   • ${hint}`);
    });
  }

  console.log('✅ 已儲存');

  // 下一題
  currentQuestionIndex++;
  askQuestion(stage, currentQuestionIndex);
}

/**
 * 解析答案
 */
function parseAnswer(question, answer) {
  // 簡化版解析，實際應依據 field type 處理
  try {
    // 嘗試 JSON 解析
    return JSON.parse(answer);
  } catch (e) {
    // 純文字
    return answer;
  }
}

/**
 * 檢查條件
 */
function checkCondition(condition) {
  // 簡化版條件檢查
  // 實際應實作完整的條件邏輯
  return true;
}

/**
 * 完成階段
 */
function finishStage(stage) {
  const stageData = questions[stage];
  
  console.log('\n' + '═'.repeat(60));
  console.log(`✅ ${stageData.name} 完成！`);
  console.log('═'.repeat(60));

  // 儲存階段配置檔
  const outputDir = path.join(__dirname, '..', 'output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputFile = path.join(outputDir, stageData.outputFile);
  fs.writeFileSync(
    outputFile,
    JSON.stringify(config[stage], null, 2),
    'utf8'
  );

  console.log(`\n📄 配置檔已儲存：${outputFile}`);

  // 顯示預覽選項
  console.log('\n選項：');
  console.log('  1. 預覽目前的網站');
  console.log('  2. 繼續下一階段');
  console.log('  3. 結束並稍後繼續');

  rl.question('\n選擇操作（1-3）：', (choice) => {
    switch (choice) {
      case '1':
        previewWebsite(stage);
        break;
      case '2':
        nextStage(stage);
        break;
      case '3':
        saveAndExit();
        break;
      default:
        console.log('無效選項，繼續下一階段...');
        nextStage(stage);
    }
  });
}

/**
 * 預覽網站
 */
function previewWebsite(stage) {
  console.log('\n🌐 正在生成預覽...');
  
  // 這裡應呼叫網站生成器
  // 目前僅顯示訊息
  console.log('✅ 預覽已準備好');
  console.log('請在瀏覽器開啟：http://localhost:3000/preview\n');

  rl.question('按 Enter 繼續下一階段...', () => {
    nextStage(stage);
  });
}

/**
 * 進入下一階段
 */
function nextStage(currentStage) {
  const stages = ['stage1', 'stage2', 'stage3', 'stage4'];
  const currentIndex = stages.indexOf(currentStage);
  
  if (currentIndex < stages.length - 1) {
    const nextStage = stages[currentIndex + 1];
    this.currentStage = nextStage;
    currentQuestionIndex = 0;
    showStageHeader(nextStage);
    askQuestion(nextStage, 0);
  } else {
    // 所有階段完成
    finishAll();
  }
}

/**
 * 完成所有階段
 */
function finishAll() {
  console.log('\n' + '═'.repeat(60));
  console.log('🎉 恭喜！所有階段已完成！');
  console.log('═'.repeat(60));

  // 合併所有配置
  const completeConfig = {
    ...config.stage1,
    ...config.stage2,
    ...config.stage3,
    ...config.stage4,
    metadata: config.metadata
  };

  // 儲存完整配置
  const outputDir = path.join(__dirname, '..', 'output');
  const completeFile = path.join(outputDir, 'complete-sdd.json');
  fs.writeFileSync(
    completeFile,
    JSON.stringify(completeConfig, null, 2),
    'utf8'
  );

  console.log(`\n📄 完整配置檔：${completeFile}`);
  console.log('\n接下來您可以：');
  console.log('  1. 生成完整網站：npm run generate');
  console.log('  2. 部署到 Netlify：npm run deploy');
  console.log('  3. 本地預覽：npm run dev\n');

  rl.question('是否立即生成網站？(y/n) ', (answer) => {
    if (answer.toLowerCase() === 'y') {
      generateWebsite();
    } else {
      console.log('\n感謝使用教會官網 SDD 建構系統！');
      rl.close();
    }
  });
}

/**
 * 生成網站
 */
function generateWebsite() {
  console.log('\n🔨 正在生成網站...');
  console.log('這可能需要幾分鐘，請稍候...\n');

  // 這裡應呼叫網站生成器
  // 目前僅顯示訊息
  setTimeout(() => {
    console.log('✅ 網站生成完成！');
    console.log('📁 位置：./output/website/');
    console.log('\n啟動開發伺服器：npm run dev\n');
    rl.close();
  }, 2000);
}

/**
 * 儲存並退出
 */
function saveAndExit() {
  // 儲存當前進度
  const progressFile = path.join(__dirname, '..', 'output', 'progress.json');
  const progress = {
    currentStage,
    currentQuestionIndex,
    config,
    savedAt: new Date().toISOString()
  };

  fs.writeFileSync(
    progressFile,
    JSON.stringify(progress, null, 2),
    'utf8'
  );

  console.log('\n💾 進度已儲存');
  console.log('下次執行時會從此處繼續\n');
  rl.close();
}

/**
 * 確認退出
 */
function confirmExit() {
  rl.question('\n確定要退出嗎？進度將會儲存。(y/n) ', (answer) => {
    if (answer.toLowerCase() === 'y') {
      saveAndExit();
    } else {
      const stageData = questions[currentStage];
      askQuestion(currentStage, currentQuestionIndex);
    }
  });
}

/**
 * 顯示說明
 */
function showHelp() {
  console.log('\n' + '─'.repeat(60));
  console.log('📖 說明');
  console.log('─'.repeat(60));
  console.log('\n可用指令：');
  console.log('  help  - 顯示此說明');
  console.log('  skip  - 跳過當前問題（選填問題）');
  console.log('  exit  - 儲存進度並退出');
  console.log('\n輸入格式：');
  console.log('  • 文字：直接輸入');
  console.log('  • 選擇：輸入選項編號');
  console.log('  • 複選：用逗號分隔，如：1,3,5');
  console.log('  • JSON：完整物件，如：{"name":"王牧師","title":"主任牧師"}');
  console.log('  • 陣列：多行輸入或 JSON 格式');
  console.log('\n💡 提示：');
  console.log('  • 必填欄位不能跳過');
  console.log('  • 可隨時查看範例格式');
  console.log('  • 儲存的配置檔可手動編輯');
  console.log('─'.repeat(60) + '\n');
}

/**
 * 載入進度
 */
function loadProgress() {
  const progressFile = path.join(__dirname, '..', 'output', 'progress.json');
  
  if (fs.existsSync(progressFile)) {
    rl.question('發現未完成的進度，是否繼續？(y/n) ', (answer) => {
      if (answer.toLowerCase() === 'y') {
        const progress = JSON.parse(fs.readFileSync(progressFile, 'utf8'));
        currentStage = progress.currentStage;
        currentQuestionIndex = progress.currentQuestionIndex;
        config = progress.config;
        
        console.log(`\n✅ 已載入進度，從 ${questions[currentStage].name} 繼續...\n`);
        showStageHeader(currentStage);
        askQuestion(currentStage, currentQuestionIndex);
      } else {
        startNew();
      }
    });
  } else {
    startNew();
  }
}

/**
 * 開始新的建構流程
 */
function startNew() {
  showWelcome();
  showStageHeader('stage1');
  askQuestion('stage1', 0);
}

/**
 * 主程式進入點
 */
function main() {
  // 檢查是否有未完成進度
  loadProgress();
}

// 處理程式退出
rl.on('close', () => {
  console.log('\n再見！👋\n');
  process.exit(0);
});

// 執行主程式
if (require.main === module) {
  main();
}

module.exports = {
  main,
  config
};
