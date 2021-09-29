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
exports.deleteProduct = exports.updateProductQuantity = exports.addProductOrIncreaseQuantity = exports.getProducts = void 0;
const database_1 = __importDefault(require("../../utils/database"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allInCart = yield database_1.default.productsOnCarts.findMany({
            orderBy: {
                id: "asc",
            },
        });
        res.json({ data: allInCart });
    }
    catch (error) {
        console.error(error);
        res.json({ error });
    }
});
exports.getProducts = getProducts;
const addProductOrIncreaseQuantity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { quantity, cartId, productId } = req.body;
    try {
        const alreadyInCart = yield database_1.default.productsOnCarts.findFirst({
            where: {
                productId: Number(productId),
            },
        });
        const cartExist = yield database_1.default.cart.findUnique({
            where: {
                id: Number(cartId),
            },
        });
        if (!cartExist) {
            res.json({ msg: `Basket with ID ${cartId} doesn't exict` });
        }
        else if (alreadyInCart) {
            const updatedQuantity = yield database_1.default.productsOnCarts.update({
                where: {
                    id: alreadyInCart.id,
                },
                data: Object.assign(Object.assign({}, alreadyInCart), { quantity: alreadyInCart.qty + Number(quantity) }),
            });
            res.json({ data: updatedQuantity });
        }
        else {
            const newCartItem = yield database_1.default.productsOnCarts.create({
                data: {
                    quantity,
                    cartId,
                    productId,
                },
            });
            res.json({ data: newCartItem });
        }
    }
    catch (error) {
        console.error(error);
        res.json({ error });
    }
});
exports.addProductOrIncreaseQuantity = addProductOrIncreaseQuantity;
const updateProductQuantity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const foundProduct = yield database_1.default.productsOnCarts.findUnique({
            where: { id },
        });
        if (foundProduct) {
            const updatedProduct = yield database_1.default.productsOnCarts.update({
                where: {
                    id,
                },
                data: Object.assign(Object.assign({}, foundProduct), { qty: (foundProduct === null || foundProduct === void 0 ? void 0 : foundProduct.quantity) - 1 }),
            });
            res.json({ data: updatedProduct });
        }
        else {
            res.json({ msg: `No ${id} found` });
        }
    }
    catch (error) {
        console.error(error);
        res.json({ error });
    }
});
exports.updateProductQuantity = updateProductQuantity;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const deleted = yield database_1.default.productsOnCarts.delete({
            where: { id },
        });
        res.json({ msg: "Successfully removed from db" });
    }
    catch (error) {
        console.error(error);
        res.json({ error });
    }
});
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=controller.js.map