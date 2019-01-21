let MD5 = require('md5'),
    templates = require("./templates"),
    nodemailer = require("nodemailer"),
    config = require("./config").config,
    mustache = require('mustache');


// Define Error Codes
let statusCode = {
    ZERO: 0,
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
    SEVEEN: 7,
    EIGHT: 8,
    NINE: 9,
    OK: 200,
    FOUR_ZERO_FOUR: 404,
    FOUR_ZERO_THREE: 403,
    FOUR_ZERO_ONE: 401,
    FIVE_ZERO_ZERO: 500
};

// Define Error Messages
let statusMessage = {
    PARAMS_MISSING : 'Parameters are missing!',
    SERVER_BUSY : 'Our Servers are busy. Please try again later.',
    EMAIL_ALREADY_REGISTERED : 'Email already registered, Try another.',
    PHONE_ALREADY_REGISTERED: 'Phone already registered, Try another.',
    USER_REGISTERED_SUCCESSFULLY : 'You have registered successfully. Please login to continue',
    PLEASE_SIGNUP_FIRST: 'Your email is not Registered, Please Sign up First.',
    LOGGED_IN: 'You have sucessfully Logged in',
    ENTER_VALID_CUSTOMERID_PASS: 'Please enter your valid email and password.',
    EMAIL_NOT_EXIST: 'Entered email does not exist.',
    EMAIL_VERIFIED : 'Congratulations! Your email has verified successfully!',
    EMAIL_ALREADY_VERIFIED: 'Email has  been already verified!.',
    PASSWORD_CHANGED: 'Your Password has changed successfully.',
    REGISTRATION_DONE : 'Registration completed!',
    ID_NOT_EXIST : 'Invalid Id!',
    SUCCESS : 'success',
    MAIL_SENT_FORGOT_PASSWORD : 'mail sent to reset password',
    VALID_LINK : 'valid link. Reset your password.',
    INVALID_LINK : 'invalid link. Try again.',
    PASSWORD_UPDATED : 'password updated!'
};

let mailModule = nodemailer.createTransport(config.OTP_EMAIL_CONFIG);


let encryptData = (stringToCrypt) => {
    return MD5(MD5(stringToCrypt));
    
};
 

let sendActivationMail = (data) => {
    var mailOptions = {
        from: templates.activationMailTemplate.from,
        to: data.email,
        subject: templates.activationMailTemplate.subject,
        html: mustache.render(templates.activationMailTemplate.html, data)
    };
    mailModule.sendMail(mailOptions,(err, success) => {
        if (err) {
            console.log(err)
        }
    });
}

let sendForgotMail = (data) => {
    var mailOptions = {
        from: templates.forgotPasswordMailTemplate.from,
        to: data.email,
        subject: templates.forgotPasswordMailTemplate.subject,
        html: mustache.render(templates.forgotPasswordMailTemplate.html, data)
    };
    mailModule.sendMail(mailOptions,(err, success) => {
        if (err) {
            console.log(err)
        }
    });
}

module.exports = {
    statusCode: statusCode,
    statusMessage: statusMessage,
    encryptData : encryptData,
    sendActivationMail : sendActivationMail,
    sendForgotMail : sendForgotMail
}
