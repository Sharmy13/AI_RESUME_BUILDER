# Build the frontend
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json vite.config.js ./
COPY public ./public
COPY src ./src
RUN npm install
RUN npm run build

# Build the backend image and copy the built frontend
FROM node:22-alpine AS runtime
WORKDIR /app
COPY backend/package.json backend/package-lock.json ./backend/
RUN cd backend && npm install --production
COPY backend ./backend
COPY --from=build /app/dist ./dist

WORKDIR /app/backend
EXPOSE 8080
CMD ["node", "server.js"]
