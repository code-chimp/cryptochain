#!/usr/bin/env pwsh

# stand up a redis instance
docker run --name cryptochain_dev `
  -p 6379:6379 `
  -d redis:7
