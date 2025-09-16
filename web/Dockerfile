# Stage 1: The 'builder' stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: The 'production' stage
FROM nginx:stable-alpine
# Copy the built files from the 'builder' stage
COPY --from=builder /app/dist /usr/share/nginx/html
# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf
# Copy our custom nginx.conf file to the container
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80