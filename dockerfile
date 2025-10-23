# Usa una imagen oficial de Node.js
FROM node:18-alpine

# Crea un directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto donde corre el servidor (por ejemplo 3000)
EXPOSE 3000

# Comando por defecto (modo desarrollo)
CMD ["npm", "run", "dev"]
