const imageInput = document.getElementById('imageInput');
const flyerImage = document.getElementById('flyerImage');
const uploadedImage = document.getElementById('uploadedImage');
const downloadButton = document.getElementById('downloadButton');

imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const imageURL = URL.createObjectURL(file);
        uploadedImage.src = imageURL;
    }
});

downloadButton.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    canvas.width = flyerImage.width;
    canvas.height = flyerImage.height;
    const context = canvas.getContext('2d');
    context.drawImage(flyerImage, 0, 0);
    
    // Adjust the position of the uploaded image here
    const uploadedImageX = 20; // X-coordinate
    const uploadedImageY = 20; // Y-coordinate
    context.drawImage(uploadedImage, uploadedImageX, uploadedImageY, uploadedImage.width, uploadedImage.height);
    
    const editedImageURL = canvas.toDataURL('image/jpeg');
    const a = document.createElement('a');
    a.href = editedImageURL;
    a.download = 'edited_flyer.jpg';
    a.click();
});

