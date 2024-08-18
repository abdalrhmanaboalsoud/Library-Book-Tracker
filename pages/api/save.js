// pages/api/save.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    // Define the path to your JSON file
    const filePath = path.join(process.cwd(), 'public', 'submittedBooks.json');

    // Read the existing data
    const existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Append new data
    existingData.push(data);

    // Write updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    res.status(200).json({ message: 'Data saved successfully!' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
