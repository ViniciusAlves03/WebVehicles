import multer from "multer";
import path from 'path';

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {

        let folder = ""

        if (req.baseUrl.includes("vehicle")) {
            folder = "vehicles"
        }

        if (req.baseUrl.includes("store")) {
            folder = "stores"
        }

        if (req.baseUrl.includes("client")) {
            folder = "clients"
        }

        cb(null, `public/images/${folder}`)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error("por favor, envie apenas jpg ou png!"))
        }
        cb(undefined, true)
    }
})

export default imageUpload;
