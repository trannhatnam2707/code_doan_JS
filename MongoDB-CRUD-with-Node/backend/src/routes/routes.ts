import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();
import BookModel from '../models/book.js';
import UserModel from '../models/auth.js';
import OrderModel from '../models/order.js';
import bcrypt from 'bcrypt';

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new UserModel({ username, password: hashedPassword });

  user
    .save()
    .then((user) => {
      const token = jwt.sign({ username: user.username }, 'secretkey');
      res.status(200).json({ token });
    })
    .catch((err) => console.log(err));
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username: user.username }, 'secretkey');
  res.status(200).json({ token });
});

// view books
router.get('/getbooks', (req, res) => {
  BookModel.find({})
    .then((book) => {
      res.json(book);
    })
    .catch((err) => console.log(err));
});

// add new book
router.post('/addbook', (req, res) => {
  console.log(req.body);
  BookModel.create(req.body)
    .then((book) => res.json(book))
    .catch((err) => res.status(401).json(err));
});

// get single book

router.get('/getbooks/:id', (req, res) => {
  const id: string = req.params.id;

  BookModel.findById(id)
    .then((book) => {
      res.json(book);
    })
    .catch((err) => console.log('Some field is missing. Please refresh and try again'));
});

//update books

router.post('/updatebook/:id', (req, res) => {
  const id: string = req.params.id;

  BookModel.findByIdAndUpdate(
    { _id: id },
    {
      bookname: req.body.bookname,
      author: req.body.author,
      description: req.body.description,
      rating: req.body.rating,
      image: req.body.image,
    }
  )
    .then((book) => {
      res.json(book);
    })
    .catch((err) => console.log(err));
});

//delete books

router.get('/deletebook/:id', (req, res) => {
  const id: string = req.params.id;

  BookModel.findByIdAndDelete(id)
    .then((book) => {
      res.json(book);
    })
    .catch((err) => console.log(err));
});

// place order
router.post('/order', (req, res) => {
  const order = new OrderModel(req.body);
  order
    .save()
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((err) => console.log(err));
});

export default router;
