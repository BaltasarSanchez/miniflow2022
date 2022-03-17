function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

async function SessionChecker(req, res, next) {
  if (
    req.session.nombre ||
    req.url == "/login" ||
    req.url == "/logout" ||
    req.url == "/register"
  ) {
    next();
  } else {
    res.redirect("/login");
  }
}

export { isAuth, SessionChecker };
