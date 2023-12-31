const router = require("express").Router();
const DetailRental = require("../controller/detailRentalController");
const Autentiaksi = require("../middleware/authenticate");

router.use(Autentiaksi);
router.post("/create", DetailRental.cudDetailRental);
router.patch("/update/:id", DetailRental.cudDetailRental);
router.delete("/delete/:id", DetailRental.cudDetailRental);
router.get("/list", DetailRental.getDetailRentalList);
router.get("/:id", DetailRental.getDetailRentalById);

module.exports = router;
