#!/bin/bash
echo "Starting build process..."

# Install dependencies
echo "Installing dependencies..."
npm ci

# Check if TypeScript is available
if npm list typescript > /dev/null 2>&1; then
    echo "TypeScript found, running type check..."
    npm run type-check || echo "Type check failed, continuing anyway..."
else
    echo "TypeScript not found, installing..."
    npm install --save-dev typescript @types/node @types/react @types/react-dom
fi

# Build the project
echo "Building Next.js application..."
npm run build

echo "Build complete!"