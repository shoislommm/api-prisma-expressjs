import multer from "multer"

export default function multerFnc(destination) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination)
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString() + '-' + file.originalname)
    }

  })

  const types = ['image/png', "image/jpeg", 'image/jpg', "image/webp"]

  function fileFilter(req, file, cb) {

    if (types.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(null, false)
    }
  }

  const upload = multer({ storage, fileFilter })

  return upload
}