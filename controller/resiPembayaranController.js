const resiPembayaranModel = require("../models/resiPembayaran");
const ApiError = require("../utils/apiError");

const getResiPembayaranById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = await resiPembayaranModel.getResiPembayaranById(id);

    if (result.length > 0) {
      res.json(result);
    } else {
      res.status(404).json({ message: "Data resi pembayaran tidak ditemukan" });
    }
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  getResiPembayaranById,
};
