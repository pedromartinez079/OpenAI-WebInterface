# Usa la imagen base de Node.js
FROM node:20.18.0-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación al contenedor
COPY . .

# Construye la aplicación de Next.js
RUN npm run build

# Exponer el puerto en el que la aplicación correrá
EXPOSE 3000

# Comando por defecto para correr la aplicación
CMD ["npm", "start"]

# Image
# sudo docker build -t pedromartinez079/chatgpt-nextjs:0.0.1 .

# Container
# sudo docker run -d -rm -p 3000:3000 --env-file /home/qullqi/environments/.information4chatgpt --name chatgpt pedromartinez079/chatgpt-nextjs:0.0.1
# sudo docker run -d -p 3000:3000 --env-file /home/qullqi/environments/.information4chatgpt --name chatgpt pedromartinez079/chatgpt-nextjs:0.0.1
