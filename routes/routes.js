const express = require('express')
const routes = express.Router()
const adminRoutes = require("./admin_routes")

routes.use("/admin", adminRoutes)


module.exports = routes