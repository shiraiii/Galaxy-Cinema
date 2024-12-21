const QRCode = require("qrcode");

const generateQR = async (text) => {
  try {
    return await QRCode.toDataURL(text);
  } catch (err) {
    console.error("Error generating QR code: ", err.message);
    throw new Error("Failed to generate QR code");
  }
};

module.exports = generateQR;
