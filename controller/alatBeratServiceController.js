const AlatBeratService = require("../models/alatBeratService");
const ApiError = require("../utils/apiError");

const cudAlatBeratService = async (req, res, next) => {
  const { _operation, _id_alat_berat, _id_service } = req.body;
  const _id = req.params.id;
  console.log(_id);
  try {
    if (_operation === "INSERT") {
      const newAlatBeratService = await AlatBeratService.crudAlatBeratService(
        null,
        _id_alat_berat,
        _id_service,
        _operation
      );

      res.status(200).json({
        status: "Created successfully",
        data: newAlatBeratService,
      });
    } else if (_operation === "UPDATE") {
      await AlatBeratService.crudAlatBeratService(
        null,
        _id_alat_berat,
        _id_service,
        _operation
      );

      res.status(200).json({
        status: "Updatetd successfully",
      });
    } else {
      if (!_id) {
        return next(new ApiError("Id not found", 404));
      }
      await AlatBeratService.crudAlatBeratService(_id, null, null, "DELETE");
      res.status(200).json({
        status: "Success",
        message: "Deleted successfully",
      });
    }
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const getAlatBeratServiceById = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const alatberatservice = await AlatBeratService.getAlatBeratServiceById(
      _id
    );
    if (alatberatservice) {
      res.json(alatberatservice);
    } else {
      next(new ApiError("Penyewa not found", 404));
    }
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const getAlatBeratServiceList = async (req, res, next) => {
  try {
    const alatBeratServiceList = await AlatBeratService.getAlatBeratServiceList(
      null,
      null,
      null,
      "SELECT"
    );
    res.status(200).json({
      status: "Success",
      data: alatBeratServiceList,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  cudAlatBeratService,
  getAlatBeratServiceById,
  getAlatBeratServiceList,
};
