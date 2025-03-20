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

# Install mkcert and generate certificates
RUN npm install -g mkcert && \
    mkcert -install && \
    mkcert localhost

# Install dependencies including TypeScript globally
RUN npm install -g typescript && \
    npm install

# Copy project files
COPY --chown=appuser:appuser . .

# Switch to appuser
USER appuser

# Build the project
RUN npm run build

# Expose ports
EXPOSE 3000
EXPOSE 443

# Run the development server with HTTPS on all interfaces
CMD ["npm", "run", "dev:https", "--", "--host", "0.0.0.0"]
