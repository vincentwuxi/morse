#!/bin/sh
set -e
export LANG=en_US.UTF-8

echo "🧩 Starting Post-Clone Script..."

# 1. 安装 CocoaPods
echo "📦 Installing CocoaPods..."
brew install cocoapods

# 2. 查找 Podfile (排除隐藏文件夹)
echo "🔍 Searching for Podfile..."
PODFILE_PATH=$(find . -name "Podfile" -not -path "*/.*" -print -quit)

if [ -z "$PODFILE_PATH" ]; then
    echo "❌ Error: Podfile not found in the repository!"
    ls -R
    exit 1
fi

echo "✅ Found Podfile at: $PODFILE_PATH"

# 3. 进入 Podfile 所在目录
cd "$(dirname "$PODFILE_PATH")"

echo "📂 Changed directory to: $(pwd)"

# 4. 安装依赖
echo "🚀 Running pod install..."
pod install --repo-update

echo "✅ CocoaPods installation completed!"
