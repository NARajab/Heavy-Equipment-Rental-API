const router = require("express").Router();
const AlatBerat = require("../controller/alatBeratController");
const Autentiaksi = require("../middleware/authenticate");

router.use(Autentiaksi);
router.post("/create", AlatBerat.cudAlatBerat);
router.get("/list", AlatBerat.getAlatBeratList);
router.get("/:id", AlatBerat.getAlatBeratById);
router.patch("/update/:id", AlatBerat.cudAlatBerat);
router.delete("/delete/:id", AlatBerat.cudAlatBerat);

module.exports = router;
