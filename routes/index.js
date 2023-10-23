const router = require("express").Router();

const Penyewa = require("./penyewaRouter");
const AlatBerat = require("./alatBeratRouter");
const Service = require("./serviceRouter");
const AlatBeratService = require("./alatBeratServiceRouter");
const DetailRental = require("./detailRentalRouter");

router.use("/api/penyewa", Penyewa);
router.use("/api/alatberat", AlatBerat);
router.use("/api/service", Service);
router.use("/api/alatberatservice", AlatBeratService);
router.use("/api/detailrental", DetailRental);

module.exports = router;
