document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('builderForm');
    
    // --- MAP INPUTS TO PREVIEW ELEMENTS ---
    const mappings = {
        'name': [
            { id: 'preview-name-personal', type: 'text' },
            { id: 'preview-name-footer', type: 'strong' }
        ],
        'email': [
            { id: 'preview-email', type: 'text' },
            { id: 'preview-email-personal', type: 'text' }
        ],
        'phone': [
            { id: 'preview-phone', type: 'text' },
            { id: 'preview-phone-personal', type: 'text' }
        ],
        'address': { id: 'preview-address', type: 'text' },
        'district': { id: 'preview-district', type: 'text' },
        'objective': { id: 'preview-objective', type: 'text' },
        'dob': { id: 'preview-dob', type: 'text' },
        'gender': { id: 'preview-gender', type: 'text' },
        'marital_status': { id: 'preview-marital_status', type: 'text' },
        'caste': { id: 'preview-caste', type: 'text' },
        'nationality': { id: 'preview-nationality', type: 'text' },
        'hobbies': { id: 'preview-hobbies', type: 'text' },
        'languages': { id: 'preview-languages', type: 'text' },
        'place': { id: 'preview-place', type: 'text' },
        'date': { id: 'preview-date', type: 'text' }
    };

    // --- EVENT LISTENER FOR ALL TEXT/TEXTAREA INPUTS ---
    form.addEventListener('input', function(e) {
        const inputId = e.target.id;
        const inputValue = e.target.value;

        // Handle text inputs
        if (mappings[inputId]) {
            const targets = Array.isArray(mappings[inputId]) ? mappings[inputId] : [mappings[inputId]];
            targets.forEach(target => {
                const element = document.getElementById(target.id);
                if (element) {
                    if (target.type === 'strong') {
                        element.textContent = inputValue;
                    } else {
                        element.textContent = inputValue;
                    }
                }
            });
        }
        
        // Update the main name in the contact section (it has a <strong> tag)
        if (inputId === 'name') {
            document.querySelector('.contact-info p strong').textContent = inputValue;
        }

        // Handle photo input
        if (inputId === 'photo') {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    document.getElementById('preview-photo').src = event.target.result;
                }
                reader.readAsDataURL(file);
            }
        }
    });

    // --- DYNAMIC ACADEMIC QUALIFICATIONS ---
    const qualificationsContainer = document.getElementById('qualifications-container');
    const addQualificationBtn = document.getElementById('add-qualification-btn');
    let qualificationCount = 0;

    function addQualification() {
        qualificationCount++;
        const entry = document.createElement('div');
        entry.classList.add('qualification-entry');
        entry.innerHTML = `
            <h4>Qualification ${qualificationCount}</h4>
            <input type="text" class="q-exam" placeholder="Passed Exam (e.g., S.S.C.)">
            <input type="text" class="q-board" placeholder="Board/University">
            <input type="text" class="q-year" placeholder="Passing Year">
            <input type="text" class="q-percentage" placeholder="Percentage/CGPA">
            <button type="button" class="remove-q-btn">Remove</button>
        `;
        qualificationsContainer.appendChild(entry);
    }
    
    addQualificationBtn.addEventListener('click', addQualification);
    
    // Event listener to remove a qualification
    qualificationsContainer.addEventListener('click', function(e) {
        if(e.target.classList.contains('remove-q-btn')) {
            e.target.parentElement.remove();
            updateQualificationsTable();
        }
    });

    // Event listener to update table on input
    qualificationsContainer.addEventListener('input', updateQualificationsTable);

    function updateQualificationsTable() {
        const tableBody = document.querySelector('#preview-qualifications-table tbody');
        tableBody.innerHTML = ''; // Clear existing rows
        const entries = qualificationsContainer.querySelectorAll('.qualification-entry');
        
        entries.forEach((entry, index) => {
            const exam = entry.querySelector('.q-exam').value;
            const board = entry.querySelector('.q-board').value;
            const year = entry.querySelector('.q-year').value;
            const percentage = entry.querySelector('.q-percentage').value;

            const row = tableBody.insertRow();
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${exam}</td>
                <td>${board}</td>
                <td>${year}</td>
                <td>${percentage}</td>
            `;
        });
    }

    // --- PRINT BUTTON ---
    const printBtn = document.getElementById('print-btn');
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    // Add one qualification field by default
    addQualification();
});