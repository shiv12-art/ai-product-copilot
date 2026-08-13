# AI Product Copilot - Docker Setup
# Build: docker build -t ai-product-copilot .
# Run: docker run -p 3000:3000 ai-product-copilot

FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production

# Start application
CMD ["npm", "start"]
