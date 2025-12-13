#!/bin/sh
set -e
export LANG=en_US.UTF-8

echo "🧩 Starting Post-Clone Script..."

# 回到仓库根目录
cd "$(dirname "$0")/../../.."
echo "📂 Repository root: $(pwd)"

# 安装 Node.js（如果不存在）
if ! command -v node >/dev/null 2>&1; then
  echo "📦 Installing Node.js..."
  brew install node
else
  echo "📦 Node.js already installed: $(node --version)"
fi

# 安装 pnpm（项目使用 pnpm）
if ! command -v pnpm >/dev/null 2>&1; then
  echo "📦 Installing pnpm..."
  npm install -g pnpm
else
  echo "📦 pnpm already installed: $(pnpm --version)"
fi

# 安装 Node.js 依赖（使用 pnpm）
echo "📦 Installing Node.js dependencies with pnpm..."
pnpm install

# 构建 Web 应用
echo "🔨 Building web app..."
pnpm run build

# 同步 Capacitor iOS（生成 public 目录和 config 文件）
echo "🔄 Syncing Capacitor iOS..."
pnpm exec cap sync ios

# 进入 iOS 项目目录
cd ios/App
echo "📂 iOS App directory: $(pwd)"

# 安装 CocoaPods（如果不存在）
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

echo "✅ CI Post-Clone Script Completed!"
