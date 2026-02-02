#!/bin/bash
cd "$(dirname "$0")"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 20

echo "Starting server with auto-answer for Payload prompts..."
echo "This will automatically answer 'create table' for all prompts"
echo ""
echo "Once you see 'Ready', open http://localhost:3002/admin in your browser"
echo "The first load may take 30-60 seconds - please be patient!"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Use yes to auto-answer all prompts with Enter (default choice)
yes "" | npm run dev
