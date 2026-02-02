#!/bin/bash
# This script answers Payload's interactive prompts automatically
# It sends Enter (newline) for each prompt to accept the default "create table" option

cd "$(dirname "$0")"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 20

echo "Starting server and auto-answering Payload prompts..."
echo "This will send Enter for each prompt to accept 'create table'"
echo ""
echo "Once you see 'Ready', the admin panel will be available at:"
echo "http://localhost:3002/admin"
echo ""
echo "Press Ctrl+C to stop"
echo ""

# Create a function that sends newlines continuously
(
  while true; do
    printf '\n'
    sleep 0.1
  done
) | npm run dev
