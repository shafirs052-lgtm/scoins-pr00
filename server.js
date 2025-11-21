const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Хранилище данных (в памяти)
let marketplace = [
  {
    globalId: 'demo_1',
    coin: { 
      id: 101, 
      name: "Редкий SCoin", 
      icon: "🔴", 
      price: 75, 
      rarity: "rare", 
      description: "Эксклюзивная редкая монета", 
      edition: "Special" 
    },
    price: 120,
    sellerId: 'user_123',
    sellerName: 'Алексей',
    sellerRating: 4.8,
    timestamp: Date.now() - 3600000
  },
  {
    globalId: 'demo_2',
    coin: { 
      id: 102, 
      name: "Старинный SCoin", 
      icon: "🏛️", 
      price: 120, 
      rarity: "epic", 
      description: "Монета древней цивилизации", 
      edition: "Ancient" 
    },
    price: 180,
    sellerId: 'user_456',
    sellerName: 'Мария',
    sellerRating: 4.9,
    timestamp: Date.now() - 7200000
  }
];

// API endpoints
app.get('/api/marketplace', (req, res) => {
  try {
    res.json(marketplace);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.post('/api/marketplace', (req, res) => {
  try {
    const newItem = {
      ...req.body,
      timestamp: Date.now()
    };
    marketplace.push(newItem);
    res.json({ success: true, item: newItem });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка добавления' });
  }
});

app.delete('/api/marketplace/:id', (req, res) => {
  try {
    const initialLength = marketplace.length;
    marketplace = marketplace.filter(item => item.globalId !== req.params.id);
    
    if (marketplace.length === initialLength) {
      return res.status(404).json({ error: 'Предложение не найдено' });
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка удаления' });
  }
});

// Статус сервера
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'online', 
    items: marketplace.length,
    server: 'Vercel Node.js',
    timestamp: new Date().toISOString()
  });
});

// Корневой маршрут
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 SCoinS PRO Server is running!',
    version: '1.0.0',
    endpoints: {
      getMarketplace: 'GET /api/marketplace',
      addItem: 'POST /api/marketplace',
      deleteItem: 'DELETE /api/marketplace/:id',
      status: 'GET /api/status'
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ SCoinS PRO Server running on port ${PORT}`);
});

module.exports = app;