"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importStar(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
mongoose_1.default.connect('mongodb://localhost:27017/booktracker')
    .then(() => console.log("Connecté à MongoDB"))
    .catch((error) => console.error("Erreur de connexion à MongoDB:", error));
const bookSchema = new mongoose_1.Schema({
    title: String,
    author: String,
    pages: Number,
    status: String,
    price: Number,
    pagesRead: Number,
    format: String,
    suggestedBy: String,
    finished: Boolean
});
const BookModel = mongoose_1.default.model('Book', bookSchema);
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
// Route pour ajouter un livre
app.post('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newBook = new BookModel(req.body);
    yield newBook.save();
    res.status(201).send(newBook);
}));
// Route pour obtenir tous les livres
app.get('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield BookModel.find();
    res.send(books);
}));
// Route pour mettre à jour un livre
app.put('/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBook = yield BookModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedBook);
}));
// Route pour supprimer un livre
app.delete('/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield BookModel.findByIdAndDelete(req.params.id);
    res.status(204).send();
}));
app.listen(3000, () => console.log('Serveur en marche sur le port 3000'));
