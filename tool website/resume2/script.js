document.addEventListener('DOMContentLoaded', function() {
    
    // --- MAPPING INPUTS TO PREVIEW ELEMENTS ---
    const mappings = {
        '#name': '#preview-name',
        '#address': '#preview-address',
        '#city': '#preview-city',
        '#email': '#preview-email',
        '#phone': '#preview-phone',
        '#sex': '#preview-sex',
        '#dob': '#preview-dob',
        '#maritalStatus': '#preview-maritalStatus',
        '#nationality': '#preview-nationality',
        '#languages': '#preview-languages',
        '#skills': '#preview-skills',
        '#place': '#preview-place',
        '#date': '#preview-date',
    };

    for (const inputId in mappings) {
        document.querySelector(inputId).addEventListener('input', function() {
            document.querySelector(mappings[inputId]).textContent = this.value;
            // Special case for the name in the footer
            if (inputId === '#name') {
                document.querySelector('#preview-footer-name').textContent = this.value;
            }
        });
    }

    // --- DYNAMIC EDUCATION SECTION ---
    const addEducationBtn = document.getElementById('add-education-btn');
    const educationList = document.getElementById('education-list');
    const previewEducationTable = document.querySelector('#preview-education-table tbody');
    let eduCount = 0;

    addEducationBtn.addEventListener('click', () => {
        eduCount++;
        const item = document.createElement('div');
        item.className = 'dynamic-item';
        item.innerHTML = `
            <h4>Education Entry #${eduCount}</h4>
            <input type="text" placeholder="Name of Exam" class="edu-exam">
            <input type="text" placeholder="Board" class="edu-board">
            <input type="text" placeholder="Percentage / Result" class="edu-percentage">
        `;
        educationList.appendChild(item);
    });

    function updateEducationPreview() {
        previewEducationTable.innerHTML = '';
        document.querySelectorAll('.dynamic-item .edu-exam').forEach((item, index) => {
            const exam = item.value;
            const board = document.querySelectorAll('.edu-board')[index].value;
            const percentage = document.querySelectorAll('.edu-percentage')[index].value;

            const row = previewEducationTable.insertRow();
            row.innerHTML = `
                <td>${exam}</td>
                <td>${board}</td>
                <td>${percentage}</td>
            `;
        });
    }
    educationList.addEventListener('input', updateEducationPreview);

    // --- DYNAMIC EXPERIENCE SECTION ---
    const addExperienceBtn = document.getElementById('add-experience-btn');
    const experienceList = document.getElementById('experience-list');
    const previewExperienceList = document.getElementById('preview-experience-list');
    let expCount = 0;

    addExperienceBtn.addEventListener('click', () => {
        expCount++;
        const item = document.createElement('div');
        item.className = 'dynamic-item';
        item.innerHTML = `
            <h4>Experience Entry #${expCount}</h4>
            <textarea placeholder="Describe the job role and responsibilities..."></textarea>
        `;
        experienceList.appendChild(item);
    });

    function updateExperiencePreview() {
        previewExperienceList.innerHTML = '';
        experienceList.querySelectorAll('textarea').forEach(textarea => {
            if (textarea.value.trim() !== '') {
                const li = document.createElement('li');
                li.textContent = textarea.value;
                previewExperienceList.appendChild(li);
            }
        });
    }
    experienceList.addEventListener('input', updateExperiencePreview);

    // --- PDF DOWNLOAD FUNCTIONALITY ---
    document.getElementById('download-pdf-btn').addEventListener('click', () => {
        const resumePreview = document.getElementById('resume-preview');
        const opt = {
            margin: 0.5,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 1.0 },
            html2canvas: { scale: 4, useCORS: true }, // Higher scale for better quality
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().from(resumePreview).set(opt).save();
    });
});