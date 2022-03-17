
function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send(401, { 'status': 401, 'message': 'Usuario no autenticado' })

  }
}

export default isAuth;
