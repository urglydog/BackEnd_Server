import express from "express";
import {
  handleGetAllProducts,
  handleGetAllProductsWithDetails,
  handleGetDetailProductById,
  handleGetProductByIdWithDetails,
} from "../controller/ProductController.js";
import {
  handleGetOrdersWithDetails,
  handleGetAllAppointments,
  handleGetAllOrders,
  handleAddOrder,
} from "../controller/OrderController.js";
import {
  handleUpdateCustomerInfo,
  handleGetCustomerById,
  handleLoginCustomer,
  getUserByIDAndPassword,
  handleChangePassword,
} from "../controller/CustomerController.js"; // Import các hàm controller của customer
import {
  handleGetAllVouchers,
  handleCheckVoucher,
} from "../controller/VoucherController.js";

import { createAppointment, getAppointments } from "../controller/AppointmentController.js"
const router = express.Router();

const initApiRoutes = (app) => {
  // apiController
  router.get("/", (req, res) => {
    res.send("API is working properly");
  });

  // productController
  router.get("/product/getAllProducts", handleGetAllProducts);
  router.get(
    "/product/getAllProductsWithDetails",
    handleGetAllProductsWithDetails
  );

  // Lấy sản phẩm theo ID
  router.get(
    "/product/getProductByIdWithDetails/:id",
    handleGetProductByIdWithDetails
  );
  // Lấy chi tiết sản phẩm theo ID
  router.get("/product/getProductDetailById/:id", handleGetDetailProductById);

  // orderController
  router.get("/order/getOrdersWithDetails", handleGetOrdersWithDetails);
  router.get("/order/getAllAppointments", handleGetAllAppointments);
  router.get("/order/getAllOrders", handleGetAllOrders); // Thêm route mới
  router.post("/order/add", handleAddOrder);
  // customerController
  router.put("/customer", handleUpdateCustomerInfo); // Route để cập nhật thông tin khách hàng (sử dụng PUT)
  router.get("/customer/:id", handleGetCustomerById); // Route để lấy thông tin khách hàng theo ID (sử dụng GET với tham số ID)
  router.post("/customer/login", handleLoginCustomer);
  router.get(
    "/customer/loginWithId/:customerID/:password",
    getUserByIDAndPassword
  );
  router.post("/customer/change-password", handleChangePassword);

  //voucherController
  router.get("/voucher/getAllVouchers", handleGetAllVouchers);
  router.post("/voucher/check", handleCheckVoucher);

    //apointmentController

  // POST /api/appointments - Create new appointment
  router.post("/appointments/create", createAppointment);

  // GET /api/appointments - Get all appointments
  router.get("/appointments/getAll", getAppointments);
  return app.use("/api/", router);


};

export default initApiRoutes;
