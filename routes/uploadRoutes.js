const express = require('express');
const router = express.Router();
const upload = require('../config/upload');

router.post('/upload', upload.single('file'), (req, res) => {
  console.log("hii");
  try {
    res.status(200).json({
      message: 'File uploaded successfully',
      file: req.file,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
