# Base image
FROM node:18

# Working directory inside the container
WORKDIR /app

# Copy backend package files
# Since the Dockerfile is inside /website, context includes backend/
COPY backend/package*.json backend/

# Copy frontend package files
COPY frontend/package*.json frontend/

# Install backend dependencies
RUN cd backend && npm install

# Install frontend dependencies
RUN cd frontend && npm install

# Copy rest of backend and frontend code
COPY backend/ backend/
COPY frontend/ frontend/

# Build frontend
RUN cd frontend && npm run build

# Move frontend build to backend public folder (if needed)
# Ajusta si tu backend sirve estáticos en otra ruta
RUN mkdir -p backend/public && cp -r frontend/dist/* backend/public/

# Expose backend port
EXPOSE 3000

# Start backend
CMD ["node", "backend/index.js"]
