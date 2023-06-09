const express = require('express');

const {schemas} = require("../../models/user");

const validateBody = require("../../middlewars/validateBody")

const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

module.exports = router;