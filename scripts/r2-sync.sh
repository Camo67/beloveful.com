#!/usr/bin/env bash
set -euo pipefail

# Sync a local directory to a Cloudflare R2 bucket using AWS CLI (preferred) or wrangler fallback.
# No secrets should be inline. Export these variables before running:
#   export R2_ACCOUNT_ID=xxxxxxxxxxxxxxxxxxxx
#   export R2_BUCKET=beloveful-assets
#   export R2_ACCESS_KEY_ID={{R2_ACCESS_KEY_ID}}
#   export R2_SECRET_ACCESS_KEY={{R2_SECRET_ACCESS_KEY}}
# Optional:
#   export R2_PREFIX=site
#   export SOURCE_DIR=public
#
# Usage:
#   bash scripts/r2-sync.sh
#
# AWS CLI method (faster): requires `aws` installed.
# Wrangler fallback: requires `wrangler` installed.

SOURCE_DIR=${SOURCE_DIR:-public}
R2_PREFIX=${R2_PREFIX:-}
: "${R2_ACCOUNT_ID:?R2_ACCOUNT_ID is required}"
: "${R2_BUCKET:?R2_BUCKET is required}"
: "${R2_ACCESS_KEY_ID:?R2_ACCESS_KEY_ID is required}"
: "${R2_SECRET_ACCESS_KEY:?R2_SECRET_ACCESS_KEY is required}"

ENDPOINT="https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com"

if command -v aws >/dev/null 2>&1; then
  echo "Using aws cli to sync ${SOURCE_DIR} to r2://${R2_BUCKET}/${R2_PREFIX}"
  AWS_ACCESS_KEY_ID="$R2_ACCESS_KEY_ID" \
  AWS_SECRET_ACCESS_KEY="$R2_SECRET_ACCESS_KEY" \
  aws s3 sync "${SOURCE_DIR}" "s3://${R2_BUCKET}/${R2_PREFIX}" \
    --endpoint-url "${ENDPOINT}" \
    --no-progress \
    --only-show-errors
  exit 0
fi

if command -v wrangler >/dev/null 2>&1; then
  echo "aws not found; falling back to wrangler (slower, per-file uploads)"
  # Iterate files and upload with wrangler
  while IFS= read -r -d '' file; do
    rel_path="${file#${SOURCE_DIR}/}"
    key="${R2_PREFIX:+${R2_PREFIX}/}${rel_path}"
    echo "Uploading: ${key}"
    wrangler r2 object put "${R2_BUCKET}/${key}" --file="${file}" >/dev/null
  done < <(find "${SOURCE_DIR}" -type f -print0)
  exit 0
fi

echo "Neither aws nor wrangler CLI found. Please install one of them:"
echo "  - AWS CLI: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
echo "  - Wrangler: https://developers.cloudflare.com/workers/wrangler/install-and-update/"
exit 1
