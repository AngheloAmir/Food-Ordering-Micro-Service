FROM node:25-alpine3.22

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 5200
EXPOSE 5200

# Start the application
CMD ["npm", "run", "dev", "--", "--host"]
