FROM node:18

WORKDIR /app

# Copy backend and frontend package files
COPY website/backend/package*.json backend/
COPY website/frontend/package*.json frontend/

# Install dependencies
RUN cd backend && npm install
RUN cd frontend && npm install

# Copy source code
COPY website/backend backend/
COPY website/frontend frontend/

# Build frontend
RUN cd frontend && npm run build

# Move React build into backend/public
RUN mkdir -p backend/public && cp -r frontend/build/* backend/public/

# Build backend (TypeScript -> JavaScript)
RUN cd backend && npm run build

EXPOSE 3000

# Start compiled backend
CMD ["node", "backend/dist/index.js"]
