const { Statuses, Codes } = require("../api/response_class")
const AdminModel = require("../model/admin_model")

//##### Admin Login #####//
exports.adminLogin = async (req, res) => {
    var adminData = await AdminModel.findOne({ email: req.body.email, password: req.body.password }).select("-password")
    try {
        if (adminData) {
            return res.status(Codes.SUCCESS).json({
                status: Statuses.SUCCESS,
                message: "Admin logged in successfully",
                data: adminData,
            })
        } else {
            return res.status(Codes.NOT_FOUND).json({
                status: Statuses.NOT_FOUND,
                message: "Not found",
                data: null,
            })
        }
    } catch (error) {
        res.status(Codes.SERVER_ERROR).json({
            status: Statuses.EXCEPTION,
            message: "error",
            result: error.message
        })
    }
}

//##### Add Admin #####//
exports.addAdmin = async (req, res) => {
    try {
        let isEmailPhoneExist = await AdminModel.findOne({
            $or: [{ email: req.body.email }, { phone: req.body.phone }],
        });
        if (isEmailPhoneExist) {
            return res.status(Codes.UN_AUTHORIZED).json({
                status: Statuses.UNAUTHORIZED,
                message: "Can't registered, User's email or phone number already exists",
            })
        }
        const { name, email, phone, password } = req.body;
        if (!name || !email || !phone || !password) {
            return res.status(Codes.VALIDATION).json({
                status: Statuses.VALIDATION,
                message: "Invalid data, please send the valid fields",
            })
        }
        req.body.created_at = new Date()
        const admin = await AdminModel.create(req.body);
        return res.status(Codes.SUCCESS).json({
            status: Statuses.SUCCESS,
            message: "Admin Add Success",
            data: admin,
        })
    } catch (error) {
        return res.status(Codes.SERVER_ERROR).json({
            status: Statuses.EXCEPTION,
            message: "error",
            result: error.message
        })
    }
}

//##### Get Admin #####//
exports.getAdmin = (req, res) => {
    try {
        AdminModel.find().then((result) => {
            return res.status(Codes.SUCCESS).json({
                status: Statuses.SUCCESS,
                message: "Admin get successfully",
                data: result,
            })
        })
    } catch {
        return res.status(Codes.SERVER_ERROR).json({
            status: Statuses.EXCEPTION,
            message: "error",
            result: error.message
        })
    }
}

//##### Update Admin #####//
exports.updateAdmin = async (req, res) => {
    try {
        const _id = req.params.id;
        const data = req.body;
        const admin = await AdminModel.findByIdAndUpdate(_id, data, { new: true, runValidators: true });
        if (admin) {
            return res.status(Codes.SUCCESS).json({
                status: Statuses.SUCCESS,
                message: "Admin updated successfully",
                data: admin,
            });
        } else {
            return res.status(Codes.NOT_FOUND).json({
                status: Statuses.NOT_FOUND,
                message: "Admin not found",
                data: null,
            });
        }
    } catch (error) {
        return res.status(Codes.SERVER_ERROR).json({
            status: Statuses.EXCEPTION,
            message: "Error updating admin",
            result: error.message
        });
    }
};

//##### Delete Admin #####//
exports.deleteAdmin = async (req, res) => {
    try {
        const _id = req.params.id;
        const admin = await AdminModel.findByIdAndDelete(_id, { new: true, runValidators: true });
        if (admin) {
            return res.status(Codes.SUCCESS).json({
                status: Statuses.SUCCESS,
                message: "Admin deleted successfully",
            });
        } else {
            return res.status(Codes.NOT_FOUND).json({
                status: Statuses.NOT_FOUND,
                message: "Admin not found",
                data: null,
            });
        }
    } catch (error) {
        return res.status(Codes.SERVER_ERROR).json({
            status: Statuses.EXCEPTION,
            message: "Error while removing admin",
            result: error.message
        });
    }
}