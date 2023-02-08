const express = require("express");
const router = express.Router();
const authRouter = require("./auth.route");
const adminRouter = require("./admin.route");
const freelanceRouter = require("./freelance.route");
const companyRouter = require("./company.route");
const visitorRouter = require("./visitor.route");

router.use("/auth", authRouter);
router.use("/admin", adminRouter);
router.use("/freelance", freelanceRouter);
router.use("/company", companyRouter);
router.use("/visitor", visitorRouter);

module.exports = router;