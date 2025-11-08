document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const allInputs = document.querySelectorAll('#settings-form input, #settings-form select');
    const uploadBox = document.getElementById('upload-box');
    const selectImageBtn = document.getElementById('select-image-btn');
    const fileInput = document.getElementById('file-input');
    const imagePreviewContainer = document.getElementById('image-preview-container');
    const settingsForm = document.getElementById('settings-form');
    const downloadBtn = document.getElementById('download-btn');
    const loader = document.getElementById('loader-container');
    const uploadPrompt = document.getElementById('upload-prompt');
    const imageInfo = document.getElementById('image-info');
    
    // Input fields for easy access
    const widthInput = document.getElementById('width');
    const heightInput = document.getElementById('height');
    const qualityValue = document.getElementById('quality-value');
    const sharpenValue = document.getElementById('sharpen-value');
    const qualitySlider = document.getElementById('quality');
    const sharpenSlider = document.getElementById('sharpen');

    let originalImage = null;
    let originalFileName = 'image';
    let isProcessing = false;
    let debounceTimer;

    // --- Debounce Function for Performance ---
    const debounce = (func, delay) => {
        return (...args) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

    // --- Main Update Function for Live Preview ---
    const updatePreview = async () => {
        if (!originalImage || isProcessing) return;
        isProcessing = true;
        loader.classList.remove('hidden');
        requestAnimationFrame(async () => {
            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d', { willReadFrequently: true });
                const settings = getSettings();
                canvas.width = settings.targetWidth;
                canvas.height = settings.targetHeight;
                if (settings.filters) ctx.filter = settings.filters;
                ctx.drawImage(originalImage, 0, 0, settings.targetWidth, settings.targetHeight);
                ctx.filter = 'none';
                if (settings.sharpenAmount > 0) applySharpen(ctx, canvas, settings.sharpenAmount);
                const previewImage = document.getElementById('preview-image');
                if (previewImage) previewImage.src = canvas.toDataURL('image/jpeg', 0.85);
            } catch(e) { console.error("Error updating preview:", e); } 
            finally { isProcessing = false; loader.classList.add('hidden'); }
        });
    };
    
    const debouncedUpdate = debounce(updatePreview, 300);

    // --- Event Listeners ---
    allInputs.forEach(input => {
        const eventType = (input.type === 'range' || input.type === 'number') ? 'input' : 'change';
        input.addEventListener(eventType, () => {
            if (input.id === 'quality') qualityValue.textContent = input.value;
            if (input.id === 'sharpen') sharpenValue.textContent = input.value;
            debouncedUpdate();
        });
    });

    selectImageBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', e => handleFile(e.target.files[0]));
    uploadBox.addEventListener('dragover', e => { e.preventDefault(); uploadBox.classList.add('dragover'); });
    uploadBox.addEventListener('dragleave', () => uploadBox.classList.remove('dragover'));
    uploadBox.addEventListener('drop', e => { e.preventDefault(); uploadBox.classList.remove('dragover'); handleFile(e.dataTransfer.files[0]); });

    // --- File Handling ---
    function handleFile(file) {
        if (!file || !file.type.startsWith('image/')) return;
        originalFileName = file.name.split('.').slice(0, -1).join('.') || 'image';
        const reader = new FileReader();
        reader.onload = e => {
            originalImage = new Image();
            originalImage.onload = () => {
                imagePreviewContainer.innerHTML = `<img id="preview-image" src="${e.target.result}" alt="Preview">`;
                uploadPrompt.classList.add('hidden');
                downloadBtn.disabled = false;
                widthInput.value = originalImage.width;
                heightInput.value = originalImage.height;
                imageInfo.textContent = `${originalImage.width} x ${originalImage.height}  •  ${formatBytes(file.size)}`;
                updatePreview(); 
            };
            originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    
    // --- Download Logic ---
    settingsForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!originalImage) return;

        downloadBtn.disabled = true;
        downloadBtn.textContent = "Generating...";
        loader.classList.remove('hidden');

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        const settings = getSettings();
        const format = document.getElementById('format').value.toLowerCase();
        const mimeType = `image/${format === 'jpg' ? 'jpeg' : format}`;
        const quality = parseInt(qualitySlider.value, 10) / 100;
        
        canvas.width = settings.targetWidth;
        canvas.height = settings.targetHeight;
        if (settings.filters) ctx.filter = settings.filters;
        ctx.drawImage(originalImage, 0, 0, settings.targetWidth, settings.targetHeight);
        ctx.filter = 'none';
        if (settings.sharpenAmount > 0) applySharpen(ctx, canvas, settings.sharpenAmount);

        canvas.toBlob((blob) => {
            // This function call was failing because the function was missing
            downloadBlob(blob, `${originalFileName}-processed.${format}`);
            
            downloadBtn.disabled = false;
            downloadBtn.textContent = "Download Image";
            loader.classList.add('hidden');
        }, mimeType, quality);
    });

    // --- HELPER FUNCTIONS (NOW COMPLETE) ---

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    function getSettings() {
        let targetWidth = parseInt(widthInput.value, 10);
        let targetHeight = parseInt(heightInput.value, 10);
        
        // If no image is loaded, do nothing
        if (!originalImage) return {};

        const aspectRatio = originalImage.width / originalImage.height;

        // If both are empty, use original dimensions
        if (!targetWidth && !targetHeight) {
            targetWidth = originalImage.width;
            targetHeight = originalImage.height;
        } 
        // If only width is provided, calculate height
        else if (targetWidth && !targetHeight) {
            targetHeight = targetWidth / aspectRatio;
        } 
        // If only height is provided, calculate width
        else if (!targetWidth && targetHeight) {
            targetWidth = targetHeight * aspectRatio;
        }

        let filters = [];
        if (document.getElementById('auto-enhance').checked) {
            filters.push('brightness(1.1) contrast(1.1) saturate(1.2)');
        }
        const sharpenAmount = parseInt(sharpenSlider.value, 10) / 100;

        return {
            targetWidth: Math.round(targetWidth),
            targetHeight: Math.round(targetHeight),
            filters: filters.join(' '),
            sharpenAmount: sharpenAmount
        };
    }

    // THIS FUNCTION WAS MISSING
    function downloadBlob(blob, fileName) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href); // Free up memory
    }

    // THIS FUNCTION WAS MISSING
    function applySharpen(ctx, canvas, amount) {
        const { width, height } = canvas;
        const originalData = ctx.getImageData(0, 0, width, height);
        const blurredData = ctx.getImageData(0, 0, width, height);
        boxBlur(blurredData.data, width, height, 1);
        const sharpenedData = ctx.createImageData(width, height);
        for (let i = 0; i < originalData.data.length; i += 4) {
            sharpenedData.data[i] = originalData.data[i] + (originalData.data[i] - blurredData.data[i]) * amount;
            sharpenedData.data[i + 1] = originalData.data[i + 1] + (originalData.data[i + 1] - blurredData.data[i + 1]) * amount;
            sharpenedData.data[i + 2] = originalData.data[i + 2] + (originalData.data[i + 2] - blurredData.data[i + 2]) * amount;
            sharpenedData.data[i + 3] = originalData.data[i + 3];
        }
        ctx.putImageData(sharpenedData, 0, 0);
    }
    
    // THIS FUNCTION WAS MISSING
    function boxBlur(data, width, height, radius) {
        const temp = new Uint8ClampedArray(data.length);
        temp.set(data);
        for(let y = 0; y < height; y++) {
            for(let x = 0; x < width; x++) {
                let r = 0, g = 0, b = 0, count = 0;
                for(let dy = -radius; dy <= radius; dy++) {
                    for(let dx = -radius; dx <= radius; dx++) {
                        const nx = Math.min(width - 1, Math.max(0, x + dx));
                        const ny = Math.min(height - 1, Math.max(0, y + dy));
                        const i = (ny * width + nx) * 4;
                        r += temp[i]; g += temp[i+1]; b += temp[i+2];
                        count++;
                    }
                }
                const i = (y * width + x) * 4;
                data[i] = r / count; data[i+1] = g / count; data[i+2] = b / count;
            }
        }
    }
});