const router = require("express").Router();

const Auth = require("./authRouter");
const Penyewa = require("./penyewaRouter");
const AlatBerat = require("./alatBeratRouter");
const Service = require("./serviceRouter");
const AlatBeratService = require("./alatBeratServiceRouter");
const DetailRental = require("./detailRentalRouter");
const Resi = require("./resiPembayranRouter");

router.use("/api/auth", Auth);
router.use("/api/penyewa", Penyewa);
router.use("/api/alatberat", AlatBerat);
router.use("/api/service", Service);
router.use("/api/alatberatservice", AlatBeratService);
router.use("/api/detailrental", DetailRental);
router.use("/api/resi", Resi);

module.exports = router;
