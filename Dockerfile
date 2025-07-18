# Stage 1: Build the React app
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile
COPY . .
RUN npm run build

# Stage 2: Serve the build with a lightweight web server
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/templates/default.conf.template
EXPOSE $PORT
CMD ["/bin/sh", "-c", "envsubst '$$PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"] 