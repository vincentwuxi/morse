#!/bin/sh

# 遇到错误立即停止 (非常重要，否则脚本出错了构建还会继续，最后报奇怪的错)
set -e

echo "🧩 Starting Post-Clone Script..."

# 打印当前目录，确认位置
echo "📂 Current directory: $(pwd)"

# 安装 CocoaPods
echo "📦 Installing CocoaPods..."
# 使用 Homebrew 安装，确保环境兼容
brew install cocoapods

# 进入 iOS 目录
# 根据你的日志，Podfile 应该在 ios/App 目录下
cd ios/App

# 再次确认目录存在
echo "📂 Changed to directory: $(pwd)"

# 检查 Podfile 是否存在
if [ ! -f "Podfile" ]; then
    echo "❌ Error: Podfile not found in $(pwd)!"
    ls -la
    exit 1
fi

# 安装依赖
echo "🚀 Running pod install..."
pod install

echo "✅ Post-Clone Script Completed Successfully!"
