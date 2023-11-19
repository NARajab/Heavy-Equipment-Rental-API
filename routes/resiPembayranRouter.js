const router = require("express").Router();
const Resi = require("../controller/resiPembayaranController");

router.get("/:id", Resi.getResiPembayaranById);

module.exports = router;
