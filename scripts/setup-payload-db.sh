#!/bin/bash
# This script uses expect to automatically answer Payload's interactive prompts

cd "$(dirname "$0")/.."
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 20

echo "Setting up Payload database tables..."
echo "This will automatically answer all prompts with 'create table' (default option)"
echo ""

# Check if expect is installed
if ! command -v expect &> /dev/null; then
    echo "Error: 'expect' is not installed."
    echo "Install it with: brew install expect (on macOS)"
    exit 1
fi

# Use expect to answer prompts
expect << 'EOF'
set timeout 600
spawn npm run dev

# Wait for server to start
expect {
    "Ready in" {
        puts "\n✓ Server started, waiting for Payload prompts..."
        # Trigger admin route to make prompts appear
        exec sleep 2
        exec curl -s http://localhost:3002/admin > /dev/null 2>&1 &
        exp_continue
    }
    "Is * table created or renamed" {
        puts "\nAnswering prompt..."
        send "\r"
        exp_continue
    }
    "Is * column in * table created or renamed" {
        puts "\nAnswering column prompt..."
        send "\r"
        exp_continue
    }
    "Accept warnings and push schema" {
        puts "\nAccepting schema push..."
        send "y\r"
        exp_continue
    }
    "Pulling schema from database" {
        puts "\nPayload is checking database..."
        exp_continue
    }
    "all table conflicts resolved" {
        puts "\nTable conflicts resolved, continuing..."
        exp_continue
    }
    "all columns conflicts" {
        puts "\nColumn conflicts resolved, continuing..."
        exp_continue
    }
    timeout {
        puts "\n✓ Setup complete! Server is running."
        puts "Database tables should be created."
        puts "You can now access http://localhost:3002/admin"
        puts "\nPress Ctrl+C to stop the server"
        interact
    }
    eof {
        puts "\nServer exited"
        exit 0
    }
}
EOF
