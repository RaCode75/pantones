const express = require('express');
const { redirect } = require('express/lib/response');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) =>{
    res.render('pantones/add');
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
    await pool.query('INSERT INTO clients set ?',[newPantone])
    res.redirect('/pantones');
    } catch(err){
        console.log(err);
    }
});

router.get('/', async (req, res) => {
    try{
    const pantones = await pool.query('SELECT * FROM clients');
    res.render('pantones/list', { pantones });
    } catch(err){
        console.log(err);
    }
});

router.get('/delete/:id', async(req, res)=>{
    const { id } = req.params;
    try{
        await pool.query('DELETE FROM clients WHERE ID = ?',[id]);
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
        res.redirect('/pantones');
    }catch(err){
        console.log(err);
    }
});

module.exports = router;