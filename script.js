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
    
    // Draw the flyer image first
    context.drawImage(flyerImage, 0, 0, flyerImage.width, flyerImage.height);
    
    // Calculate the position to center the uploaded image
    const uploadedImageX = (flyerImage.width - uploadedImage.width) / 2;
    const uploadedImageY = (flyerImage.height - uploadedImage.height) / 2;
    
    // Save the current context state
    context.save();
    
    // Create a circular clipping path
    context.beginPath();
    context.arc(
        uploadedImageX + uploadedImage.width / 2,
        uploadedImageY + uploadedImage.height / 2,
        uploadedImage.width / 2,
        0,
        Math.PI * 2
    );
    context.closePath();
    context.clip();
    
    // Draw the uploaded image (inside the circular clipping path)
    context.drawImage(uploadedImage, uploadedImageX, uploadedImageY, uploadedImage.width, uploadedImage.height);
    
    // Restore the context state to remove the clipping path
    context.restore();
    
    const editedImageURL = canvas.toDataURL('image/jpeg');
    const a = document.createElement('a');
    a.href = editedImageURL;
    a.download = 'edited_flyer.jpg';
    a.click();
});
