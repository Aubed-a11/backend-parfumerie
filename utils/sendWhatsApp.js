const axios = require("axios");

module.exports = async (phone, message) => {
  await axios.post(
    "https://graph.facebook.com/v18.0/PHONE_ID/messages",
    {
      messaging_product: "whatsapp",
      to: phone,
      type: "text",
      text: { body: message }
    },
    {
      headers: {
        Authorization: `Bearer WHATSAPP_TOKEN`
      }
    }
  );
};
await sendWhatsApp(
  "+221771234567",
  "Votre paiement SS Parfumeries est confirmé ✅"
);
