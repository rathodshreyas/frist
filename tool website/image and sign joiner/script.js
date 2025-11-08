document.addEventListener('DOMContentLoaded', () => {
    // Input Elements
    const photoInput = document.getElementById('photoInput');
    const signInput = document.getElementById('signInput');
    
    // Preview Elements
    const photoPreview = document.getElementById('photoPreview');
    const signPreview = document.getElementById('signPreview');
    
    // Photo Control Elements
    const brightnessSlider = document.getElementById('brightness');
    const contrastSlider = document.getElementById('contrast');

    // Signature Control Elements
    const signBrightnessSlider = document.getElementById('signBrightness');
    const signContrastSlider = document.getElementById('signContrast');
    
    // Dimension Control Elements
    const outputWidthInput = document.getElementById('outputWidth');
    const outputHeightInput = document.getElementById('outputHeight');
    const outputSignHeightInput = document.getElementById('outputSignHeight');
    
    // Buttons
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    
    // Canvas
    const resultCanvas = document.getElementById('resultCanvas');
    const ctx = resultCanvas.getContext('2d');

    let photoFile, signFile;
    let photoCropper, signCropper;
    let isGenerated = false; 

    // Handle Photo Upload
    photoInput.addEventListener('change', (e) => {
        if (photoCropper) photoCropper.destroy();
        photoFile = e.target.files[0];
        if (!photoFile) return;
        isGenerated = false;
        const reader = new FileReader();
        reader.onload = (event) => {
            photoPreview.src = event.target.result;
            photoPreview.style.display = 'block';
            photoCropper = new Cropper(photoPreview, { viewMode: 1 });
        };
        reader.readAsDataURL(photoFile);
    });

    // Handle Signature Upload
    signInput.addEventListener('change', (e) => {
        if (signCropper) signCropper.destroy();
        signFile = e.target.files[0];
        if (!signFile) return;
        isGenerated = false;
        const reader = new FileReader();
        reader.onload = (event) => {
            signPreview.src = event.target.result;
            signPreview.style.display = 'block';
            signCropper = new Cropper(signPreview, { viewMode: 1 });
        };
        reader.readAsDataURL(signFile);
    });

    // Function to draw final image
    function drawFinalImage() {
        if (!photoCropper || !signCropper) {
            return false;
        }

        const finalWidth = parseInt(outputWidthInput.value) || 350;
        const finalPhotoHeight = parseInt(outputHeightInput.value) || 450;
        const finalSignHeight = parseInt(outputSignHeightInput.value) || 80;

        const croppedPhotoCanvas = photoCropper.getCroppedCanvas();
        const croppedSignCanvas = signCropper.getCroppedCanvas();

        if (!croppedPhotoCanvas || !croppedSignCanvas) return false;

        resultCanvas.width = finalWidth;
        resultCanvas.height = finalPhotoHeight + finalSignHeight;
        
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, resultCanvas.width, resultCanvas.height);

        const photoBrightness = brightnessSlider.value;
        const photoContrast = contrastSlider.value;
        ctx.filter = `brightness(${photoBrightness}%) contrast(${photoContrast}%)`;
        ctx.drawImage(croppedPhotoCanvas, 0, 0, finalWidth, finalPhotoHeight);

        const signBrightness = signBrightnessSlider.value;
        const signContrast = signContrastSlider.value;
        ctx.filter = `brightness(${signBrightness}%) contrast(${signContrast}%)`;
        ctx.drawImage(croppedSignCanvas, 0, finalPhotoHeight, finalWidth, finalSignHeight);

        ctx.filter = 'none';
        isGenerated = true;
        return true;
    }

    // Event listeners for all controls to redraw preview
    [brightnessSlider, contrastSlider, signBrightnessSlider, signContrastSlider, outputWidthInput, outputHeightInput, outputSignHeightInput].forEach(element => {
        if (element) { // Check if element exists before adding listener
            element.addEventListener('input', drawFinalImage);
        }
    });
    
    generateBtn.addEventListener('click', () => {
        if (!drawFinalImage()) {
            alert("कृपया पहले फोटो और सिग्नेचर दोनों अपलोड करें।");
        }
    });

    // Download functionality
    downloadBtn.addEventListener('click', () => {
        if (!photoCropper || !signCropper) {
            alert("डाउनलोड करने से पहले कृपया फोटो और सिग्नेचर दोनों अपलोड करें।");
            return;
        }

        drawFinalImage();

        if (!isGenerated) {
             alert("कुछ गड़बड़ हुई। कृपया 'Generate & Preview Image' बटन पर क्लिक करके फिर से प्रयास करें।");
             return;
        }
        
        const link = document.createElement('a');
        link.download = 'Photo-Sign-Joined.jpg';
        link.href = resultCanvas.toDataURL('image/jpeg', 0.95);
        link.click();
    });
});