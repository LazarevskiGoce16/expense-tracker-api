# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy TypeScript config and source code
COPY tsconfig.json ./
COPY src/ ./src/

# Install dev dependencies for building
RUN npm ci

# Build the application
RUN npm run build

# Remove dev dependencies to reduce image size
RUN npm prune --production

# Expose the port the app runs on
EXPOSE 5000

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodeuser -u 1001

# Create data directory for SQLite and set permissions
RUN mkdir -p /app/data && chown -R nodeuser:nodejs /app/data

USER nodeuser

# Start the application
CMD ["npm", "start"]