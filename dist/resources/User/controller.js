"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAUser = exports.getAUserById = exports.getAllUsers = void 0;
const authGenerator_1 = require("../../utils/authGenerator");
const service_1 = __importDefault(require("./service"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield service_1.default.findMany();
        res.json({ data: allUsers });
    }
    catch (error) {
        console.log(error);
        res.json({ error: "The is an issue" });
    }
});
exports.getAllUsers = getAllUsers;
const getAUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const userById = yield service_1.default.findUnique({
            where: { id },
        });
        res.json({ date: userById });
    }
    catch (error) {
        console.log(error);
        res.json({ error: `Could not find the user with ${id}` });
    }
});
exports.getAUserById = getAUserById;
const createAUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = req.body;
    // This is my modified create version, with the password hashing!
    const savedUser = yield service_1.default.createWithHash(newUser);
    const token = (0, authGenerator_1.createToken)({
        id: savedUser.id,
        name: savedUser.firstName,
    });
    // This creates a cookie that can't be accessed by Javascript in the Frontend
    // httpOnly: true
    res.cookie("token", token, { httpOnly: true });
    res.json({ data: { username: savedUser.username } });
});
exports.createAUser = createAUser;
// export const createAUser = async (req: Request, res: Response) => {
//   const userInfo = { ...req.body };
//   console.log(req.body);
//   console.log(userInfo);
//   try {
//     const CreatedUser = await userClient.create({
//       data: userInfo,
//     });
//     res.json(CreatedUser);
//   } catch (error) {
//     console.log(error);
//     res.json({ Error: "Fail to create a user" });
//   }
// };
//# sourceMappingURL=controller.js.map