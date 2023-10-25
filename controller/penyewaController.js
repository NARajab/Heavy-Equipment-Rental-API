const Penyewa = require("../models/penyewa");
const ApiError = require("../utils/apiError");

const cudPenyewa = async (req, res, next) => {
  const { _operation, _nama_penyewa, _alamat_penyewa, _no_telphone } = req.body;
  const _id = req.params.id;
  try {
    if (_operation === "INSERT") {
      const newPenyewa = await Penyewa.crudPenyewa(
        null,
        _nama_penyewa,
        _alamat_penyewa,
        _no_telphone,
        _operation
      );

      res.status(200).json({
        status: "Created successfully",
        data: newPenyewa,
      });
    } else if (_operation === "UPDATE") {
      await Penyewa.crudPenyewa(
        null,
        _nama_penyewa,
        _alamat_penyewa,
        _no_telphone,
        _operation
      );

      res.status(200).json({
        status: "Updatetd successfully",
      });
    } else {
      if (!_id) {
        return next(new ApiError("Id not found", 404));
      }
      await Penyewa.crudPenyewa(_id, null, null, null, "DELETE");
      res.status(200).json({
        status: "Success",
        message: "Deleted successfully",
      });
    }
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const getPenyewaById = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const penyewa = await Penyewa.getPenyewaById(_id);
    if (penyewa) {
      res.json(penyewa);
    } else {
      next(new ApiError("Penyewa not found", 404));
    }
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const getPenyewaList = async (req, res, next) => {
  const { _nama_penyewa, _alamat_penyewa } = req.query;
  try {
    if (_nama_penyewa && _alamat_penyewa) {
      const penyewaList = await Penyewa.getPenyewaList(
        _nama_penyewa,
        _alamat_penyewa
      );
      res.status(200).json({
        status: "Success",
        data: {
          penyewaList,
        },
      });
    } else if (_nama_penyewa && _alamat_penyewa) {
      const penyewaList = await Penyewa.getPenyewaList(
        _nama_penyewa,
        _alamat_penyewa
      );
      res.status(200).json({
        status: "Success",
        data: {
          penyewaList,
        },
      });
    } else if (_nama_penyewa) {
      const penyewaList = await Penyewa.getPenyewaList(_nama_penyewa, null);
      res.status(200).json({
        status: "Success",
        data: {
          penyewaList,
        },
      });
    } else if (_alamat_penyewa) {
      const penyewaList = await Penyewa.getPenyewaList(null, _alamat_penyewa);
      res.status(200).json({
        status: "Success",
        data: {
          penyewaList,
        },
      });
    } else if (!_nama_penyewa && !_alamat_penyewa) {
      const penyewaList = await Penyewa.getPenyewaList();
      res.status(200).json({
        status: "Success",
        data: {
          penyewaList,
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
  cudPenyewa,
  getPenyewaById,
  getPenyewaList,
};
