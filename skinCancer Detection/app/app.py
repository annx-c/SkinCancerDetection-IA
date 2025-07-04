from flask import Flask, render_template, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
from PIL import Image
import io

app = Flask(__name__)

# Cargar el modelo
model = load_model('modelo_cancer.h5')

def preprocess_image(image, target_size):
    if image.mode != "RGB":
        image = image.convert("RGB")
    image = image.resize(target_size)
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    return image / 255.0

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'})
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'})
        if file:
            image = Image.open(io.BytesIO(file.read()))
            processed_image = preprocess_image(image, target_size=(299, 299))  
            prediction = model.predict(processed_image)
            probability = float(prediction[0][0])
            class_name = "Benigno" if probability < 0.5 else "Maligno" 
            return jsonify({
                'class': class_name,
                'probability': probability
            })
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)