const nodemailer = require("nodemailer");

const sendDetails = (req, res) => {
  var location = req.body.location;
  var title = req.body.emergency_title;
  var details = req.body.emergency_details;

  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "Gmail", // e.g., 'Gmail', 'Yahoo', etc.
    auth: {
      user: "eightninemo@gmail.com",
      pass: "xybx wund jsem sdpe",
    },
  });

  // Email data
  const mailOptions = {
    from: "eightninemo@gmail.com",
    to: "sooreoluwwaa@icloud.com",
    subject: `New Emergency (${title})`,
    html: `<p>The user location is <b>${location}</b> with an emergency: <b>${details}</b> </p>`,
  };

  if (details != "") {
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(400).json({
          status: false,
          message: error,
        });
      } else {
        console.log("Email sent:", info.response);
        res.status(200).json({
          status: true,
          message: "Emergency Details sent Successfully.",
        });
      }
    });
  }
};

module.exports = { sendDetails };
