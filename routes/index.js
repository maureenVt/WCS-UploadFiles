const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "tmp/" });
const fs = require("fs");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/monupload", upload.array("monfichier"), function(req, res, next) {
  fs.rename(
    req.files[0].path,
    "public/images/" + req.files[0].originalname,
    function(err) {
      if (err) {
        res.send("Problème durant le déplacement");
      } else if (
        req.files[0].mimetype === "image/png" &&
        req.files[0].size <= "3145728"
      ) {
        res.send("Fichier uploadé avec succès");
      } else {
        res.send(
          "Problème avec le type (que .png) ou le poids du fichier (<=3Mo)"
        );
      }
    }
  );
});

module.exports = router;
