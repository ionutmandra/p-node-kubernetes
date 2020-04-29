FROM risingstack/alpine:3.4-v8.5.0-4.7.0

WORKDIR /wdir

ENV PORT 3000

EXPOSE 3000

COPY package.json package.json
RUN npm install

COPY . .

CMD ["node", "."]
