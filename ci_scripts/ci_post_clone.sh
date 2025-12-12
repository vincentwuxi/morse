#!/bin/sh

# 输出正在执行的操作，方便调试
echo "🧩 Starting Post-Clone Script..."

# 1. 安装 CocoaPods (如果 CI 环境没有预装或版本不匹配)
echo "📦 Installing CocoaPods..."
brew install cocoapods

# 2. 进入 iOS 项目目录
# 注意：根据日志，workspace 在 ios/App 下，所以 Podfile 应该在 ios/App
cd ios/App

# 3. 安装 Pods 依赖
echo "🚀 Running pod install..."
pod install

echo "✅ Post-Clone Script Completed!"
