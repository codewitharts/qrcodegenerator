const qrInput = document.getElementById('qrInput');
const qrBtn = document.getElementById('qrBtn');
const qrImg = document.getElementById('qrImg');
const download = document.getElementById('download');
qrBtn.addEventListener('click', () => {
  const inputValue = qrInput.value;
  if (inputValue === '') {
    alert('Plase Enter Valid Text Or Eat 🍌');
    return;
  } else {
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${inputValue}`;
    qrImg.alt = `QR Code for ${inputValue}`;
    qrImg.style.backgroundColor = '#fff';
    qrImg.style.padding = '1rem';
    qrImg.style.boxShadow = '0 10px 20px #1b3c53';
    qrImg.style.borderRadius = '0.5rem';
    download.style.display = 'block';
  }
});
download.addEventListener('click', async () => {
  const imageUrl = qrImg.src;

  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = 'qr-code.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl); // মেমোরি ক্লিন
  } catch (error) {
    alert('Download failed. Please try again.');
    console.error('Error downloading QR code:', error);
  }
});
