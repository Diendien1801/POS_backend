const crypto = require("crypto");
const axios = require("axios");
const accessKey = "F8BBA842ECF85";
const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
const partnerCode = "MOMO";
const redirectUrl = "https://webhook.site/your-url"; // hoặc URL frontend
const ipnUrl = "https://webhook.site/your-url";
exports.createMoMoPayment = async (req, res) => {

  const amount = req.body.amount || 50000;
  const orderId = partnerCode + new Date().getTime();
  const requestId = orderId;
  const orderInfo = "Thanh toán đơn hàng";
  const requestType = "captureWallet";
  const extraData = "";

  const rawSignature =
    `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}` +
    `&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}` +
    `&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = {
    partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId,
    amount,
    orderId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    lang: "vi",
    requestType,
    autoCapture: true,
    extraData,
    signature,
  };

  try {
    const response = await axios.post(
      "https://test-payment.momo.vn/v2/gateway/api/create",
      requestBody,
      { headers: { "Content-Type": "application/json" } }
    );

    const data = response.data;

    return res.json({
      resultCode: data.resultCode,
      status: data.resultCode === 0 ? "pending" : "failed",
      message: data.message,
      payUrl: data.payUrl,
      qrCodeUrl: data.qrCodeUrl,
      orderId: orderId,
    });
  } catch (error) {
    console.error("MoMo Payment Error:", error.message);
    if (error.response) console.error(error.response.data);
    return res.status(500).json({
      resultCode: -1,
      status: "failed",
      message: "Không thể tạo thanh toán MoMo",
    });
  }
};


// Kiểm tra trạng thái thanh toán MoMo
exports.checkMoMoPaymentStatus = async (req, res) => {
  const transactionId = req.params.transactionId;
  const requestId = transactionId;
  const orderId = transactionId;

  const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=${partnerCode}&requestId=${requestId}`;
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = {
    partnerCode,
    requestId,
    orderId,
    lang: "vi",
    signature,
  };

  try {
    const momoResponse = await axios.post(
      "https://test-payment.momo.vn/v2/gateway/api/query",
      requestBody,
      { headers: { "Content-Type": "application/json" } }
    );

    const data = momoResponse.data;

    return res.json({
      resultCode: data.resultCode,
      status:
        data.resultCode === 0 && data.status === 0
          ? "success"
          : data.resultCode === 0
          ? "pending"
          : "failed",
      message: data.message,
      amount: data.amount,
      transId: data.transId,
      payType: data.payType,
      orderId: orderId,
    });
  } catch (error) {
    console.error("Check MoMo status error:", error.message);
    return res.status(500).json({
      resultCode: -1,
      status: "failed",
      message: "Không thể kiểm tra trạng thái thanh toán.",
    });
  }
};
