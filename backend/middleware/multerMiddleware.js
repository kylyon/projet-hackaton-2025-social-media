const multer = require('multer')
const path = require("path")
const fileURLToPath = require('url')

// Configuration du stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')) // dossier d’upload
  },
  filename: (req, file, cb) => {
    const splitedName = file.originalname.split(".")
    const uniqueName = Date.now() + '-' + req.body.username + "." + splitedName[splitedName.length - 1]
    cb(null, uniqueName)
  }
})

// Optionnel : filtrer les types de fichiers
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Seules les images sont autorisées !'), false)
  }
}

// Export du middleware multer configuré
const upload = multer({ storage, fileFilter })

module.exports = upload