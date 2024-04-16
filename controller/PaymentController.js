const Razorpay = require("razorpay")

const createOrder = async (req, res, next) => {

    try {

        const instance = new Razorpay({
            key_id: "rzp_test_DChEXvtnSs6iU7",
            key_secret: "wLND9RAn5A8Uap3KF79WGvpc"
        })

        const { order_id, amount, payment_capture, currency } = req.body

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: order_id,
            payment_capture: 1
        }

        const order = await instance.orders.create(options)

        if (!order) {
            res.status(500).send("Something Wrong")
        }

        res.status(200).json({ success: true, data: order })

    } catch (error) {
        console.log(error);
    }

}

const cardDetail = async (req, res, next) => {
    try {
        const instance = new Razorpay({
            key_id: "rzp_test_DChEXvtnSs6iU7",
            key_secret: "wLND9RAn5A8Uap3KF79WGvpc"
        })
        const { id } = req.body;
        const order = await instance.payments.fetch(id)
        if (!order) {
            res.status(500).send("Something went Wrong")
        }

        res.status(200).json({ success: true, data: order })

    } catch (error) {
        console.log(error);
    }
}


module.exports = { createOrder, cardDetail }