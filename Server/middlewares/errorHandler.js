function errorHandler(err, req, res, next) {
    console.log(err);
    let status = 500;
    let message = "Internal server error";

    if (err.name === "INVALID_INPUT") {
        status = 404;
        message = err.message;
    } else if (err.name === "ALREADY_EXIST") {
        status = 409;
        message = err.message;
    } else if (err.name == "INVALID_CREDENTIAL") {
        status = 401;
        message = err.message;
    } else if (err.name == "UNAUTHENTICATED" || err.name == "JsonWebTokenError") {
        status = 401;
        message = "You're unauthenticated!";
    } else if (err.name === "RateLimitError") {
        console.log(err.error);
        status = 400;
        message = err.message;
    }

    res.status(status).json({ message });
}

module.exports = errorHandler;
