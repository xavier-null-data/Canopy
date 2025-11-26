#!/bin/sh
echo "Starting backend..."
cd backend
npm run dev &

echo "Starting frontend..."
cd ../frontend
npm start
