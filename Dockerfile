# Build stage for Frontend
FROM node:18-alpine as frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
# Build for production
RUN npm run build

# Setup Backend and Serve
FROM node:18-alpine
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install --production
COPY backend/ ./

# Copy built frontend assets to backend's public folder
# We'll serve these from /public in the backend
COPY --from=frontend-build /app/frontend/dist ./public

# Configuration
ENV PORT=3001
ENV NODE_ENV=production
# Serve from local since we are in the same container
ENV FRONTEND_URL=http://localhost:3001 

EXPOSE 3001
CMD ["node", "server.js"]
