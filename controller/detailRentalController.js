const DetailRental = require("../models/detailRental");
const ApiError = require("../utils/apiError");

const cudDetailRental = async (req, res, next) => {
  const {
    _operation,
    _id_penyewa,
    _id_alat_berat_service,
    _jumlah_unit,
    _tanggal_sewa,
    _tanggal_kembali,
  } = req.body;

  const _tanggal_pembayaran = new Date();
  const _id = req.params.id;
  try {
    if (_operation === "INSERT") {
      const newDetailRental = await DetailRental.crudDetailRental(
        null,
        _id_penyewa,
        _id_alat_berat_service,
        _jumlah_unit,
        _tanggal_sewa,
        _tanggal_kembali,
        null,
        _tanggal_pembayaran,
        _operation
      );

      res.status(200).json({
        status: "Created successfully",
        data: newDetailRental,
      });
    } else if (_operation === "UPDATE") {
      await DetailRental.crudDetailRental(
        null,
        _id_penyewa,
        _id_alat_berat_service,
        _jumlah_unit,
        _tanggal_sewa,
        _tanggal_kembali,
        null,
        _tanggal_pembayaran,
        _operation
      );

      res.status(200).json({
        status: "Updatetd successfully",
      });
    } else {
      if (!_id) {
        return next(new ApiError("Id not found", 404));
      }
      await DetailRental.crudDetailRental(
        _id,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        "DELETE"
      );
      res.status(200).json({
        status: "Success",
        message: "Deleted successfully",
      });
    }
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const getDetailRentalById = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const detailRental = await DetailRental.getDetailRentalById(_id);
    if (detailRental) {
      res.json(detailRental);
    } else {
      next(new ApiError("Penyewa not found", 404));
    }
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const getDetailRentalList = async (req, res, next) => {
  try {
    const detailRentalList = await DetailRental.getDetailRentalList();
    res.status(200).json({
      status: "Success",
      data: detailRentalList,
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

module.exports = {
  cudDetailRental,
  getDetailRentalById,
  getDetailRentalList,
};
