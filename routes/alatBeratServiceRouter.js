const router = require("express").Router();

const AlatBeratService = require("../controller/alatBeratServiceController");

router.post("/create", AlatBeratService.cudAlatBeratService);
router.get("/list", AlatBeratService.getAlatBeratServiceList);
router.get("/:id", AlatBeratService.getAlatBeratServiceById);
router.patch("/update/:id", AlatBeratService.cudAlatBeratService);
router.delete("/delete/:id", AlatBeratService.cudAlatBeratService);

module.exports = router;
