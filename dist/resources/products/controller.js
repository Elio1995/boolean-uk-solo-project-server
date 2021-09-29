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
exports.deleteProducteById = exports.createNewProduct = exports.getProductById = exports.getAllProducts = void 0;
const database_1 = __importDefault(require("../../utils/database"));
const { product } = database_1.default;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield product.findMany();
        res.json({ data: allProducts });
    }
    catch (error) {
        console.log(error);
        res.json({ error: "Not working" });
    }
});
exports.getAllProducts = getAllProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const productById = yield product.findUnique({
            where: { id },
        });
        res.json({ data: productById });
    }
    catch (error) {
        console.log(error);
        res.json({ error: "Not working" });
    }
});
exports.getProductById = getProductById;
const createNewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = req.body;
    try {
        const brandNewProduct = yield product.create({ data: newProduct });
        res.json({ data: brandNewProduct });
    }
    catch (error) {
        res.json({ error: "Not working" });
    }
});
exports.createNewProduct = createNewProduct;
const deleteProducteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const deletedProduct = yield product.delete({
            where: { id },
        });
        res.json({ data: deletedProduct });
    }
    catch (error) {
        res.json({ error: "Not working" });
    }
});
exports.deleteProducteById = deleteProducteById;
//# sourceMappingURL=controller.js.map