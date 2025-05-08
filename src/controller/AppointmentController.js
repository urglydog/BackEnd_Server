import { addAppointment, getAllAppointments } from "../services/AppointmentService"

const createAppointment = async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.appointmentDateTime) {
      return res.status(400).json({
        EM: "Thời gian hẹn là bắt buộc",
        EC: -1,
        DT: []
      });
    }

    if (req.body.customerType === 'guest' && (!req.body.guestName || !req.body.guestPhone)) {
      return res.status(400).json({
        EM: "Thông tin khách vãng lai (tên và số điện thoại) là bắt buộc",
        EC: -1,
        DT: []
      });
    }

    if (req.body.serviceLocation !== 'store' && !req.body.address) {
      return res.status(400).json({
        EM: "Địa chỉ là bắt buộc khi địa điểm dịch vụ không phải là cửa hàng",
        EC: -1,
        DT: []
      });
    }

    // Validate parts data if exists
    if (req.body.parts) {
      for (const part of req.body.parts) {
        if (!part.unitPrice) {
          return res.status(400).json({
            EM: "Đơn giá linh kiện là bắt buộc",
            EC: -1,
            DT: []
          });
        }
      }
    }

    const result = await addAppointment(req.body);
    
    if (result.EC === 1) {
      return res.status(201).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    console.error("Lỗi controller createAppointment:", error);
    return res.status(500).json({
      EM: "Lỗi server khi tạo lịch hẹn",
      EC: -1,
      DT: []
    });
  }
};

const getAppointments = async (req, res) => {
  try {
    const result = await getAllAppointments();
    
    if (result.EC === 1) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    console.error("Lỗi controller getAppointments:", error);
    return res.status(500).json({
      EM: "Lỗi server khi lấy danh sách lịch hẹn",
      EC: -1,
      DT: []
    });
  }
};

export { createAppointment, getAppointments };