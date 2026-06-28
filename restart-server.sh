#!/bin/bash

echo "🛑 Stopping server..."
kill $(cat /tmp/symfony-server.pid 2>/dev/null) 2>/dev/null
sleep 1

echo "🗑️  Clearing cache..."
rm -rf var/cache/*

echo "🚀 Starting server..."
php -d max_execution_time=120 -d memory_limit=256M -S 127.0.0.1:8000 -t public/ > /tmp/symfony-server.log 2>&1 &
echo $! > /tmp/symfony-server.pid
sleep 2

if lsof -ti:8000 > /dev/null 2>&1; then
  echo "✅ Server running at http://127.0.0.1:8000"
  echo ""
  echo "Campaign URL: http://127.0.0.1:8000/164286296"
else
  echo "❌ Server failed to start"
  tail -10 /tmp/symfony-server.log
fi
