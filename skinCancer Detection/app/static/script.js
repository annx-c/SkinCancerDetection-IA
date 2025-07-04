document.addEventListener('DOMContentLoaded', function() {
    const dropArea = document.getElementById('drop-area');
    const imageUpload = document.getElementById('imageUpload');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const predictionResult = document.getElementById('predictionResult');
    const refreshBtn = document.getElementById('refreshBtn');

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        dropArea.classList.add('highlight');
    }

    function unhighlight(e) {
        dropArea.classList.remove('highlight');
    }

    dropArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    function handleFiles(files) {
        if (files.length > 0) {
            imageUpload.files = files;
            dropArea.textContent = files[0].name;
        }
    }

    dropArea.addEventListener('click', () => imageUpload.click());

    imageUpload.addEventListener('change', () => {
        if (imageUpload.files.length > 0) {
            dropArea.textContent = imageUpload.files[0].name;
        }
    });

    analyzeBtn.addEventListener('click', analyzeImage);
    function analyzeImage() {
        const file = imageUpload.files[0];
        if (!file) {
            alert('Por favor, selecciona o arrastra una imagen primero.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        fetch('/', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            const probabilityMaligno = data.class === 'Maligno' ? data.probability : 1 - data.probability;
            const interpretacion = interpretarResultado(data.class, probabilityMaligno);
            
            predictionResult.innerHTML = `
                <p>Resultado: ${data.class}</p>
                <p>Interpretación: ${interpretacion}</p>
            `;
            predictionResult.style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al procesar la imagen. Por favor, intenta de nuevo.');
        });
    }

    function interpretarResultado(clase, probabilidadMaligno) {
        if (clase === 'Maligno') {
            if (probabilidadMaligno > 0.9) {
                return "El análisis indica una muy alta probabilidad de malignidad. Se recomienda consultar a un especialista inmediatamente.";
            } else if (probabilidadMaligno > 0.7) {
                return "El análisis sugiere una alta probabilidad de malignidad. Se recomienda una evaluación médica pronta.";
            } else if (probabilidadMaligno > 0.5) {
                return "El análisis indica una probabilidad moderada de malignidad. Se sugiere una revisión médica para mayor seguridad.";
            } else {
                return "Aunque clasificado como maligno, la probabilidad es baja. Se recomienda una revisión médica para descartar dudas.";
            }
        } else { // Benigno
            if (probabilidadMaligno < 0.1) {
                return "El análisis indica una muy alta probabilidad de benignidad. Se recomienda seguimiento rutinario.";
            } else if (probabilidadMaligno < 0.3) {
                return "El análisis sugiere una alta probabilidad de benignidad. Se recomienda seguimiento normal.";
            } else if (probabilidadMaligno < 0.5) {
                return "El análisis indica una probabilidad moderada de benignidad. Se sugiere un seguimiento más frecuente.";
            } else {
                return "Aunque clasificado como benigno, la probabilidad de malignidad no es despreciable. Se recomienda una evaluación más detallada.";
            }
        }
    }

    refreshBtn.addEventListener('click', function() {
        location.reload();
    });
});