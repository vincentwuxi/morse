#!/bin/sh
set -e
export LANG=en_US.UTF-8

echo "🧩 Starting Post-Clone Script..."

# 安装 CocoaPods
if ! command -v pod >/dev/null 2>&1; then
  echo "📦 Installing CocoaPods..."
  brew install cocoapods
else
  echo "📦 CocoaPods already installed."
fi

# 查找 Podfile
echo "🔍 Searching for Podfile..."
PODFILE_PATH=$(find . -name "Podfile" -not -path "*/.*" -print -quit)

if [ -z "$PODFILE_PATH" ]; then
    echo "❌ Error: Podfile not found!"
    find . -maxdepth 3 -not -path '*/.*'
    exit 1
fi

# 进入目录并安装
cd "$(dirname "$PODFILE_PATH")"
echo "🚀 Running pod install..."
pod install --repo-update
