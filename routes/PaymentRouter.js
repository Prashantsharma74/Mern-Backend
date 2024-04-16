const express = require("express")
const { createOrder, cardDetail } = require("../controller/PaymentController")
const router = express.Router()

router.route("/create").post(createOrder)
router.route("/card-detail").post(cardDetail)

module.exports = router