"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = exports.HttpStatus = void 0;
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["OK"] = 200] = "OK";
    HttpStatus[HttpStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatus[HttpStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpStatus[HttpStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpStatus[HttpStatus["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpStatus || (exports.HttpStatus = HttpStatus = {}));
class HttpResponse {
    Ok(res, data) {
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: "Success",
            data,
        });
    }
    NotFound(res, data) {
        return res.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            message: "Not Found",
            error: data,
        });
    }
    Unauthorized(res, data) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            message: "Unauthorized",
            error: data,
        });
    }
    Forbidden(res, data) {
        return res.status(HttpStatus.FORBIDDEN).json({
            status: HttpStatus.FORBIDDEN,
            message: "Forbidden",
            error: data,
        });
    }
    ServerError(res, error, url) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            statusMessage: error === null || error === void 0 ? void 0 : error.message,
            error: error === null || error === void 0 ? void 0 : error.name,
            path: url,
        });
    }
}
exports.HttpResponse = HttpResponse;
const httpResponse = new HttpResponse();
exports.default = httpResponse;
