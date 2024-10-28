import express from 'express';
import mongoose, { Schema, Document } from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
mongoose.connect('mongodb://localhost:27017/booktracker')
    .then(() => console.log("Connecté à MongoDB"))
    .catch((error) => console.error("Erreur de connexion à MongoDB:", error));

interface IBook extends Document {
  title: string;
  author: string;
  pages: number;
  status: string;
  price: number;
  pagesRead: number;
  format: string;
  suggestedBy: string;
  finished: boolean;
}

const bookSchema = new Schema<IBook>({
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

const BookModel = mongoose.model<IBook>('Book', bookSchema);

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views'))); // Permet de servir les fichiers statiques

// Route pour servir le fichier HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Route pour ajouter un livre
app.post('/books', async (req, res) => {
    const newBook = new BookModel(req.body);
    await newBook.save();
    res.status(201).send(newBook);
  });
  
  // Route pour obtenir tous les livres
  app.get('/books', async (req, res) => {
    const books = await BookModel.find();
    res.send(books);
  });
  
  // Route pour mettre à jour un livre
  app.put('/books/:id', async (req, res) => {
    const updatedBook = await BookModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedBook);
  });
  
  // Route pour supprimer un livre
  app.delete('/books/:id', async (req, res) => {
    await BookModel.findByIdAndDelete(req.params.id);
    res.status(204).send();
  });
  
  app.listen(3000, () => console.log('Serveur en marche sur le port 3000'));
  