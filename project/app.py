from flask import Flask, request, render_template, send_file, redirect, url_for, session, after_this_request
import yt_dlp
import os
import shutil
import tempfile
import urllib.parse  # Importar urllib.parse para manejar la codificación y decodificación de URLs

app = Flask(__name__)
app.secret_key = 'supersecretkey'  # Necesario para usar sesiones

DOWNLOAD_FOLDER = 'downloads'  # Carpeta para guardar las descargas

# Crear la carpeta de descargas si no existe
if not os.path.exists(DOWNLOAD_FOLDER):
    os.makedirs(DOWNLOAD_FOLDER)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        video_url = request.form['url']
        
        # Crear un directorio temporal
        with tempfile.TemporaryDirectory() as temp_dir:
            ydl_opts = {
                'format': 'bestvideo+bestaudio/best',
                'merge_output_format': 'mp4',
                'outtmpl': os.path.join(temp_dir, '%(title)s.%(ext)s'),
            }

            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info_dict = ydl.extract_info(video_url, download=True)
                file_name = ydl.prepare_filename(info_dict)
                file_name = file_name.replace('.webm', '.mp4')  # Asegurarse de que la extensión sea .mp4
                dest_file_name = os.path.join(DOWNLOAD_FOLDER, os.path.basename(file_name))
                
                # Mover el archivo a la carpeta de descargas
                shutil.move(file_name, dest_file_name)

            # Guardar el nombre del archivo en la sesión para usarlo después
            session['file_name'] = os.path.basename(dest_file_name)

            # Redirigir a la página de éxito
            return redirect(url_for('success'))

    return render_template('index.html')

@app.route('/success')
def success():
    file_name = session.get('file_name', None)
    if not file_name:
        return redirect(url_for('index'))
    
    return render_template('success.html', file_name=urllib.parse.quote(file_name))

@app.route('/download/<path:filename>')
def download_file(filename):
    file_path = os.path.join(DOWNLOAD_FOLDER, urllib.parse.unquote(filename))

    @after_this_request
    def remove_file(response):
        try:
            os.remove(file_path)
        except Exception as e:
            app.logger.error(f'Error removing file: {e}')
        return response

    return send_file(file_path, as_attachment=True, download_name=urllib.parse.unquote(filename))

if __name__ == '__main__':
    app.run(debug=True)
