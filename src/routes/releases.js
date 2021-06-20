// @ts-nocheck
const express = require('express');
const router = express.Router();

const pool = require('../database');
const {isLoggedIn} = require('../lib/auth')


router.get('/', isLoggedIn, async (req, res) => {
    const releases = await pool.query('SELECT * FROM releases WHERE user_id = ?', [req.user.id]);
    res.render('releases/list', { releases });// It send to the list and create an array with the releases
});

router.get('/add', isLoggedIn, (req, res) => {
    res.render('releases/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    const { release_type, title, artists, genre  } = req.body;
    const newRelease = {
        release_type,
        title,
        artists,
        genre,
        user_id:req.user.id,
    };
    await pool.query('INSERT INTO releases set ?', [newRelease]);
    req.flash('success', 'Released saved successfully');
    res.redirect('/releases');
});

//TODO 

// router.get('/delete/:id',isLoggedIn, async (req, res) => {
//     const { id } = req.params;
//     await pool.query('DELETE FROM links WHERE ID = ?', [id]);
//     req.flash('success', 'Link deleted successfully');
//     res.redirect('/links');
// });

// router.get('/edit/:id',isLoggedIn, async (req, res) => {
//     const { id } = req.params;
//     const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
//     res.render('links/edit', { link: links[0] });
// });

// router.post('/edit/:id', isLoggedIn, async (req, res) => {
//     const { id } = req.params;
//     const { title, url, description } = req.body;
//     const newLink = {
//         title,
//         url,
//         description
//     };
//     await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
//     req.flash('success', 'Link updated successfully');
//     res.redirect('/links');
// });

module.exports = router;