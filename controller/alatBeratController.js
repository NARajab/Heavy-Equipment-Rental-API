const AlatBerat = require("../models/alatberat");
const ApiError = require("../utils/apiError");

const cudAlatBerat = async (req, res, next) => {
  const { _operation, _nama_alat, _harga_sewa_perJam, _stock } = req.body;
  const _id = req.params.id;
  try {
    if (_operation === "INSERT") {
      const newAlatBerat = await AlatBerat.crudAlatBerat(
        null,
        _nama_alat,
        _harga_sewa_perJam,
        _stock,
        _operation
      );

      res.status(200).json({
        status: "Created successfully",
        data: newAlatBerat,
      });
    } else if (_operation === "UPDATE") {
      await AlatBerat.crudAlatBerat(
        null,
        _nama_alat,
        _harga_sewa_perJam,
        _stock,
        _operation
      );

      res.status(200).json({
        status: "Updatetd successfully",
      });
    } else {
      if (!_id) {
        return next(new ApiError("Id not found", 404));
      }
      await AlatBerat.crudAlatBerat(_id, null, null, null, "DELETE");
      res.status(200).json({
        status: "Success",
        message: "Deleted successfully",
      });
    }
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const getAlatBeratById = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const alatberat = await AlatBerat.getAlatBeratById(_id);
    if (alatberat) {
      res.json(alatberat);
    } else {
      next(new ApiError("Penyewa not found", 404));
    }
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const getAlatBeratList = async (req, res, next) => {
  try {
    const alatBeratList = await AlatBerat.getAlatBeratList(
      null,
      null,
      null,
      "SELECT"
    );
    res.status(200).json({
      status: "Success",
      data: alatBeratList,
    });
  } catch (error) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  cudAlatBerat,
  getAlatBeratById,
  getAlatBeratList,
};
