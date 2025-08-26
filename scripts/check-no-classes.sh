#!/bin/bash

# TypeScript/JavaScript クラス使用検出スクリプト
# このプロジェクトでは関数型プログラミングを採用しているため、クラスの使用を禁止します

set -e

echo "🔍 Checking for class usage in TypeScript/JavaScript files..."

# 検索対象ディレクトリ（テストファイルも含む）
SEARCH_DIRS="src test"

# 追加でプロジェクトルートの個別ファイルもチェック
ROOT_FILES="*.ts *.tsx *.js *.jsx"

# クラス検出パターン
CLASS_PATTERNS=(
    "export class "
    "class [A-Z]"
    "export default class"
    "abstract class"
    "export abstract class"
)

# 除外パターン（コメントなど）
EXCLUDE_PATTERNS=(
    "^\s*\/\/"      # 単行コメント
    "^\s*\*"        # 複数行コメント
    "\/\*.*\*\/"    # インラインコメント
)

found_classes=0
total_files=0

# TypeScript/JavaScriptファイルを検索
for dir in $SEARCH_DIRS; do
    if [ -d "$dir" ]; then
        while IFS= read -r -d '' file; do
            ((total_files++))

            # 各クラスパターンをチェック
            for pattern in "${CLASS_PATTERNS[@]}"; do
                # ファイル内でパターンを検索
                matches=$(grep -n "$pattern" "$file" 2>/dev/null || true)

                if [ -n "$matches" ]; then
                    # 除外パターンでないかチェック
                    while IFS= read -r match; do
                        if [ -n "$match" ]; then
                            line_content=$(echo "$match" | cut -d: -f2-)
                            is_excluded=false

                            for exclude_pattern in "${EXCLUDE_PATTERNS[@]}"; do
                                if echo "$line_content" | grep -qE "$exclude_pattern"; then
                                    is_excluded=true
                                    break
                                fi
                            done

                            if [ "$is_excluded" = false ]; then
                                echo "❌ Class found in $file:"
                                echo "   Line $(echo "$match" | cut -d: -f1): $line_content"
                                ((found_classes++))
                            fi
                        fi
                    done <<< "$matches"
                fi
            done
        done < <(find "$dir" -type f \( -name "*.ts" -o -name "*.js" -o -name "*.tsx" -o -name "*.jsx" \) -print0 2>/dev/null)
    else
        echo "⚠️  Warning: Directory '$dir' not found"
    fi
done

# プロジェクトルートファイルもチェック
for pattern in $ROOT_FILES; do
    for file in $pattern; do
        if [ -f "$file" ] && [ "$file" != "*.ts" ] && [ "$file" != "*.tsx" ] && [ "$file" != "*.js" ] && [ "$file" != "*.jsx" ]; then
            ((total_files++))

            # 各クラスパターンをチェック
            for class_pattern in "${CLASS_PATTERNS[@]}"; do
                # ファイル内でパターンを検索
                matches=$(grep -n "$class_pattern" "$file" 2>/dev/null || true)

                if [ -n "$matches" ]; then
                    # 除外パターンでないかチェック
                    while IFS= read -r match; do
                        if [ -n "$match" ]; then
                            line_content=$(echo "$match" | cut -d: -f2-)
                            is_excluded=false

                            for exclude_pattern in "${EXCLUDE_PATTERNS[@]}"; do
                                if echo "$line_content" | grep -qE "$exclude_pattern"; then
                                    is_excluded=true
                                    break
                                fi
                            done

                            if [ "$is_excluded" = false ]; then
                                echo "❌ Class found in $file:"
                                echo "   Line $(echo "$match" | cut -d: -f1): $line_content"
                                ((found_classes++))
                            fi
                        fi
                    done <<< "$matches"
                fi
            done
        fi
    done
done

echo ""
echo "📊 Scan Results:"
echo "   Files scanned: $total_files"
echo "   Classes found: $found_classes"

if [ $found_classes -eq 0 ]; then
    echo "✅ No classes detected! Functional programming rules maintained."
    exit 0
else
    echo ""
    echo "🚫 Class usage detected!"
    echo "This project follows functional programming principles."
    echo "Please refactor classes to use:"
    echo "   • Type definitions with factory functions"
    echo "   • Pure functions and higher-order functions"
    echo "   • Immutable data structures"
    echo ""
    echo "For examples, see the existing codebase implementation."
    exit 1
fi
