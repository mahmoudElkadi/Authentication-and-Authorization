const nodemailer=require("nodemailer")
console.log(process.env.PASS)

const sendEmail=async(destination,message)=>{

    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service:"gmail",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: `${process.env.EMAIL}`, // generated ethereal user
        pass: `Mahmoud#123`, // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `<${process.env.EMAIL}>`, // sender address
      to:destination, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: message, // html body
    });
}

module.exports=sendEmail