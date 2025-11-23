FROM node:22-alpine
ENV CI=true
WORKDIR /opt/app
ADD package.json package.json
RUN npm install -g pnpm
RUN pnpm install
ADD . .
RUN pnpm build
RUN pnpm prune --production
CMD ["node", "./dist/main.js"]
