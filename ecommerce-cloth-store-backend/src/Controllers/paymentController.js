const {
  createPaymentLinkService,
  updatePaymentInfoService,
} = require("../Services/PaymentService");

const createPaymentLink = async (req, res) => {
  try {
    const paymentLink = await createPaymentLinkService(req.params.id);

    return res.status(200).json(paymentLink);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePaymentInfo = async (req, res) => {
  console.log("request body is: ",req.body)
  try {
    const updatedPaymentInfo = await updatePaymentInfoService(req.body);
// console.log('updatedPaymentInfo is here: ', updatedPaymentInfo )
    res
      .status(200)
      .json({
        updatedInfo: updatedPaymentInfo,
        message: "payment information updated",
        status: true,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPaymentLink, updatePaymentInfo };
