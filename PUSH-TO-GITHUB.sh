#!/bin/bash

# 快速推送到 GitHub 腳本
# Quick Push to GitHub Script

echo "🚀 準備推送到 GitHub..."
echo ""

# 檢查是否已設定 remote
if git remote | grep -q "origin"; then
  echo "✅ 已設定遠端倉庫"
  git remote -v
else
  echo "⚠️  尚未設定遠端倉庫"
  echo ""
  echo "請執行以下指令（替換成你的 GitHub 資訊）："
  echo ""
  echo "  git remote add origin https://github.com/你的帳號/專案名稱.git"
  echo ""
  echo "範例："
  echo "  git remote add origin https://github.com/jjaim2/church-website-sdd.git"
  echo ""
  exit 1
fi

echo ""
echo "📦 推送程式碼到 GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
  echo ""
  echo "🎉 推送成功！"
  echo ""
  echo "你的專案已上傳到 GitHub"
  echo "請訪問你的 GitHub 頁面確認"
else
  echo ""
  echo "❌ 推送失敗"
  echo ""
  echo "可能的原因："
  echo "1. 遠端倉庫 URL 不正確"
  echo "2. 沒有權限（需要登入或 Personal Access Token）"
  echo "3. 網路連線問題"
  echo ""
  echo "請檢查錯誤訊息或使用 LLM 協助解決"
fi
