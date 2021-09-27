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
exports.addProductsToCard = void 0;
const database_1 = __importDefault(require("../../utils/database"));
const addProductsToCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loggedInUser = req.currentUser;
    const id = loggedInUser.id;
    const cart = req.body;
    console.log(cart);
    try {
        const newCart = yield database_1.default.product.upsert({
            where: { id: id },
            update: cart,
            create: cart,
        });
        res.json({ date: newCart });
    }
    catch (error) {
        console.log(error);
        res.json({ error });
    }
});
exports.addProductsToCard = addProductsToCard;
//# sourceMappingURL=controller.js.map