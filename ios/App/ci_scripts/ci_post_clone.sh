#!/bin/sh
set -e
export LANG=en_US.UTF-8

echo "🧩 Starting Post-Clone Script..."

# 首先回到 ios/App 目录（ci_scripts 的上级目录）
cd "$(dirname "$0")/.."
echo "📂 Working directory: $(pwd)"

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

# 安装依赖
echo "🚀 Running pod install..."
pod install --repo-update

echo "✅ CocoaPods installation completed!"
