const express = require('express');
const router = express.Router();
const session = require('express-session');

const pool = require('../db');

router.get('/home', async (req , res) => {
    if (req.session.loggedin) {
        const articulo = await pool.query('SELECT * FROM articulo');
        await pool.query('UPDATE ganancias SET gananciabruta = (SELECT SUM(`gananciabruta`) FROM articulo)');
        await pool.query('UPDATE ganancias SET ganancianeta = (SELECT SUM(`ganancianeta`) FROM articulo)');
        const ganancias = await pool.query('SELECT * FROM ganancias')
        res.render('partial/index', {articulo, ganancias});
        //res.render('partial/index');
        //res.send('Perrito')
    } else {
        res.send('La concha de tu madre!');
    }
});
router.get('/', function(req , res) {
    res.render('partial/login');
});
router.post('/auth', async (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	if (username && password) {
		await pool.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.username = username;
				res.redirect('/home');
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});
router.post('/addarticulo', async (req , res) => {
    const {nombre, detalles, stock, preciocosto, precioventa, cantidadvendidos, categoria, descripcion} = req.body;
    const newArticulo = {
        nombre,
        stock,
        detalles,
        preciocosto,
        precioventa,
        cantidadvendidos,
        categoria,
        descripcion,

    };
    console.log(newArticulo);
    //const ganancia = newArticulo.precioventa - newArticulo.preciocosto;
    //console.log(ganancia);
    //await pool.query(`INSERT INTO articulo (ganancia) VALUES ?`, [ganancia2])
    await pool.query('INSERT INTO articulo set ?', [newArticulo]);
    res.redirect('/home');
});

router.get('/delete/:id', async(req,res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM articulo WHERE id = ?', [id]);
    res.redirect('/home');
});
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const articulos = await pool.query('SELECT * FROM articulo WHERE id =?', [id]);
    res.render('partial/edit', {articulo: articulos[0]});
});

router.post('/edit/:id', async (req, res) => {
    const {nombre, detalles, stock, preciocosto, precioventa, cantidadvendidos, categoria, descripcion, ganancianeta, gananciabruta} = req.body;
    const { id } = req.params;
    const newArticulo = {
        nombre,
        stock,
        detalles,
        preciocosto,
        precioventa,
        cantidadvendidos,
        categoria,
        descripcion,
        ganancianeta,
        gananciabruta
    };
    await pool.query('UPDATE articulo set ? WHERE id = ?', [newArticulo, id]);
    await pool.query('UPDATE articulo SET gananciabruta = precioventa * cantidadvendidos WHERE id = ?', [id]);
    await pool.query('UPDATE articulo SET ganancianeta = (precioventa - preciocosto) * cantidadvendidos WHERE id = ?', [id]);
    res.redirect('/home');
});
router.get('/masuno/:id', async (req, res) => { 
    const {preciocosto, precioventa, cantidadvendidos, ganancianeta, gananciabruta} = req.body;
    const { id } = req.params;
    const newArticulo = {
        preciocosto,
        precioventa,
        cantidadvendidos,
        ganancianeta,
        gananciabruta
    }
    await pool.query('SELECT ? FROM articulo WHERE id = ?', [newArticulo, id]);
    await pool.query(`UPDATE articulo SET stock = stock - 1 WHERE id = ?`, [id]);
    await pool.query(`UPDATE articulo SET cantidadvendidos = cantidadvendidos + 1 WHERE id = ?`, [id]);
    await pool.query('UPDATE articulo SET ganancianeta = (precioventa - preciocosto) * cantidadvendidos WHERE id = ?', [id]);
    await pool.query('UPDATE articulo SET gananciabruta = precioventa * cantidadvendidos WHERE id = ?', [id]);
    res.redirect('/home');
});

module.exports = router;