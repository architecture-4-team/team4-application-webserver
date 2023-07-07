module.exports = function (app, fs) {
    app.get('/', function (req, res) {
        res.render('index', {
            title: "user application",
            length: 5
        })
    });

    app.get('/login', function (req, res) {
        res.render('login', {
            title: "Login",
            length: 5
        })
    });

    app.get('/join', function (req, res) {
        res.render('join', {
            title: "Join",
            length: 5
        })
    });

    app.get('/changePassword', function (req, res) {
        res.render('changePassword', {
            title: "Change Password",
            length: 5
        })
    });

    app.get('/changeMyInfo', function (req, res) {
        res.render('changeMyInfo', {
            title: "Change My Info",
            length: 5
        })
    });

    app.get('/resetPassword', function (req, res) {
        res.render('resetPassword', {
            title: "Reset Password",
            length: 5
        })
    });

    app.get('/manageUser', function (req, res) {
        res.render('manageUser', {
            title: "Manage User",
            length: 5
        })
    });

    app.get('/searchUser', function (req, res) {
        res.render('searchUser', {
            title: "Search User",
            length: 5
        })
    });
}