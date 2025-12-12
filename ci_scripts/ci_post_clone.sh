#!/bin/sh

# 遇到错误立即停止
set -e

# 设置语言环境，防止 CocoaPods 报编码错误
export LANG=en_US.UTF-8

echo "🧩 Starting Post-Clone Script..."

# 1. 安装 CocoaPods (使用 Homebrew)
echo "📦 Installing CocoaPods..."
brew install cocoapods

# 2. 自动寻找 Podfile 文件位置
echo "🔍 Searching for Podfile..."
PODFILE_PATH=$(find . -name "Podfile" -not -path "*/.*" -print -quit)

if [ -z "$PODFILE_PATH" ]; then
    echo "❌ Error: Podfile not found in the repository!"
    # 打印当前目录结构以供调试
    echo "📂 Directory structure:"
    find . -maxdepth 3 -not -path '*/.*'
    exit 1
fi

echo "✅ Found Podfile at: $PODFILE_PATH"

# 3. 进入 Podfile 所在目录
PODS_DIR=$(dirname "$PODFILE_PATH")
cd "$PODS_DIR"

echo "📂 Changed directory to: $(pwd)"

# 4. 安装依赖
echo "🚀 Running pod install..."
# 使用 --repo-update 确保拉取到最新的库 specs
pod install --repo-update

echo "✅ CocoaPods installation completed!"
