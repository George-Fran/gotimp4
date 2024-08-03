# Usa una imagen base que soporte FFmpeg y Python
FROM python:3.11-slim

# Instalar FFmpeg
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Configura el entorno de trabajo
WORKDIR /app

# Copia el archivo de requerimientos y instala dependencias
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copia el resto del código
COPY . .

# Expone el puerto y ejecuta la aplicación
EXPOSE 5000
CMD ["python", "app.py"]
