import express from "express"
import multer from "multer"
import path from "path" // NodeJS module to interact with file paths 

const router = express.Router()

// Create our storage engine
const storage = multer.diskStorage({
    // Where are we gonna upload
    destination(req, file, cb) {
        cb(null, "uploads/")
    },
    // Name of the file in storage 
    // We use the date for incase we want to uplaod files with the same name
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

// Check specific file types
// We only want images to be uploaded
function checkFileType(file, cb) {
    // The file types we wang for our images 
    const filetypes = /jpg|jpeg|png|JPG/ 
    // Getting the extension from a file 
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    // Check the file mimetype 
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        return cb(null, true)
    }
    else {
        cb("Images only")
    }
}

// The middleware to our route
const upload = multer({
    storage, 
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
})

// We could multiple images
// But for now we will only upload one image

router.post("/", upload.single("image"), (req, res) => {
    res.send(`/${req.file.path}`) // Sending back the file path 
})
export default router