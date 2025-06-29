const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = 3001;

// Enable CORS
app.use(cors());

// Create selectedimg directory if it doesn't exist
const selectedImgDir = path.join(__dirname, 'selectedimg');

async function ensureDirectoryExists() {
  try {
    await fs.access(selectedImgDir);
  } catch {
    await fs.mkdir(selectedImgDir, { recursive: true });
  }
}

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, selectedImgDir);
  },
  filename: function (req, file, cb) {
    // Always use the same filename to replace previous image
    const ext = path.extname(file.originalname);
    cb(null, `selected_image${ext}`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: function (req, file, cb) {
    // Check if file is an image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Image service is running' });
});

// Upload image endpoint
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        error: 'No image file provided' 
      });
    }

    console.log('Image saved:', req.file.filename);
    res.json({
      success: true,
      message: 'Image uploaded successfully',
      filename: req.file.filename,
      path: req.file.path
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to upload image'
    });
  }
});

// Cleanup endpoint
app.post('/api/cleanup', async (req, res) => {
  try {
    // Read directory and delete all files
    const files = await fs.readdir(selectedImgDir);
    
    for (const file of files) {
      const filePath = path.join(selectedImgDir, file);
      await fs.unlink(filePath);
      console.log('Deleted:', file);
    }

    res.json({
      success: true,
      message: `Cleaned up ${files.length} files`,
      deletedCount: files.length
    });
  } catch (error) {
    console.error('Cleanup error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to cleanup files'
    });
  }
});

// Start server
app.listen(PORT, async () => {
  await ensureDirectoryExists();
  console.log(`Image service running on http://localhost:${PORT}`);
  console.log(`Selected images will be saved to: ${selectedImgDir}`);
});
