"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authGenerator_1 = require("../utils/authGenerator");
exports.default = (req, res, next) => {
    const token = req.cookies.token;
    const userData = token && (0, authGenerator_1.validateToken)(token);
    console.log("userData", userData);
    if (userData) {
        req.currentUser = userData;
        next();
    }
    else {
        res
            .status(401)
            .json({ err: "You need to be logged in to access this data" });
    }
};
//# sourceMappingURL=loginAuth.js.map