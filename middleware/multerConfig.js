import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "./public/images/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.fieldname + "-" + file.originalname);
  },
});
const upload = multer({ storage });

export default upload;
