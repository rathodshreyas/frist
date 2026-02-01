const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    const data = req.body;

    // Default CSS from the User's Template
    const css = `
        body { font-family: 'Times New Roman', serif; margin: 0; padding: 0; }
        .resume-container {
            width: 100%;
            margin: 0 auto;
            background: white;
            padding: 40px;
            box-sizing: border-box;
            line-height: 1.4;
            font-size: 11pt;
        }
        .resume-section-title {
            background-color: #e0e0e0;
            padding: 4px 8px;
            margin-top: 20px;
            margin-bottom: 15px;
            font-weight: bold;
            border-bottom: 1px solid #ccc;
            text-transform: uppercase;
        }
        .resume-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
            font-size: 11pt;
        }
        .resume-table th, .resume-table td {
            border: 1px solid #000;
            padding: 6px;
            text-align: left;
        }
        .resume-table th { background-color: #f0f0f0; font-weight: bold; text-align: center; }
        .bullet-list { list-style-type: disc; margin-left: 20px; padding-left: 5px; }
        .bullet-list li { margin-bottom: 4px; }
        .declaration { margin-top: 30px; font-style: italic; }
        .personal-details-grid {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 6px 15px;
            margin-bottom: 10px;
        }
        .footer-flex-container {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-top: 50px;
        }
        .resume-title {
            text-align: center;
            font-size: 20pt;
            font-weight: bold;
            margin-bottom: 25px;
            text-decoration: underline;
            text-underline-offset: 5px;
        }
        .resume-header {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 20px;
            align-items: flex-start;
            margin-bottom: 25px;
        }
        .resume-header.no-photo { grid-template-columns: 1fr; }
        .header-left h1 { margin: 0; font-size: 24pt; font-weight: bold; text-transform: uppercase; }
        .header-left h2 { margin: 5px 0 0 0; font-size: 12pt; font-weight: normal; color: #333; }
        .contact-details { margin-top: 10px; font-size: 11pt; }
        .contact-details div { margin-bottom: 3px; }
        .header-right { 
            width: 120px; height: 150px; border: 1px solid #ccc; 
            display: flex; align-items: center; justify-content: center; overflow: hidden;
        }
        .header-right img { width: 100%; height: 100%; object-fit: cover; }
    `;

    try {
        const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>${css}</style>
        </head>
        <body>
            <div class="resume-container">
                <div class="resume-title">RESUME</div>
                
                <div class="resume-header ${!data.photo ? 'no-photo' : ''}">
                    <div class="header-left">
                        <h1>${data.fullName || ''}</h1>
                        ${data.address ? `<div class="contact-details"><div><b>Address:</b> ${data.address}</div></div>` : ''}
                        <div class="contact-details">
                            ${data.mobile ? `<div><b>Mobile:</b> ${data.mobile}</div>` : ''}
                            ${data.email ? `<div><b>Email:</b> ${data.email}</div>` : ''}
                        </div>
                    </div>
                    ${data.photo ? `<div class="header-right"><img src="${data.photo}" /></div>` : ''}
                </div>

                ${data.objective ? `
                <div>
                    <div class="resume-section-title">CAREER OBJECTIVE</div>
                    <p style="text-align: justify;">${data.objective}</p>
                </div>` : ''}

                ${data.academics && data.academics.length > 0 ? `
                <div>
                    <div class="resume-section-title">ACADEMIC QUALIFICATION</div>
                    <table class="resume-table">
                        <thead>
                            <tr>
                                <th style="width: 50px;">Sr. No.</th>
                                <th>Qualification</th>
                                <th>University / Board</th>
                                <th style="width: 80px;">Year</th>
                                <th style="width: 80px;">Percent/CGPA</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.academics.map((row, i) => `
                            <tr>
                                <td style="text-align: center;">${i + 1}</td>
                                <td>${row.qualification}</td>
                                <td>${row.university}</td>
                                <td style="text-align: center;">${row.year}</td>
                                <td style="text-align: center;">${row.percentage}</td>
                            </tr>`).join('')}
                        </tbody>
                    </table>
                </div>` : ''}

                ${data.otherQualifications && data.otherQualifications.length > 0 ? `
                <div>
                    <div class="resume-section-title">OTHER QUALIFICATION</div>
                    <ul class="bullet-list">
                        ${data.otherQualifications.map(q => `<li>${q}</li>`).join('')}
                    </ul>
                </div>` : ''}

                ${data.experience && data.experience.length > 0 ? `
                <div>
                    <div class="resume-section-title">WORK EXPERIENCE</div>
                    <ul class="bullet-list">
                        ${data.experience.map(exp => `<li>${exp}</li>`).join('')}
                    </ul>
                </div>` : ''}

                
                ${data.personalDetails && data.personalDetails.length > 0 ? `
                <div>
                    <div class="resume-section-title">PERSONAL DETAILS</div>
                    <div class="personal-details-grid">
                        ${data.personalDetails.map(d => `
                            <div><b>${d.label}</b></div>
                            <div>${d.value || ''}</div>
                        `).join('')}
                    </div>
                </div>` : ''}

                <div class="resume-section-title">DECLARATION</div>
                <p class="declaration">${data.declaration || 'I hereby declare that the above information given by me is true to the best of my knowledge.'}</p>

                <div class="footer-flex-container">
                    <div>
                        <p><b>Date:</b> ${data.date || ''}</p>
                        <p><b>Place:</b> ${data.place || ''}</p>
                    </div>
                    <div style="text-align: center;">
                        <p><b>( ${data.fullName || ''} )</b></p>
                    </div>
                </div>
            </div>
        </body>
        </html>
        `;

        const browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath() || puppeteer.executablePath(),
            headless: chromium.headless,
        });

        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '30px', bottom: '30px' }
        });

        await browser.close();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
        res.send(pdfBuffer);

    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
};
