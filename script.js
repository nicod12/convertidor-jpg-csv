document.getElementById('convertButton').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
        alert('Por favor, selecciona una imagen JPG.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function() {
        Tesseract.recognize(
            reader.result,
            'eng', // Puedes cambiar el idioma según tus necesidades
            {
                logger: m => console.log(m),
            }
        ).then(({ data: { text } }) => {
            const lines = text.split('\n');
            const csvContent = lines.map(line => `"${line}"`).join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const downloadLink = document.getElementById('downloadLink');

            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = 'output.csv';
            downloadLink.style.display = 'block';
            downloadLink.textContent = 'Descargar CSV';
        });
    };
    reader.readAsDataURL(file);
});
