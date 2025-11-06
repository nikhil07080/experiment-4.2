const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

let cards = [
  { id: 1, suit: "Hearts", value: "Ace" },
  { id: 2, suit: "Hearts", value: "2" },
  { id: 3, suit: "Hearts", value: "King" }
];
let nextId = 4  ;


// GET: List all cards
app.get('/cards', (req, res) => {
  res.json(cards);
});

// GET: Retrieve a card by ID
app.get('/cards/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const card = cards.find(c => c.id === id);
  if (!card) {
    return res.status(404).json({ error: "Card not found" });
  }
  res.json(card);
});

// POST: Add a new card
app.post('/cards', (req, res) => {
  const { suit, value } = req.body;
  if (!suit || !value) {
    return res.status(400).json({ error: "Suit and value are required" });
  }
  const newCard = { id: nextId++, suit, value };
  cards.push(newCard);
  res.status(201).json(newCard);
});

// DELETE: Remove a card by ID
app.delete('/cards/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = cards.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Card not found" });
  }
  const deletedCard = cards.splice(index, 1);
  res.json({ message: "Card deleted", card: deletedCard[0] });
});

// Start server
app.listen(port, () => {
  console.log(`Playing Card API is running at http://localhost:${port}`);
});
