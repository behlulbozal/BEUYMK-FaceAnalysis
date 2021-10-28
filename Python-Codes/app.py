from flask import Flask, redirect, url_for, request
from deepface import DeepFace
import base64
from io import BytesIO
from PIL import Image
import random

app = Flask(__name__)


@app.route('/fotograf', methods=['POST', 'GET'])
def fotograf():
    if request.method == 'POST':
        backends = ['opencv', 'ssd', 'dlib', 'mtcnn', 'retinaface']
        file = request.form.get("fotograf")
        starter = file.find(',')
        image_data = file[starter+1:]
        image_data = bytes(image_data, encoding="ascii")
        im = Image.open(BytesIO(base64.b64decode(image_data)))
        fileName ='g/'+ str(random.randint(500, 999999)) + '.jpg'
        im.save(fileName)

        demography = DeepFace.analyze(
            img_path=fileName, detector_backend=backends[0],enforce_detection=False)
        return demography


if __name__ == '__main__':
    app.run(debug=True)
