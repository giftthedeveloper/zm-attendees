// Get references to HTML elements
const imageInput = document.getElementById('imageInput');
const flyerImage = document.getElementById('flyerImage');
const uploadedImage = document.getElementById('uploadedImage');
const downloadButton = document.getElementById('downloadButton');

// Calculate the position of the blue rectangle in percentages
const blueRectTop = 21.5; // Top position in percentage
const blueRectLeft = 26.3; // Left position in percentage
const blueRectWidth = 47; // Width in percentage
const blueRectHeight = 46; // Height in percentage

// Calculate the position of the uploaded image based on the blue rectangle
const uploadedImageX = (blueRectLeft / 100) * flyerImage.width;
const uploadedImageY = (blueRectTop / 100) * flyerImage.height;
// Get references to HTML elements

// Handle image upload
// ...
// ...

// Handle image upload
imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const imageURL = URL.createObjectURL(file);
        
        // Set the src attribute of the uploadedImage element
        uploadedImage.src = imageURL;

        // Increase the size of the uploaded image while maintaining the position
        const newWidth = blueRectWidth * 4.5; 
        const newHeight = blueRectHeight * 2.4;

        uploadedImage.style.width = newWidth + '%';
        uploadedImage.style.height = newHeight + '%';

        // Calculate the new X position to move the image a bit to the right
        const newX = blueRectLeft - 26.7; 
        const newTop = blueRectTop -26;
        uploadedImage.style.left = newX + '%';
        uploadedImage.style.top = newTop + '%'; // Maintain the original top position
    }
});

// ...


// ...

// Handle image editing and download
// Handle image editing and download
// Handle image editing and download
// Handle image editing and download
downloadButton.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    canvas.width = flyerImage.width;
    canvas.height = flyerImage.height;
    const context = canvas.getContext('2d');

    // Draw the background flyer image
    context.drawImage(flyerImage, 0, 0, flyerImage.width, flyerImage.height);

    // Calculate the position and dimensions of the uploaded image on the canvas
    const uploadedImageCanvasX = (blueRectLeft / 100) * canvas.width;
    const uploadedImageCanvasY = (blueRectTop / 100) * canvas.height;
    const uploadedImageCanvasWidth = (blueRectWidth / 100) * canvas.width;
    const uploadedImageCanvasHeight = (blueRectHeight / 100) * canvas.height;

    // Draw the uploaded image on top of the background flyer image using the original size and position
    context.drawImage(uploadedImage, uploadedImageCanvasX, uploadedImageCanvasY, uploadedImageCanvasWidth, uploadedImageCanvasHeight);

    // Create a download link for the edited image
    const editedImageURL = canvas.toDataURL('image/jpeg');
    const a = document.createElement('a');
    a.href = editedImageURL;
    a.download = 'edited_flyer.jpg';
    a.click();
});

