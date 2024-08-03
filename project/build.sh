#!/bin/bash
set -e

# Instalar FFmpeg
apt-get update
apt-get install -y ffmpeg

# Instalar las dependencias de Python
pip install -r requirements.txt
