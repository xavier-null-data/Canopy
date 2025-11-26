FROM node:18

WORKDIR /app

# Copy backend package files
COPY website/backend/package*.json backend/

# Copy frontend package files
COPY website/frontend/package*.json frontend/

# Install backend dependencies
RUN cd backend && npm install

# Install frontend dependencies
RUN cd frontend && npm install

# Copy the rest of backend and frontend code
COPY website/backend backend/
COPY website/frontend frontend/

# Build frontend
RUN cd frontend && npm run build

# Move frontend build to backend public folder
RUN mkdir -p backend/public && cp -r frontend/dist/* backend/public/

EXPOSE 3000

CMD ["node", "backend/index.js"]
