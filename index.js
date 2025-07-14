const QrImage = document.querySelector('#qr-img');
const mainContainer = document.querySelector('.main');
const cancelBtn = document.querySelector('#cancel-btn');
const downloadBtn = document.querySelector('#download-btn');
const inputData = document.querySelector('#data-input');
const generateBtn = document.querySelector('#generateQr');
const loader = document.querySelector('.loader');

// Generate QR code
generateBtn.addEventListener('click', () => {
  const data = inputData.value.trim();
  if (!data) {
    alert('Please enter some data to generate QR code');
    return;
  }

  QrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data)}`;
  QrImage.onload = () => {
    mainContainer.classList.remove('hidden');
    inputData.disabled = true;
    generateBtn.disabled = true;
  };
});

// Cancel generation
cancelBtn.addEventListener('click', () => {
    mainContainer.classList.add('hidden');
    inputData.disabled = false;
    generateBtn.disabled = false;
    inputData.value = '';
});


// Download QR
downloadBtn.addEventListener('click', () => {
  loader.classList.remove('hidden');
  fetch(QrImage.src)
    .then(res => res.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'qr-code.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    })
    .catch(() => alert('Failed to download QR code.'))
    .finally(() => {
      loader.classList.add('hidden');
    });
});
