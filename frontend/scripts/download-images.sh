#!/usr/bin/env bash
# Downloads Pixieset paths listed in pixieset-urls.txt into public/images/
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/images"
BASE="https://images-pw.pixieset.com"
while IFS= read -r line || [[ -n "$line" ]]; do
  [[ "$line" =~ ^[[:space:]]*# ]] && continue
  [[ -z "${line// }" ]] && continue
  path=$(echo "$line" | tr -d '\r')
  dest="$OUT$path"
  mkdir -p "$(dirname "$dest")"
  echo "GET $BASE$path"
  curl -fsSL "$BASE$path" -o "$dest"
done < "$ROOT/scripts/pixieset-urls.txt"
echo "Done. Set VITE_USE_LOCAL_IMAGES=true when serving if assets are mirrored at /images/..."
