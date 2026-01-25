// api/generate-pdf.js
const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    try {
        const { html } = req.body;

        const browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
        });

        const page = await browser.newPage();
        
        // HTML सेट करणे
        await page.setContent(html, { waitUntil: 'networkidle0' });
        
        // PDF जनरेट करणे (A4 Size)
        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' }
        });

        await browser.close();

        // PDF रिस्पॉन्स म्हणून पाठवणे
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
        return res.send(pdf);

    } catch (error) {
        console.error(error);
        return res.status(500).send('Error generating PDF: ' + error.message);
    }
}