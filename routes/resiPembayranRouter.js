const router = require("express").Router();
const Resi = require("../controller/resiPembayaranController");
const Autentiaksi = require("../middleware/authenticate");

router.use(Autentiaksi);
router.get("/:id", Resi.getResiPembayaranById);

module.exports = router;
