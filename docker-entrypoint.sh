#!/bin/sh
set -e

echo "🔄 Running database migrations..."
npx prisma migrate deploy 2>/dev/null || {
  echo "⚠️  No migrations found. Pushing schema directly..."
  npx prisma db push --skip-generate
}
echo "✅ Database is ready!"

echo "🚀 Starting Bible MAS..."
exec "$@"
