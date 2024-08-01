const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'vohoangloc200@gmail.com',//email_cua_ban
        pass: 'wsabtpkmddlhdgqa'//mat_khau_ung_dung
    }
});

module.exports = { transporter };
