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
exports.deleteCart = exports.addCart = exports.getUserCart = exports.getCart = void 0;
const database_1 = __importDefault(require("../../utils/database"));
// export const addProductsToCard = async (req: Request, res: Response) => {
//   const loggedInUser = req.currentUser as User;
//   const id = loggedInUser.id;
//   const cart = req.body;
//   console.log(cart);
//   try {
//     const newCart = await dbClient.product.upsert({
//       where: { id: id },
//       update: cart,
//       create: cart,
//     });
//     res.json({ date: newCart });
//   } catch (error) {
//     console.log(error);
//     res.json({ error });
//   }
// };
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.userId);
    try {
        const foundCart = yield database_1.default.cart.findFirst({
            where: { userId },
            include: {
                products: {
                    orderBy: {
                        id: "asc",
                    },
                },
            },
        });
        res.json({ data: foundCart });
    }
    catch (error) {
        console.error(error);
        res.json({ error });
    }
});
exports.getCart = getCart;
const getUserCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.userId);
    const cartToCreate = req.body;
    try {
        const foundCart = yield database_1.default.cart.findFirst({
            where: { userId },
            include: { products: true },
        });
        if (!foundCart) {
            const newCart = yield database_1.default.cart.create({
                data: Object.assign({}, cartToCreate),
                include: { products: true },
            });
            res.json({ data: newCart });
        }
        else {
            res.json({ data: foundCart });
        }
    }
    catch (error) {
        console.error(error);
        res.json({ error });
    }
});
exports.getUserCart = getUserCart;
const addCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCart = req.body;
    try {
        const added = yield database_1.default.cart.create({
            data: Object.assign({}, newCart),
        });
        res.json({ data: added });
    }
    catch (error) {
        console.error(error);
        res.json({ error });
    }
});
exports.addCart = addCart;
const deleteCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const removed = yield database_1.default.cart.delete({
            where: { id },
        });
        res.json({ msg: "removed" });
    }
    catch (error) {
        console.error(error);
        res.json({ error });
    }
});
exports.deleteCart = deleteCart;
//# sourceMappingURL=controller.js.map