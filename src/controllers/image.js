const fs = require("fs");
const path = require("path");

exports.load = (req, res) => {
  console.log(req.params.name);
  const image = findImageInDirectory(req.params.name, "./images/");
  if (image) {
    const imagePath = path.join(__dirname, "../../", "images", req.params.name);

    res.status(201).sendFile(imagePath);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

function findImageInDirectory(filename, directoryPath) {
  const files = fs.readdirSync(directoryPath);

  const matchingFile = files.find((file) => file === filename);

  if (matchingFile) {
    const filePath = path.join(directoryPath, matchingFile);
    return filePath;
  } else {
    return null;
  }
}
