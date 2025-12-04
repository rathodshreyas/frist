document.addEventListener('DOMContentLoaded', () => {
    // Populate form with initial data
    document.getElementById('full-name').value = "Shreyas D.Rathod";
    document.getElementById('address').value = "At.Ambajogai, Post. Ambajogai Tah. - Ambajogai, Dist. Beed, Maharashtra.431517";
    document.getElementById('mobile').value = "94xxxxxxxx";
    document.getElementById('email').value = "xyz@gmail.com";
    document.getElementById('career-objective').value = "";
    document.getElementById('declaration').value = "I hereby declare that the above information is true and correct to the best of my knowledge and belief";
    document.getElementById('place').value = "Ambajogai";
    document.getElementById('date').value = new Date().toISOString().substring(0, 10); // Automatically set to today's date

    // Academic Qualification from PDF
    addQualificationRow({
        qualification: 'S.S.C.',
        university: 'Aurangabad',
        year: '2018',
        percentage: '69.80%'
    });
    addQualificationRow({
        qualification: 'HSC',
        university: 'Aurangabad',
        year: '2022',
        percentage: '60.00%'
    });

    // Personal Details
    addPersonalDetail("Father's Name", "Father Name");
    addPersonalDetail("Date of Birth", "01/01/2000");
    addPersonalDetail("Gender", "Male");
    addPersonalDetail("Nationality", "Indian");
    addPersonalDetail("Languages Known", "Marathi,Hindi,English");
    addPersonalDetail("Voter Id No.", "SOR0000000");
    addPersonalDetail("Aadhaar No.", "XXXX XXXX XXXX");
    
    // Event Listeners
    document.getElementById('resume-form').addEventListener('input', updatePreview);
    document.getElementById('profile-photo').addEventListener('change', updatePhoto);

    // --- Main Section Drag-and-Drop ---
    const formContainer = document.getElementById('form-container');
    let draggedSection = null;

    formContainer.addEventListener('dragstart', (e) => {
        const target = e.target.closest('.form-section');
        if (target) {
            draggedSection = target;
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', 'drag');
            target.classList.add('dragging');
        }
    });

    formContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
        const target = e.target.closest('.form-section');
        if (target && target !== draggedSection && formContainer.contains(target)) {
            const rect = target.getBoundingClientRect();
            const isAfter = e.clientY > rect.top + rect.height / 2;
            
            const sections = Array.from(formContainer.querySelectorAll('.form-section'));
            const currentIndex = sections.indexOf(draggedSection);
            const targetIndex = sections.indexOf(target);

            if (isAfter && targetIndex > currentIndex) {
                formContainer.insertBefore(draggedSection, target.nextSibling);
            } else if (!isAfter && targetIndex < currentIndex) {
                formContainer.insertBefore(draggedSection, target);
            }
        }
    });

    formContainer.addEventListener('dragend', () => {
        const sections = formContainer.querySelectorAll('.form-section');
        sections.forEach(section => section.classList.remove('dragging'));
        draggedSection = null;
        updatePreview();
    });

    // --- Personal Details Drag-and-Drop ---
    const personalDetailsContainer = document.querySelector('#personal-details-section .dynamic-inputs');
    let dragSrcEl = null;

    personalDetailsContainer.addEventListener('dragstart', (e) => {
        const target = e.target.closest('.draggable');
        if (target) {
            dragSrcEl = target;
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', target.innerHTML);
            target.classList.add('opacity-40');
        }
    });

    personalDetailsContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const target = e.target.closest('.draggable');
        if (target && target !== dragSrcEl && personalDetailsContainer.contains(target)) {
            target.classList.add('border-blue-500');
        }
    });

    personalDetailsContainer.addEventListener('dragleave', (e) => {
        const target = e.target.closest('.draggable');
        if (target) {
            target.classList.remove('border-blue-500');
        }
    });

    personalDetailsContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        const target = e.target.closest('.draggable');
        if (dragSrcEl && target && dragSrcEl !== target && personalDetailsContainer.contains(target)) {
            if (target.nextSibling === dragSrcEl) {
                personalDetailsContainer.insertBefore(dragSrcEl, target);
            } else {
                personalDetailsContainer.insertBefore(dragSrcEl, target.nextSibling);
            }
            target.classList.remove('border-blue-500');
        }
    });

    personalDetailsContainer.addEventListener('dragend', (e) => {
        const draggables = personalDetailsContainer.querySelectorAll('.draggable');
        draggables.forEach(item => item.classList.remove('opacity-40', 'border-blue-500'));
        updatePreview();
    });

    // Initial preview update
    updatePreview();
});

function updatePreview() {
    // Update Header
    document.getElementById('preview-name').innerText = document.getElementById('full-name').value || 'Your Name';
    document.getElementById('preview-address').innerText = document.getElementById('address').value || 'Your Address';
    document.getElementById('preview-mobile').innerText = document.getElementById('mobile').value || 'Your Mobile No.';
    document.getElementById('preview-email').innerText = document.getElementById('email').value || 'Your Email';
    document.getElementById('preview-signature').innerText = document.getElementById('full-name').value || 'Your Name';

    // Update Career Objective
    const careerObjective = document.getElementById('career-objective').value;
    const objectiveSection = document.getElementById('preview-career-objective-section');
    document.getElementById('preview-career-objective').innerText = careerObjective;
    objectiveSection.style.display = careerObjective.trim() ? 'block' : 'none';

    // Update other sections
    updateAcademicPreview();
    updateDynamicSectionPreview('other-qualification-section', 'preview-other-qualification-section');
    updateDynamicSectionPreview('experience-section', 'preview-experience-section');
    updateCustomSectionsPreview();
    updatePersonalDetailsPreview();
    
    // Update Declaration
    const declaration = document.getElementById('declaration').value;
    const declarationSection = document.getElementById('preview-declaration-section');
    document.getElementById('preview-declaration').innerText = declaration;
    declarationSection.style.display = declaration.trim() ? 'block' : 'none';

    document.getElementById('preview-place').innerText = document.getElementById('place').value;
    
    const dateValue = document.getElementById('date').value;
    if (dateValue) {
        const [year, month, day] = dateValue.split('-');
        document.getElementById('preview-date').innerText = `${day}/${month}/${year}`;
    }
}

// --- PHOTO UPLOAD FUNCTION ---
function updatePhoto() {
    const photoInput = document.getElementById('profile-photo');
    const photoPreview = document.getElementById('preview-photo');
    const headerRight = document.querySelector('.resume-header .header-right');
    const resumeHeader = document.querySelector('.resume-header');
    
    if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            photoPreview.src = e.target.result;
            headerRight.classList.remove('hidden');
            resumeHeader.classList.remove('photo-removed');
        };
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        photoPreview.src = "";
        headerRight.classList.add('hidden');
        resumeHeader.classList.add('photo-removed');
    }
}

// --- ACADEMIC QUALIFICATION FUNCTIONS ---
function addQualificationRow(data = {}) {
    const container = document.getElementById('academic-qualification-container');
    const newRow = document.createElement('div');
    newRow.className = 'flex flex-wrap items-center gap-2 mb-2 dynamic-item-wrapper';
    newRow.innerHTML = `
        <input type="text" class="w-1/4 p-2 border rounded" placeholder="Exam Passed (e.g., S.S.C.)" value="${data.qualification || ''}">
        <input type="text" class="w-1/4 p-2 border rounded" placeholder="Board/University" value="${data.university || ''}">
        <input type="text" class="w-1/6 p-2 border rounded" placeholder="Year" value="${data.year || ''}">
        <input type="text" class="w-1/6 p-2 border rounded" placeholder="Percentage/Grade" value="${data.percentage || ''}">
        <button type="button" class="p-2 text-white bg-red-600 rounded cursor-pointer remove-btn hover:bg-red-700" onclick="removeDynamicItem(this)">&times;</button>
    `;
    container.appendChild(newRow);
    updatePreview();
}

function updateAcademicPreview() {
    const tbody = document.getElementById('preview-academic-tbody');
    const formRows = document.querySelectorAll('#academic-qualification-container .dynamic-item-wrapper');
    let html = '';
    formRows.forEach((row, index) => {
        const inputs = row.querySelectorAll('input');
        const exam = inputs[0].value;
        const university = inputs[1].value;
        const year = inputs[2].value;
        const percentage = inputs[3].value;

        if (exam.trim() || university.trim() || year.trim() || percentage.trim()) {
            html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${exam}</td>
                    <td>${university}</td>
                    <td>${year}</td>
                    <td>${percentage}</td>
                </tr>
            `;
        }
    });
    tbody.innerHTML = html;
    document.getElementById('preview-academic-section').style.display = html.trim() ? 'block' : 'none';
}

// --- GENERIC DYNAMIC FIELD FUNCTIONS (Other Qual, Experience) ---
function addDynamicField(sectionId, initialValue = '') {
    const container = document.querySelector(`#${sectionId} .dynamic-inputs`);
    const newDiv = document.createElement('div');
    newDiv.className = 'dynamic-item-wrapper draggable flex items-center gap-2 mb-2';
    newDiv.draggable = true;
    newDiv.innerHTML = `
        <span class="drag-handle">&#x2195;</span>
        <input type="text" class="w-full p-2 border rounded" placeholder="Enter details..." value="${initialValue}">
        <button type="button" class="p-2 text-white bg-red-600 rounded cursor-pointer remove-btn hover:bg-red-700" onclick="removeDynamicItem(this)">&times;</button>
    `;
    container.appendChild(newDiv);
    updatePreview();
}

function updateDynamicSectionPreview(formSectionId, previewSectionId) {
    const previewList = document.querySelector(`#${previewSectionId} .preview-list`);
    const formInputs = document.querySelectorAll(`#${formSectionId} .dynamic-inputs input[type="text"]`);
    let html = '';
    formInputs.forEach(input => {
        if (input.value.trim()) {
            html += `<li>${input.value}</li>`;
        }
    });
    previewList.innerHTML = html;
    document.getElementById(previewSectionId).style.display = html.trim() ? 'block' : 'none';
}

// --- CUSTOM SECTION FUNCTIONS ---
function addCustomSection() {
    const container = document.getElementById('custom-section-container');
    const newSection = document.createElement('div');
    const sectionId = 'custom-section-' + Date.now();
    newSection.className = 'form-section dynamic-section mb-5';
    newSection.id = sectionId;
    newSection.setAttribute('draggable', 'true');
    newSection.innerHTML = `
        <span class="drag-handle">&#x2195;</span>
        <input type="text" class="w-full font-bold text-base mt-4 border-b pb-1 mb-2" placeholder="Section Title">
        <div class="dynamic-inputs"></div>
        <button type="button" class="w-full p-2 mt-2 rounded bg-green-600 text-white font-bold cursor-pointer hover:bg-green-700" onclick="addDynamicField('${sectionId}')">+ Add Item</button>
        <button type="button" class="w-full p-2 mt-2 rounded bg-red-600 text-white font-bold cursor-pointer hover:bg-red-700" onclick="removeDynamicSection(this)">Remove Section</button>
    `;
    container.appendChild(newSection);
}

function updateCustomSectionsPreview() {
    const previewContainer = document.getElementById('preview-custom-sections-container');
    previewContainer.innerHTML = '';
    const customSections = document.querySelectorAll('#custom-section-container .form-section');
    customSections.forEach(section => {
        const titleInput = section.querySelector('input[type="text"]');
        const listItems = section.querySelectorAll('.dynamic-inputs input');
        
        const sectionTitle = titleInput ? titleInput.value.trim() : '';
        
        if (sectionTitle) {
            let itemsHtml = '';
            listItems.forEach(item => {
                if (item.value.trim()) {
                    itemsHtml += `<li>${item.value}</li>`;
                }
            });
            if (itemsHtml) {
                const newPreview = document.createElement('div');
                newPreview.innerHTML = `<div class="resume-section-title">${sectionTitle.toUpperCase()}</div><ul class="bullet-list preview-list">${itemsHtml}</ul>`;
                previewContainer.appendChild(newPreview);
            }
        }
    });
}

function removeDynamicItem(button) {
    button.closest('.dynamic-item-wrapper').remove();
    updatePreview();
}

function removeDynamicSection(button) {
    button.closest('.form-section').remove();
    updatePreview();
}

function addPersonalDetail(key = '', value = '') {
    const container = document.querySelector('#personal-details-section .dynamic-inputs');
    const newDiv = document.createElement('div');
    newDiv.className = 'dynamic-item-wrapper draggable flex items-center gap-2 mb-2';
    newDiv.draggable = true;
    newDiv.innerHTML = `
        <span class="drag-handle">&#x2195;</span>
        <input type="text" class="w-2/5 p-2 border rounded detail-key" placeholder="Key (e.g., Father's Name)" value="${key}">
        <input type="text" class="flex-1 p-2 border rounded detail-value" placeholder="Value (e.g., Pandit Jijabhau)" value="${value}">
        <button type="button" class="p-2 text-white bg-red-600 rounded cursor-pointer remove-btn hover:bg-red-700" onclick="removeDynamicItem(this)">&times;</button>
    `;
    container.appendChild(newDiv);
    updatePreview();
}

function updatePersonalDetailsPreview() {
    const previewContainer = document.getElementById('preview-personal-details-grid');
    const formItems = document.querySelectorAll('#personal-details-section .dynamic-item-wrapper');
    let hasContent = false;
    let html = '';

    formItems.forEach(item => {
        const keyInput = item.querySelector('.detail-key');
        const valueInput = item.querySelector('.detail-value');
        const key = keyInput ? keyInput.value.trim() : '';
        const value = valueInput ? valueInput.value.trim() : '';

        if (key && value) {
            hasContent = true;
            // Changed the HTML generation to use grid layout
            html += `<b>${key}:</b><span> ${value}</span>`;
        }
    });

    previewContainer.innerHTML = html;
    document.getElementById('preview-personal-details-section').style.display = hasContent ? 'block' : 'none';
}
