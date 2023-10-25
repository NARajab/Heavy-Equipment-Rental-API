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
  const { _nama_alat } = req.query;
  try {
    if (_nama_alat) {
      const alatBeratList = await AlatBerat.getAlatBeratList(_nama_alat);
      res.status(200).json({
        status: "Success",
        data: {
          alatBeratList,
        },
      });
    } else if (!_nama_alat) {
      const alatBeratList = await AlatBerat.getAlatBeratList();
      res.status(200).json({
        status: "Success",
        data: {
          alatBeratList,
        },
      });
    } else {
      next(new ApiError("Parameter yang diperlukan tidak ada", 400));
    }
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  cudAlatBerat,
  getAlatBeratById,
  getAlatBeratList,
};
