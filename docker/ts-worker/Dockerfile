FROM zenika/alpine-chrome:with-node
USER root
WORKDIR /app
COPY ts-worker/package*.json ./
RUN npm install
COPY ts-worker ./
RUN npm run build
EXPOSE 9090
CMD ["npm", "run", "start"]