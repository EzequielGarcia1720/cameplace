FROM node:lts-alpine

# Install http-server globally
RUN npm install -g http-server

# Set the working directory
WORKDIR /app

# Copy the build files (assuming they are in the current directory)
COPY . .

# Expose the port
EXPOSE 8080

# Run http-server on port 8080
CMD ["http-server", "-p", "8080"]
