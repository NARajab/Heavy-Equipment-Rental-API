const router = require("express").Router();

const AlatBerat = require("../controller/alatBeratController");

router.post("/create", AlatBerat.cudAlatBerat);
router.get("/list", AlatBerat.getAlatBeratList);
router.get("/:id", AlatBerat.getAlatBeratById);
router.patch("/update/:id", AlatBerat.cudAlatBerat);
router.delete("/delete/:id", AlatBerat.cudAlatBerat);

module.exports = router;
