const express = require('express');
const { redirect } = require('express/lib/response');
const router = express.Router();
const { isLoggedIn } = require('../lib/secauth');

const pool = require('../database');

router.get('/add', isLoggedIn, async(req, res) =>{
    const userId = req.user.id
    const user = await pool.query('SELECT username, permisos FROM users WHERE ID=?', [userId])
    const data = user[0];
    const allData = data
    res.render('pantones/add', {allData});
});

router.post('/add', async (req, res) => {
    const { cliente, color, trabajo, recipe } = req.body;
    const newPantone = {
        cliente,
        color,
        trabajo,
        recipe
    };
    try{
    await pool.query('INSERT INTO clients set ?',[newPantone]);
    req.flash('success', 'Pantone guardado correctamente');
    res.redirect('/pantones');
    } catch(err){
        console.log(err);
    }
});

router.get('/',  async (req, res) => {
    try{
        if(!req.user){
            const userId = 0
            const user = await pool.query('SELECT username, permisos FROM users WHERE ID=?', [userId])
            const data = user[0];
            const pantones = await pool.query('SELECT * FROM clients');
            const allData = {pantones, ...data}
            res.render('pantones/list', { allData });
        }else{
    const userId = req.user.id
    const user = await pool.query('SELECT username, permisos FROM users WHERE ID=?', [userId])
    const data = user[0];
    const pantones = await pool.query('SELECT * FROM clients');
    const allData = {pantones, ...data}
    res.render('pantones/list', { allData });
        }
    } catch(err){
        console.log(err);
    }
});

router.get('/delete/:id', async(req, res)=>{
    const { id } = req.params;
    try{
        await pool.query('DELETE FROM clients WHERE ID = ?',[id]);
        req.flash('success', 'Pantone borrado correctamente');
        res.redirect('/pantones');
    } catch(err){
        console.log(err);
    }
});

router.get('/edit/:id', async(req, res)=>{
    const { id } = req.params;
    try{
    const pantone = await pool.query('SELECT * FROM clients WHERE id = ?', [id]);
    res.render('pantones/edit', {pantone: pantone[0]});
    } catch(err){
        console.log(err);
    }
});

router.post('/edit/:id', async(req, res)=>{
    const { id } = req.params;
    const {cliente, color, trabajo, recipe } = req.body;
    const editPant = {
        cliente,
        color,
        trabajo,
        recipe
    };
    try{
        await pool.query('UPDATE clients set ? WHERE id = ?', [editPant, id]);
        req.flash('success', 'Pantone editado correctamente');
        res.redirect('/pantones');
    }catch(err){
        console.log(err);
    }
});

module.exports = router;