# Use Node.js 24
FROM node:24-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies (only production for smaller image)
RUN npm install --production

# Copy all source code
COPY . .

# Build (if you’re using Next.js / React / TS)
RUN npm run build

# Expose port (Vercel expects this)
EXPOSE 3000

# Start app
CMD ["npm", "start"]
