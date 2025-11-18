const express = require('express');
const route = express.Router();
const { Absensi, Kejuruan } = require('../models');

// GET ALL
route.get('/', async (req, res) => {
    try {
        const data = await Absensi.findAll({
            include: [
                {
                    model: Kejuruan,
                    as: 'kejuruan'
                }
            ]
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Gagal mendapatkan data Absensi' });
    }
});

// GET BY ID
route.get('/:id', async (req, res) => {
    try {
        const data = await Absensi.findByPk(req.params.id, {
            include: [
                {
                    model: Kejuruan,
                    as: 'kejuruan'
                }
            ]
        });

        if (data) res.json(data);
        else res.status(404).json({ message: 'Data Absensi tidak ditemukan' });

    } catch (error) {
        res.status(500).json({ error: 'Gagal mendapatkan data Absensi' });
    }
});

// CREATE
route.post('/', async (req, res) => {
    try {
        const newData = await Absensi.create(req.body);
        res.status(201).json(newData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE
route.put('/:id', async (req, res) => {
    try {
        const [updated] = await Absensi.update(req.body, {
            where: { id: req.params.id }
        });

        if (updated) {
            const data = await Absensi.findByPk(req.params.id, {
                include: [{
                    model: Kejuruan,
                    as: 'kejuruan'
                }]
            });
            res.json(data);
        } else {
            res.status(404).json({ message: 'Data Absensi tidak ditemukan' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE
route.delete('/:id', async (req, res) => {
    try {
        const deleted = await Absensi.destroy({
            where: { id: req.params.id }
        });

        if (deleted) res.status(204).send();
        else res.status(404).json({ message: 'Data Absensi tidak ditemukan' });

    } catch (error) {
        res.status(500).json({ error: 'Gagal menghapus data Absensi' });
    }
});

module.exports = route;
