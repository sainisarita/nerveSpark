const fs = require('fs');

// Upload a file
const uploadFile =(req, res, next)=> {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Handle the uploaded file
    // For example, move the file to a specific directory
    const destinationPath = `uploads/${file.filename}`;
    fs.renameSync(file.path, destinationPath);

    res.status(200).json({ message: 'File uploaded successfully' });
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Download a file
const downloadFile=(req, res, next)=> {
  try {
    const { fileName } = req.params;

    // Check if the file exists
    const filePath = `uploads/${fileName}`;
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Stream the file for download
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports ={downloadFile, uploadFile}