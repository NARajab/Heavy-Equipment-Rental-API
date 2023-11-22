const router = require("express").Router();
const Penyewa = require("../controller/penyewaController");
const Autentiaksi = require("../middleware/authenticate");

router.use(Autentiaksi);
router.get("/list", Penyewa.getPenyewaList);
router.get("/list/:id", Penyewa.getPenyewaById);
router.post("/create", Penyewa.cudPenyewa);
router.patch("/update/:id", Penyewa.cudPenyewa);
router.delete("/delete/:id", Penyewa.cudPenyewa);

module.exports = router;
