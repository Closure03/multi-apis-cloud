FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /app

COPY package*.json ./
RUN if [ -f package-lock.json ]; then \
			npm ci --omit=dev; \
		else \
			npm install --omit=dev; \
		fi

COPY src ./src

EXPOSE 4001
ENV PORT=4001 SERVICE_NAME=users-api
CMD ["node", "src/app.js"]