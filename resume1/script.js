// --- Image Handling ---
document.getElementById('inputPhoto').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const result = e.target.result;
            document.getElementById('base64Photo').value = result;

            // Show preview
            const preview = document.getElementById('photoPreview');
            preview.style.display = 'block';
            preview.querySelector('img').src = result;
        };
        reader.readAsDataURL(file);
    } else {
        document.getElementById('base64Photo').value = '';
        document.getElementById('photoPreview').style.display = 'none';
    }
});

// --- Dynamic Rows ---
function addAcademicRow(data = {}) {
    const template = document.getElementById('academicTemplate');
    const clone = template.content.cloneNode(true);
    if (data.qual) clone.querySelector('.acad-qual').value = data.qual;
    if (data.uni) clone.querySelector('.acad-uni').value = data.uni;
    if (data.year) clone.querySelector('.acad-year').value = data.year;
    if (data.perc) clone.querySelector('.acad-perc').value = data.perc;
    document.getElementById('academicList').appendChild(clone);
}

function addOtherRow(val = '') {
    const template = document.getElementById('simpleRowTemplate');
    const clone = template.content.cloneNode(true);
    clone.querySelector('.row-input').value = val;
    document.getElementById('otherList').appendChild(clone);
}

function addExperienceRow(val = '') {
    const template = document.getElementById('simpleRowTemplate');
    const clone = template.content.cloneNode(true);
    clone.querySelector('.row-input').value = val;
    document.getElementById('experienceList').appendChild(clone);
}

function addPersonalDetailRow(label = '', value = '') {
    const template = document.getElementById('personalDetailTemplate');
    const clone = template.content.cloneNode(true);
    clone.querySelector('.detail-label').value = label;
    clone.querySelector('.detail-value').value = value;
    document.getElementById('personalDetailsList').appendChild(clone);
}

function removeEntry(btn) {
    // Find the closest parent with class 'input-group' and remove it
    btn.closest('.input-group').remove();
}

// --- Main Generate Function ---
async function generateResume() {
    const btn = document.getElementById('downloadBtn');
    btn.classList.add('loading');
    btn.disabled = true;

    try {
        // Collect Data
        const data = {
            fullName: getValue('inputName'),
            address: getValue('inputAddress'),
            mobile: getValue('inputMobile'),
            email: getValue('inputEmail'),
            photo: document.getElementById('base64Photo').value, // Base64 string

            objective: getValue('inputObjective'),

            academics: [],
            otherQualifications: [],
            experience: [],
            personalDetails: [],

            declaration: getValue('inputDeclaration'),
            place: getValue('inputPlace'),
            date: getValue('inputDate')
        };

        // Academics
        document.querySelectorAll('.academic-entry').forEach(row => {
            data.academics.push({
                qualification: row.querySelector('.acad-qual').value,
                university: row.querySelector('.acad-uni').value,
                year: row.querySelector('.acad-year').value,
                percentage: row.querySelector('.acad-perc').value
            });
        });

        // Other Qualifications
        document.querySelectorAll('#otherList .row-input').forEach(input => {
            if (input.value.trim()) data.otherQualifications.push(input.value.trim());
        });

        // Experience
        document.querySelectorAll('#experienceList .row-input').forEach(input => {
            if (input.value.trim()) data.experience.push(input.value.trim());
        });

        // Personal Details
        document.querySelectorAll('.detail-row').forEach(row => {
            const label = row.querySelector('.detail-label').value.trim();
            const value = row.querySelector('.detail-value').value.trim();
            if (label && value) {
                data.personalDetails.push({ label, value });
            }
        });

        // Call API
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error('Generation failed');

        // Download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        const name = data.fullName.replace(/\s+/g, '_') || 'Resume';
        a.download = `${name}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);

    } catch (error) {
        console.error(error);
        alert('Error generating PDF. Please check console.');
    } finally {
        btn.classList.remove('loading');
        btn.disabled = false;
    }
}

function getValue(id) {
    return document.getElementById(id).value || '';
}

// --- Initialization ---
window.onload = function () {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('inputDate').value = today;

    // Add default rows as per example
    addAcademicRow({ qual: 'SSC', uni: 'Maharashtra State Board', year: '2017', perc: '85.00%' });
    addAcademicRow({ qual: 'HSC', uni: 'Maharashtra State Board', year: '2019', perc: '65.00%' });
    addAcademicRow({ qual: 'B.PHARMACY', uni: 'DBATU Lonere', year: '2023', perc: '8.16 CGPA' });

    addOtherRow('MS-CIT');
    addExperienceRow('6 Months experience at Gufic Life sciences pvt.ltd Navsari, Gujarat.');

    // Default Personal Details
    addPersonalDetailRow("Father's Name", "");
    addPersonalDetailRow("Date of Birth", "01-01-2001");
    addPersonalDetailRow("Gender", "Male");
    addPersonalDetailRow("Marital Status", "Unmarried");
    addPersonalDetailRow("Nationality", "Indian");
    addPersonalDetailRow("Languages Known", "Marathi, Hindi, English");
};
