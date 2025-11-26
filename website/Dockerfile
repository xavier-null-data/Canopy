FROM node:20-alpine

WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./backend/
# Copy frontend package files
COPY frontend/package*.json ./frontend/

# Install backend deps
RUN cd backend && npm install

# Install frontend deps
RUN cd frontend && npm install

# Copy full project
COPY . .

# Expose backend and frontend ports
EXPOSE 3001
EXPOSE 3000

# Start both using the shell script
CMD ["sh", "./start.sh"]
