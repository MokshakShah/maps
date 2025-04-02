
// // server.js
// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const twilio = require("twilio");

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Initialize Twilio client with your environment variables
// const client = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// // POST route to send alert
// app.post("/send-alert", async (req, res) => {
//   try {
//     const { message } = req.body; // Get message from frontend

//     // Send message using Twilio API
//     await client.messages.create({
//       body: message, // This is the body of the message (includes location)
//       from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
//       to: "+918779489057", // Your verified contact number
//     });

//     res.status(200).send("Alert Sent!"); // Respond with success
//   } catch (error) {
//     console.error("Twilio error:", error);
//     res.status(500).send("Error sending alert.");
//   }
// });

// // Start server
// app.listen(5000, () => console.log("Server running on port 5000"));


//////////////////////////////////////////////////////////////////////////////

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
app.use(cors());
app.use(express.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = new twilio(accountSid, authToken);

app.post("/send-alert", async (req, res) => {
  const { message, contact } = req.body;

  try {
    const response = await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: contact,
    });

    console.log("Message sent: ", response.sid);
    res.status(200).json({ success: true, message: "Alert Sent!" });
  } catch (error) {
    console.error("Twilio Error:", error);
    res.status(500).json({ success: false, message: "Failed to send alert" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
