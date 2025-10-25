FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies to build image
RUN npm install

# Copy source code into image
COPY . .

# Set port environment variable
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start the application to start container
CMD ["npm", "start"]
