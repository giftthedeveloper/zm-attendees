const imageInput = document.getElementById('imageInput');
const flyerImage = document.getElementById('flyerImage');
const uploadedImage = document.getElementById('uploadedImage');
const downloadButton = document.getElementById('downloadButton');

const blueRectTop = 21.5;
const blueRectLeft = 26.3;
const blueRectWidth = 47;
const blueRectHeight = 46;

const uploadedImageX = (blueRectLeft / 100) * flyerImage.width;
const uploadedImageY = (blueRectTop / 100) * flyerImage.height;


// image upload
imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const imageURL = URL.createObjectURL(file);
        
        uploadedImage.src = imageURL;

        const newWidth = blueRectWidth * 4.5; 
        const newHeight = blueRectHeight * 2.4;

        uploadedImage.style.width = newWidth + '%';
        uploadedImage.style.height = newHeight + '%';

        const newX = blueRectLeft - 26.7; 
        const newTop = blueRectTop -26;
        uploadedImage.style.left = newX + '%';
        uploadedImage.style.top = newTop + '%';
    }
});


downloadButton.addEventListener('click', async () => {
    const canvas = document.createElement('canvas');
    canvas.width = flyerImage.width;
    canvas.height = flyerImage.height;
    const context = canvas.getContext('2d');

    context.imageSmoothingEnabled = true;

    // Create an off-screen canvas for high-quality rendering
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = uploadedImage.width;
    offscreenCanvas.height = uploadedImage.height;
    const offscreenContext = offscreenCanvas.getContext('2d');

    offscreenContext.drawImage(uploadedImage, 0, 0, offscreenCanvas.width, offscreenCanvas.height);

    context.drawImage(flyerImage, 0, 0, canvas.width, canvas.height);

    // Calculate position and size of the uploaded image on the canvas
    const uploadedImageCanvasX = (blueRectLeft / 100) * canvas.width;
    const uploadedImageCanvasY = (blueRectTop / 100) * canvas.height;
    const uploadedImageCanvasWidth = (blueRectWidth / 100) * canvas.width;
    const uploadedImageCanvasHeight = (blueRectHeight / 100) * canvas.height;

    // Draw the uploaded image from the off-screen canvas to the main canvas
    context.drawImage(
        offscreenCanvas,
        0, 0, offscreenCanvas.width, offscreenCanvas.height,
        uploadedImageCanvasX, uploadedImageCanvasY, uploadedImageCanvasWidth, uploadedImageCanvasHeight
    );

    const editedImageURL = canvas.toDataURL('image/png', 1);

    // Create a download link
    const a = document.createElement('a');
    a.href = editedImageURL;
    a.download = 'me@zenithmoment.png';
    a.click();
});

