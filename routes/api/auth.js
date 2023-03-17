const express = require("express");
const router = express.Router();

router.post("/register",validation(registerJoiSchema),ctrlWrapper(ctrl.register));
router.post('/login',validation(loginJoiSchema),ctrlWrapper(ctrl.login))


module.exports = router;