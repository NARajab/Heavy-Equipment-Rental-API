const router = require("express").Router();
const Service = require("../controller/serviceController");
const Autentiaksi = require("../middleware/authenticate");

router.use(Autentiaksi);
router.get("/list", Service.getServiceList);
router.get("/list/:id", Service.getServiceById);
router.post("/create", Service.cudService);
router.patch("/update/:id", Service.cudService);
router.delete("/delete/:id", Service.cudService);

module.exports = router;
