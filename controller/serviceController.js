const Service = require("../models/service");
const ApiError = require("../utils/apiError");

const cudService = async (req, res, next) => {
  const { _operation, _kerusakan_alat, _biaya_service } = req.body;
  const _id = req.params.id;
  console.log(_id);
  try {
    if (_operation === "INSERT") {
      const newService = await Service.crudService(
        null,
        _kerusakan_alat,
        _biaya_service,
        _operation
      );

      res.status(200).json({
        status: "Created successfully",
        data: newService,
      });
    } else if (_operation === "UPDATE") {
      await Service.crudService(
        null,
        _kerusakan_alat,
        _biaya_service,
        _operation
      );

      res.status(200).json({
        status: "Updatetd successfully",
      });
    } else {
      if (!_id) {
        return next(new ApiError("Id not found", 404));
      }
      await Service.crudService(_id, null, null, "DELETE");
      res.status(200).json({
        status: "Success",
        message: "Deleted successfully",
      });
    }
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const getServiceById = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const service = await Service.getServiceById(_id);
    if (service) {
      res.json(service);
    } else {
      next(new ApiError("Penyewa not found", 404));
    }
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const getServiceList = async (req, res) => {
  try {
    const serviceList = await Service.getServiceList(
      null,
      null,
      null,
      "SELECT"
    );
    res.status(200).json({
      status: "Success",
      data: serviceList,
    });
  } catch (error) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  cudService,
  getServiceById,
  getServiceList,
};
