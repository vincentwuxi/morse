#!/bin/sh
set -e
export LANG=en_US.UTF-8

echo "🧩 Starting Post-Clone Script..."

# 回到仓库根目录
cd "$(dirname "$0")/../../.."
echo "📂 Repository root: $(pwd)"

# 安装 Node.js 依赖（Podfile 需要 node_modules）
echo "📦 Installing Node.js dependencies..."
npm install

# 进入 iOS 项目目录
cd ios/App
echo "📂 iOS App directory: $(pwd)"

# 安装 CocoaPods
if ! command -v pod >/dev/null 2>&1; then
  echo "📦 Installing CocoaPods..."
  brew install cocoapods
else
  echo "📦 CocoaPods already installed."
fi

# 检查 Podfile 是否存在
if [ ! -f "Podfile" ]; then
    echo "❌ Error: Podfile not found in $(pwd)!"
    ls -la
    exit 1
fi

echo "✅ Found Podfile in $(pwd)"

# 安装 Pods 依赖
echo "🚀 Running pod install..."
pod install --repo-update

echo "✅ CocoaPods installation completed!"
