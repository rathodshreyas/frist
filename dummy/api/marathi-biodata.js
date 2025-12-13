export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { name, age, education, occupation, address } = req.body;

  const biodata = `
नाव: ${name}
वय: ${age}
शिक्षण: ${education}
व्यवसाय: ${occupation}
पत्ता: ${address}

(ही माहिती लग्नासाठी योग्य आहे.)
  `;

  res.status(200).json({
    success: true,
    biodata
  });
}
