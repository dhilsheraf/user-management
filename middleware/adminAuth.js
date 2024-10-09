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
    checkAdminSession,
    isDashboard
}