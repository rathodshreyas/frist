document.addEventListener('DOMContentLoaded', function() {
    const inputs = {
        nameMr: document.getElementById('nameMr'),
        nameEn: document.getElementById('nameEn'),
        dob: document.getElementById('dob'),
        gender: document.getElementById('gender'),
        mobile: document.getElementById('mobile'),
        farmerId: document.getElementById('farmerId'),
        addressMr: document.getElementById('addressMr'),
        addressEn: document.getElementById('addressEn'),
        photoUpload: document.getElementById('photoUpload')
    };

    const qrContainer = document.getElementById('qrcode-container');

    function generateAndUpdateQRCode() {
        if (typeof QRCode === 'undefined') {
            if(qrContainer) qrContainer.innerHTML = "QR Error";
            return;
        }
        try {
            if(qrContainer) qrContainer.innerHTML = "";
            const values = [
                inputs.nameEn.value,
                inputs.dob.value,
                inputs.gender.value,
                inputs.mobile.value,
                inputs.farmerId.value,
                inputs.addressEn.value
            ];
            const qrDataString = values.join('|');
            new QRCode(qrContainer, {
                text: qrDataString,
                colorDark: "#000000",
                colorLight: "#f0f9e9",
                correctLevel: QRCode.CorrectLevel.L
            });
        } catch (e) {
            console.error(e);
            if(qrContainer) qrContainer.innerHTML = "Data too long";
        }
    }

    function updatePreviewsAndQR() {
        document.getElementById('previewNameMr').textContent = inputs.nameMr.value;
        document.getElementById('previewNameEn').textContent = inputs.nameEn.value;
        document.getElementById('previewDob').textContent = inputs.dob.value;
        document.getElementById('previewGender').textContent = inputs.gender.value;
        document.getElementById('previewMobile').textContent = inputs.mobile.value;
        document.getElementById('previewFarmerId').textContent = inputs.farmerId.value;
        document.getElementById('previewAddressMr').textContent = inputs.addressMr.value;
        document.getElementById('previewAddressEn').textContent = inputs.addressEn.value;
        generateAndUpdateQRCode();
    }

    document.querySelectorAll('.form-container input, .form-container textarea').forEach(input => {
        if (input.type !== 'file') {
            input.addEventListener('input', updatePreviewsAndQR);
        }
    });

    inputs.photoUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => { document.getElementById('previewPhoto').src = e.target.result; };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById('downloadBtn').addEventListener('click', () => {
        html2canvas(document.getElementById('card-to-download'), { scale: 2, useCORS: true }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'agri-stack-card.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    });

    updatePreviewsAndQR();
});