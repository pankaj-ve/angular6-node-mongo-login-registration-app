let async = require('async'),
    parseString = require('xml2js').parseString;

let util = require('../Utilities/util'),
    userDAO = require('../DAO/userDAO'),
    config = require("../Utilities/config").config;


    /* API to register new user */
    let register = (data, callback) => {
       async.auto({
            checkUserExistsinDB: (cb) => {
				
                if (!data.email || !data.phone || !data.password) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
                    return;
                }
                else{
                    let criteria = {
                        email: data.email
                    }
                    userDAO.getUser(criteria, {}, {}, (err, dbData) => {
                        if (err){
                            cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SERVER_BUSY })
                            return;
                        }
                        
                        if (dbData && dbData.length) {
                            cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.EMAIL_ALREADY_REGISTERED});
                            return;                       
                        } 
                        let criteria2 ={
                            phone : data.phone
                        }
                        userDAO.getUser(criteria2, {}, {}, (err, dbData2) => {
                            if(dbData2 && dbData2.length>0){
                                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PHONE_ALREADY_REGISTERED});
                                return;  
                            }
                            else{
                                cb(null,dbData2);
                                return;
                            }
                        })                                                        
                    });
                }
            },
            createUserinDB: ['checkUserExistsinDB', (cb,functionData) => {
                if (functionData.checkUserExistsinDB && functionData.checkUserExistsinDB.statusCode) {
                    cb(null, functionData.checkUserExistsinDB);
                    return;
                }
                else{
                    let OTP = Math.floor(100000 + Math.random() * 900000);
                    let userData = {
                        "firstName":data.firstName?data.firstName:'',
                        "full_name": data.lastName ? data.lastName : '',
                        "email": data.email,
                        "phone": data.phone,
                        "password": util.encryptData(data.password), 
                        "status": true,
                        "otp":OTP,
                        "dateTimeOTP": Date.now()                    
                    }                
                    
                    userDAO.createUser(userData, (err, dbData) => {
                        if (err) {
                            cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SERVER_BUSY });
                            return;
                        }
                        else{
                            // let link = config.NODE_SERVER_URL.url+":"+config.NODE_SERVER_PORT.port+"/student-auth/verify-email-link?email="+dbData.email+"&otp="+dbData.otp+"&auth=9876543wqasxcvbnjkikuytrd";
                            // util.sendActivationMail({ "baseUrl":config.NODE_SERVER_URL.url,"email": dbData.email, "OTP": dbData.otp,"link":link});
                            cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.REGISTRATION_DONE, "result": dbData});    
                            return;    
                        }                    
                    });
                }
            }]
        }, (err, response) => {
            callback(response.createUserinDB);
        });
    }
    

    /* API to login user */
    let login = (data, callback) => {
        async.auto({
            checkUserExistsinDB: (cb) => {
                if (!data.email) {
                    cb(null, { "statusCode": util.statusCode.ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
                    return;
                }
                var criteria = {
                    email: data.email
                }            
                userDAO.getUser(criteria, {}, {}, (err, dbData) => {    
                    if (err) {
                        console.log('11111');
                        cb(null, { "statusCode": util.statusCode.ONE, "statusMessage": util.statusMessage.SERVER_BUSY })
                        return;
                    }
                    if (dbData && dbData.length) {
                        var criteria2 = {
                            email: data.email,
                            password: util.encryptData(data.password),
                            status: true
                        }
                        userDAO.getUser(criteria2, {}, {}, (err, dbData) => {
                            if (err) {
                                console.log('111112222222');
                                cb(null, { "statusCode": util.statusCode.ONE, "statusMessage": util.statusMessage.SERVER_BUSY })
                                return;
                            }
                            if (dbData && dbData.length) {
                                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.LOGGED_IN, "result": dbData[0] });
                            } else {
                                cb(null, { "statusCode": util.statusCode.NINE, "statusMessage": util.statusMessage.ENTER_VALID_CUSTOMERID_PASS });
                            }
                        });
                            
                        
                    } else {
                        cb(null, { "statusCode": util.statusCode.ONE, "statusMessage": util.statusMessage.EMAIL_NOT_EXIST });
                    }
                });
                
                
            }
        }, (err, response) => {
            callback(response.checkUserExistsinDB); 
        })
    }    

    /* API to send email on forgot password request */
    let forgotPassword = (data, callback) => {
        async.auto({
            checkUserExistsinDB: (cb) => {
                if (!data.email) {
                    cb(null, { "statusCode": util.statusCode.ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
                    return;
                }
                let criteria = {
                    email: data.email,
                    status:true
                }            
                userDAO.getUser(criteria, {}, {}, (err, dbData) => {    
                    if (err) {
                        cb(null, { "statusCode": util.statusCode.ONE, "statusMessage": util.statusMessage.SERVER_BUSY })
                        return;
                    }
                    if (dbData && dbData.length) {
                        const token = new Date().getTime();
                        let criteria2 = {
                            email: data.email,
                        }
                        let dataToSet = {
                            $set : {
                                token:token
                            }
                        }
                        userDAO.updateUser(criteria2, dataToSet, {}, (err, dbData) => {
                            if (err) {
                                cb(null, { "statusCode": util.statusCode.ONE, "statusMessage": util.statusMessage.SERVER_BUSY })
                                return;
                            }
                            let link = config.NODE_SERVER_URL.url+":"+4200+"/authentication/verify-email-link?email="+dbData.email+"&token="+dbData.token+"&auth=9876543wqasxcvbnjkikuytrd";
                            util.sendForgotMail({"email": dbData.email,"link":link});
                            cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.MAIL_SENT_FORGOT_PASSWORD });
                        });
                            
                        
                    } else {
                        cb(null, { "statusCode": util.statusCode.ONE, "statusMessage": util.statusMessage.EMAIL_NOT_EXIST });
                    }
                });
                
                
            }
        }, (err, response) => {
            callback(response.checkUserExistsinDB); 
        })
    }    

    let verifyForgotLink = (data, callback) => {
        async.auto({
            checkUserExistsinDB: (cb) => {
                if (!data.email) {
                    cb(null, { "statusCode": util.statusCode.ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
                    return;
                }
                let criteria = {
                    email: data.email,
                    token:data.token
                }            
                userDAO.getUser(criteria, {}, {}, (err, dbData) => {  
                    if (err) {
                        cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SERVER_BUSY })
                        return;
                    }
                    if (dbData && dbData.length) {
                            cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.VALID_LINK });
                    } else {
                        cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.INVALID_LINK});
                    }
                });
                
                
            }
        }, (err, response) => {
            callback(response.checkUserExistsinDB); 
        })
    }    

    let resetPassword = (data, callback) => {
        console.log(data,'this is testingdata-------');
        async.auto({
            checkUserExistsinDB: (cb) => {
                if (!data.email) {
                    cb(null, { "statusCode": util.statusCode.ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
                    return;
                }
                let criteria = {
                    email: data.email,
                    token:data.token
                }            
                userDAO.getUser(criteria, {}, {}, (err, dbData) => {  
                    if (err) {
                        cb(null, { "statusCode": util.statusCode.ONE, "statusMessage": util.statusMessage.SERVER_BUSY })
                        return;
                    }
                    if (dbData && dbData.length) {
                        let criteria2 = {
                            email: data.email,
                        }
                        
                        let passwordEncoded = util.encryptData(data.password);
                        let dataToSet = {
                            $set : {
                                token:0,
                                password:passwordEncoded
                            }
                        }
                        console.log(criteria2,'----------',dataToSet);
                        userDAO.updateUser(criteria2, dataToSet, {}, (err, dbData) => {
                            if (err) {
                                console.log(err,'pankaj-----')
                                cb(null, { "statusCode": util.statusCode.ONE, "statusMessage": util.statusMessage.SERVER_BUSY })
                                return;
                            }
                            cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.PASSWORD_UPDATED });
                        });
                    } else {
                        cb(null, { "statusCode": util.statusCode.ONE, "statusMessage": util.statusMessage.INVALID_LINK});
                    }
                });
                
                
            }
        }, (err, response) => {
            callback(response.checkUserExistsinDB); 
        })
    }    



    /*API to get profile data... */
    let getProfile = (data, callback) => {
        async.auto({
            checkUserExistsinDB: (cb) => {
                if (!data.userId) {
                    cb(null, { "status": util.statusCode.ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
                    return;
                }
                var criteria = {
                    _id: data.userId
                }            
                userDAO.getUser(criteria, {}, {}, (err, dbData) => {    
                    if (err) {
                        cb(null, { "status": util.statusCode.ONE, "statusMessage": util.statusMessage.SERVER_BUSY })
                        return;
                    }
                    if (dbData && dbData.length) {
                        cb(null, { "status": util.statusCode.ONE, "statusMessage": util.statusMessage.SUCCESS,"result":dbData[0] });
                            
                        
                    } else {
                        cb(null, { "status": util.statusCode.ONE, "statusMessage": util.statusMessage.ID_NOT_EXIST });
                    }
                });
                
                
            }
        }, (err, response) => {
            callback(response.checkUserExistsinDB); 
        })
    }      

module.exports = {
    register : register,
    login : login,
    getProfile : getProfile,
    forgotPassword : forgotPassword,
    verifyForgotLink : verifyForgotLink,
    resetPassword : resetPassword
};
