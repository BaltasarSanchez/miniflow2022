function CorsHeaders(req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header(
        "Access-Control-Allow-Methods",
        "POST,PUT,GET,DELETE,UPDATE"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    );
    res.header("Access-Control-Expose-Headers", " set-cookie");

    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }

    next();
}

export default CorsHeaders;