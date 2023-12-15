// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/trendingTopicsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB Schema
const trendingTopicSchema = new mongoose.Schema({
  keyword: String,
  topics: [String],
});

const TrendingTopic = mongoose.model('TrendingTopic', trendingTopicSchema);

// Express Routes
app.post('/api/trending', async (req, res) => {
  const { searchTerm, regionFilter, countryFilter, ageFilter } = req.body;

  try {
    // Use News API to get articles related to the specified keyword and filters
    const response = await axios.get(`https://newsapi.org/v2/everything`, {
      params: {
        q: searchTerm,
        apiKey: '5ab9eaa47f8441afa0d73f7dd7ed6cd6',
      },
    });

    const articles = response.data.articles;
    const trendingTopics = articles.map((article) => article.title);

    // Save trending topics to MongoDB
    const newTrendingTopic = new TrendingTopic({
      keyword: searchTerm,
      topics: trendingTopics,
    });

    await newTrendingTopic.save();

    res.status(200).json({ success: true, topics: trendingTopics });
  } catch (error) {
    console.error('Error fetching and storing trending topics:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
