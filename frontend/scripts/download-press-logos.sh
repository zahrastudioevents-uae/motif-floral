#!/usr/bin/env bash
# Press logos for the homepage live in public/images/press/*.svg (committed in the repo).
# motifloral.com returns HTTP 403 to scripted downloads; export logos from the browser
# (Network tab) if you need pixel-perfect raster replacements, then drop them here and
# point src in src/data/press.ts to /images/press/yourfile.png
set -euo pipefail
echo "OK: using bundled SVG wordmarks under frontend/public/images/press/"
ls -la "$(dirname "$0")/../public/images/press"
