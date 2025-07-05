# 🧠 Detección de Cáncer de Piel con IA

Aplicación web local para la detección de cáncer de piel a partir de imágenes, basada en modelos de redes neuronales profundas entrenados con un conjunto de datos dermatológico.

Se entrenaron y compararon modelos como MobileNetV2, ResNet50 y una CNN personalizada, logrando un modelo final con 90 % de precisión, que se integra a la aplicación.

## 🚀 Tecnologías utilizadas

- Python  
- TensorFlow & Keras  
- OpenCV  
- Flask  
- HTML, CSS, JavaScript  

## 🖥️ Funcionalidades

- Clasificación de imágenes de lesiones cutáneas.  
- Carga de imágenes a través de la interfaz web.  
- Visualización del resultado en tiempo real.  

## ⚙️ Instalación y uso

1. Clonar este repositorio:
```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```
2. Crear un entorno virtual e instalar dependencias:
```bash
python -m venv env
source env/bin/activate  # Windows: env\Scripts\activate
pip install -r requirements.txt
```

3. Descargar el modelo entrenado:
El archivo modelo_final.h5 no está incluido en este repositorio debido a su tamaño.
4. Descargalo desde:
📥 [Link de descarga del modelo](https://drive.google.com/drive/folders/1J9B1MyZwlDJVNMFH45GgsUhOMu2meN_d?usp=sharing)
Colocar el archivo modelo_final.h5 en la raíz del proyecto, junto a app.py.

5. Actualizar el nombre del modelo en app.py:
Asegurarse de que la línea donde se carga el modelo tenga el nombre correcto, por ejemplo:
```bash
model = load_model('modelo_final.h5')
```
6. Ejecutar la aplicación:
```bash
   python app.py
```
7. Abrir en el navegador:
http://localhost:5000/

## 📂 Estructura del proyecto
```bash
├── app.py
├── modelo_final.h5  ← colocar aquí el modelo descargado
├── static/
│   ├── style.css
│   └── img/
├── templates/
│   └── index.html
├── requirements.txt
└── README.md
```

## 📌 Notas
Las versiones específicas de las librerías necesarias están indicadas en requirements.txt.

El modelo fue entrenado con un dataset dermatológico público.

Proyecto con fines educativos e investigativos.


