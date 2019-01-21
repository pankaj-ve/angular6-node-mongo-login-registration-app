let express = require('express'),
    router = express.Router(),
    util = require('../Utilities/util'),
    loginService = require('../Services/login');

/* User Registration. */
router.post('/register', (req, res) => {
    loginService.register(req.body, (data) => {
        res.send(data);
    });
});

/* User Login. */
router.post('/login', (req, res) => {
    loginService.login(req.body, (data) => {
        res.send(data);
    });
});

/* get User profile. */
router.get('/get-profile', (req, res) => {
    loginService.getProfile(req.query, (data) => {
        res.send(data);
    });
});


router.post('/forgot-password', (req, res) => {
    loginService.forgotPassword(req.body, (data) => {
        res.send(data);
    });
});

router.get('/verify-forgot-link', (req, res) => {
    loginService.verifyForgotLink(req.query, (data) => {
        res.send(data);
    });
});

router.put('/reset-password', (req, res) => {
    loginService.resetPassword(req.body, (data) => {
        res.send(data);
    });
});

module.exports = router;
