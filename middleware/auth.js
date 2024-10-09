const checkSession = (req,res,next) => {
    if(req.session.user) {
        next()
    } else {
        res.redirect('/user/login')
    }
}

const isLogin = (req,res,next) => {
    if(req.session.user) {
        res.redirect('/user/home')
    }else {
        next()
    }
}

const checkAdminSession = (req,res,next) => {
    if(req.session.admin){
        next()
    }else {
        res.redirect('/admin/login')
    }
}

const isDashboard = (req,res,next) => {
    if(req.session.admin){
        res.redirect('/admin/dashboard')
    }else{
        next()
    }
} 

module.exports = {
    checkSession,
    isLogin,
    checkAdminSession,
    isDashboard
}