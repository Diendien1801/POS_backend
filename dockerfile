FROM node:18-slim

# Create app directory and set permissions
WORKDIR /app

# Create non-root user
RUN groupadd -r nodejs && useradd -r -g nodejs nodeuser

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm ci --only=production

# Copy application code
COPY . .

# Set ownership
RUN chown -R nodeuser:nodejs /app

# Switch to non-root user
USER nodeuser

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3001', (r) => r.statusCode === 200 ? process.exit(0) : process.exit(1))"

# Run migrations and start the app
CMD ["sh", "-c", "npx knex migrate:latest && npx knex seed:run && npm start"]