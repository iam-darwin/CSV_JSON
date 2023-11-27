const express = require('express');
const csvtojson = require('csvtojson');
const multer = require('multer');

const app = express();
const port = 3000;

// Set up multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());

// Use multer middleware to handle file uploads
app.post('/csvtojson', upload.single('csvFile'), (req, res) => {
  // Access the uploaded file from req.file.buffer
  const csvData = req.file.buffer.toString();

  // Use csvtojson library to convert CSV to JSON
  csvtojson()
    .fromString(csvData)
    .then((jsonArrayObj) => {
      // Send the JSON response
      res.json(jsonArrayObj);
    })
    .catch((error) => {
      // Handle errors
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
