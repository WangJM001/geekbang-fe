function loadImage(event) {
  const file = event.target.files[0];

  const reader = new FileReader();
  reader.onload = convertToGray;
  reader.readAsDataURL(file);
}

function convertToGray(event) {
  const canvas = document.getElementById("img-canvas");
  var img = new Image();
  img.src = event.target.result;
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    const context = canvas.getContext("2d");
    context.drawImage(img, 0, 0);
    const imgData = context.getImageData(0, 0, img.width, img.height);
    for (let i = 0; i < imgData.data.length; i += 4) {
      const r = imgData.data[i];
      const g = imgData.data[i + 1];
      const b = imgData.data[i + 2];
      const gray = (r + g + b) / 3;
      imgData.data[i] = gray;
      imgData.data[i + 1] = gray;
      imgData.data[i + 2] = gray;
    }
    context.putImageData(imgData, 0, 0);
  };
}
