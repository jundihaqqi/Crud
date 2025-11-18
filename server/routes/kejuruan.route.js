const express = require('express');
const route = express.Router();
const { Kejuruan, Absensi } = require('../models');

// GET ALL
route.get('/', async (req, res) => {
    try {
        const data = await Kejuruan.findAll({
            include: [{
                model: Absensi,
                as: 'absensi'
            }]
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Gagal mendapatkan data' });
    }
});

// GET BY ID
route.get('/:id', async (req, res) => {
    try {
        const data = await Kejuruan.findByPk(req.params.id, {
            include: [{
                model: Absensi,
                as: 'absensi'
            }]
        });

        if (data) res.json(data);
        else res.status(404).json({ message: 'Data not found' });

    } catch (error) {
        res.status(500).json({ error: 'Gagal Dpt Data' });
    }
});

// CREATE
route.post('/', async (req, res) => {
    try {
        const newData = await Kejuruan.create(req.body);
        res.status(201).json(newData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE
route.put("/:id", async (req, res) => {
    try {
        const [update] = await Kejuruan.update(req.body, {
            where: { id: req.params.id }
        });

        if (update) {
            const data = await Kejuruan.findByPk(req.params.id);
            res.json(data);
        } else {
            res.status(404).json({ error: 'Data Not Found!!!' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE
route.delete("/:id", async (req, res) => {
    try {
        const deleted = await Kejuruan.destroy({
            where: { id: req.params.id }
        });

        if (deleted) res.status(204).send();
        else res.status(404).json({ message: 'Data Not Found!!!' });

    } catch (error) {
        res.status(500).json({ error: 'Gagal Menghapus Data!!!' });
    }
});

module.exports = route;
