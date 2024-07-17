const express = require('express');
const router = express.Router();
const axios = require('axios');

const News = require('../models/news');

const API_KEY = process.env.NEWS_API_KEY; 


// Ruta para obtener noticias de fútbol
router.get('/football', async (req, res) => {
    try {
      const league = req.query.league;
      const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          qInTitle: league,
          apiKey: API_KEY,
          language: 'es',
          from: '2024-06-16',
          sortBy: 'publishedAt',
        },
      });
  
      const articles = response.data.articles.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
        source: article.source.name,
      }));
  
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching news', error: error.message });
    }
});
// Obtener todas las noticias
router.get('/', async (req, res) => {
    try {
        const news = await News.find();
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Crear una nueva noticia
router.post('/', async (req, res) => {
    const news = new News({
        title: req.body.title,
        image: req.body.image,
        link: req.body.link
    });

    try {
        const newNews = await news.save();
        res.status(201).json(newNews);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Middleware para obtener noticia por ID
async function getNews(req, res, next) {
    let news;
    try {
        news = await News.findById(req.params.id);
        if (news == null) {
            return res.status(404).json({ message: 'No se encontró la noticia' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.news = news;
    next();
}

// Obtener una noticia específica
router.get('/:id', getNews, (req, res) => {
    res.json(res.news);
});

// Actualizar una noticia
router.patch('/:id', getNews, async (req, res) => {
    if (req.body.title != null) {
        res.news.title = req.body.title;
    }
    if (req.body.image != null) {
        res.news.image = req.body.image;
    }
    if (req.body.link != null) {
        res.news.link = req.body.link;
    }

    try {
        const updatedNews = await res.news.save();
        res.json(updatedNews);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar una noticia
router.delete('/:id', getNews, async (req, res) => {
    try {
        await res.news.remove();
        res.json({ message: 'Noticia eliminada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
