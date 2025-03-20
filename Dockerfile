# Use official Node.js 20 Alpine image
FROM node:20-alpine

# Create app directory and user
RUN mkdir -p /app && \
    adduser -D appuser && \
    chown -R appuser:appuser /app

# Set working directory
WORKDIR /app

# Copy package files
COPY --chown=appuser:appuser package.json package-lock.json ./

# Install dependencies including TypeScript globally
RUN npm install -g typescript && \
    npm install

# Copy project files
COPY --chown=appuser:appuser . .

# Switch to appuser
USER appuser

# Build the project
RUN npm run build

# Expose port
EXPOSE 3000

# Run the development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
