let express = require('express');
let router = express.Router();

const Producto = require('../modelos/Productos');
const Usuario = require('../modelos/Usuario')

router.get('/', (req, res) => {
    res.send('<h1>Bienvenido al almacén de la tienda</h1>');
});

router.get('/consulta', async (req, res) => {
    try {
        const listado = await Producto.find({});
        res.status(200).send(listado);
    }
    catch(err) {
        res.status(500).send(err);
    }
});

router.get('/consultax', async (req, res) => {
    try {
        const listado = await Producto.find({});
        res.status(200).send(listado);
    }
    catch(err) {
        res.status(500).send(err);
    }
});

router.get('/consulta/:id', async (req, res) => {
    try {
        const listaid = await Producto.findById(req.params.id);
        if (!listaid) {
            return res.status(404);            
        }
        res.status(200).send(listaid);
    }
    catch(err) {
        res.status(500).send(err);
    }
});

router.put('/actualiza/:id', async (req, res) => {
    try {
        let usuarioad = await Usuario.findOne({"nombre": req.body.usuario.nombre})
        if (usuarioad.clave === req.body.usuario.clave){
            let actualiid = await Producto.findByIdAndUpdate(req.params.id, req.body.producto, {new: true});
            if (!actualiid) {
                return res.status(404);            
            }
            res.status(200).send(actualiid);
        } else{
            res.status(404).end();
        }   
    } catch (err) {
        res.status(500).send(err);
    }
});

router.delete('/elimina/:nombre/:clave/:id', async (req, res) => {
    try {
        let usconnombre = await Usuario.findOne({"nombre": req.params.nombre});
        if (usconnombre.clave === req.params.clave) {
            let borraid = await Producto.findByIdAndDelete(req.params.id);
            if (!borraid) {
                return res.status(404);            
            }
            res.status(200).send(borraid);
        } else {
            return res.status(404).end(); 
        }
    }
    catch(err) {
        res.status(500).send(err);
    }
});

router.get('/consulta/categoria/:categoria', async (req, res) => {
    try {
        const listadocate = await Producto.find({"categoria": req.params.categoria});
        if (!listadocate) {
            return res.status(404);            
        }
        res.status(200).send(listadocate);
    }
    catch(err) {
        res.status(500).send(err);
    }
});

router.post('/nuevo', async (req, res) => {
    try {
        let usuarioad = await Usuario.findOne({"nombre": req.body.usuario.nombre})
        if (usuarioad.clave === req.body.usuario.clave){
            let newprod = new Producto(req.body.producto);
            await newprod.save();
            res.status(201).send(newprod);
        } else{
            res.status(404).end(); 
        }   
    } catch (err) {
        res.status(500).send(err);
    }
});


// async function createusuario() {
//     const usuarioprinc = new Usuario({
//         nombre: "admin",
//         clave: "admin123"
//     });
//     try {
//         await usuarioprinc.save();
//     } catch (err) {
//         console.log(err);
//     }
// };

//createusuario();

module.exports = router;
