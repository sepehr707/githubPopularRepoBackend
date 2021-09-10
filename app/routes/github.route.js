const express = require('express');
const controller = require('../controllers/github.controller');
const router = express.Router();
router.get('/top-repo/:date', async (req, res) => {
    const date = req.params.date;
    const language = req.query.language;
    const page = req.query.page;

    const data = await controller.getGithubRepositories(date, language, page);
    res.status(data.status).send({response: data.response});
});

module.exports = router;