const Stripe = require("stripe");
const OrderService = require("./OrderService");
const stripe = Stripe(
  "sk_test_51PvLvzRtEwaT3m8ofE4VrCx8cPjwfE6qHTPvlTBsXZL2Kyoq8hctxXtfGNqX7y69PD4rXfwDcHHwzivf9dnKmE6y00SfgDLqkL"
); // Stripe secret key from config

const createPaymentLinkService = async (orderId) => {
  try {
    const order = await OrderService.findOrderById(orderId);

    // Create a payment session using Stripe API
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr", // e.g., 'usd'
            product_data: {
              name: "UH Clothes", // e.g., 'Sample Product'
            },
            unit_amount: order.totalDiscountedPrice * 100, // Amount in the smallest currency unit (e.g., 500 = $5.00)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/payment/success?payment_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`, // Include payment_id and order_id in the success URL // Frontend success URL
      cancel_url: "http://localhost:3000/cancel", // Frontend cancel URL
    });

    // Send the payment link (session URL) as a response
    return { url: session.url, paymentId: session.id, order_id: orderId };

    // return {
    //   url: paymentLink.url, // Return the generated payment link URL
    //   paymentLinkId: paymentLink.id,
    // };
  } catch (error) {
    throw new Error("Error creating payment link: " + error.message);
  }
};

const updatePaymentInfoService = async (reqData) => {
  console.log("reqData in update info", reqData);
  const sessionId = reqData.payment_Id; // Stripe uses payment intent ID
  const orderId = reqData.order_Id;

  try {
    // Find the order by ID
    const order = await OrderService.findOrderById(orderId);
    // console.log('ORDER ', order )

    // Retrieve the session from Stripe using the session ID
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log("Session details: ", session);

    // Get the payment intent ID from the session
    const paymentIntentId = session.payment_intent;

    // Fetch the payment intent details from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    console.log("payment  intent in update info: ", paymentIntent);

    // console.log('paymentIntent is here: ', paymentIntent.status)

    // Check if payment was successful
    if (paymentIntent.status === "succeeded") {
      // Update order payment details
      order.paymentDetails.paymentId = paymentIntentId;
      order.paymentDetails.paymentStatus = "COMPLETED";
      order.orderStatus = "PLACED";

      // Save the updated order
      await order.save();
    }

    // Response if everything is successful
    const resData = {
      message: "Your order is placed",
      success: true,
      confirmedOrder: order,
    };

    return resData;
  } catch (error) {
    throw new Error("Error updating payment info: " + error.message);
  }
};

module.exports = { createPaymentLinkService, updatePaymentInfoService };
