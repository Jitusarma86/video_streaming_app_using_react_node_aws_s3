import multer from "multer"
import fs from "fs"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public")
    },
    filename: function (req, file, cb) {
        const fileName = `FILE-${Date.now().toString()}`
        cb(null, fileName);
    }
})

export const upload = multer(
    {
        storage: storage,
    }
)

