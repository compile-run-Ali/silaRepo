import multer from 'multer';

// Set up multer, specify the destination and filename
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/product_images/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })
export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
    console.log("in upload_image")
    const uploadMiddleware = upload.single('image')
    uploadMiddleware(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      // You now have access to file info through req.file
      console.log("file: ", req.file)
  
      // Respond with success status
      res.status(200).json({ success: true })
    })
  }