# Stage 1: Build the React app
FROM node:18 as build

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .
COPY .env .env

# Build the React app
RUN npm run build

# Stage 2: Serve the build with Nginx
FROM nginx:alpine

# Copy the build output from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy SSL certificates into the container
COPY certs/fullchain.pem /etc/letsencrypt/live/employeesinfo.hopto.org/fullchain.pem
COPY certs/privkey.pem /etc/letsencrypt/live/employeesinfo.hopto.org/privkey.pem

# Copy SSL parameters configuration
COPY options-ssl-nginx.conf /etc/nginx/options-ssl-nginx.conf

# Copy the dhparam.pem file
COPY ssl-dhparams.pem /etc/nginx/ssl-dhparams.pem

# Expose the ports Nginx is running on
EXPOSE 80
EXPOSE 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
