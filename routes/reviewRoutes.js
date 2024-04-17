const express = require('express');
const router = express.Router();
const Proposal = require('../models/Proposal');
const Review = require('../models/Review');

// Endpoint untuk dosen menerima proposal berdasarkan proposal_id
router.post('/review/:username/:proposal_id', async (req, res) => {
    try {
        const { username, proposal_id } = req.params;

        // Temukan proposal dari database "proposals" berdasarkan proposal_id
        const proposal = await Proposal.findById(proposal_id);
        if (!proposal) {
            return res.status(404).json({ message: 'Proposal not found' });
        }

        // Simpan proposal ke dalam koleksi "review" dengan mengaitkannya dengan username dosen
        const review = new Review({
            username,
            proposal
        });
        await review.save();

        res.status(200).json({ message: 'Proposal received for review successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Endpoint untuk mendapatkan daftar proposal yang harus direview oleh seorang dosen
// router.get('/review/:username', async (req, res) => {
//     try {
//         const { username } = req.params;

//         // Temukan semua proposal yang harus direview oleh dosen dengan username tertentu
//         const reviews = await Review.find({ username });

//         res.status(200).json(reviews);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

router.get('/:username', async (req, res) => {
    try {
        const { username } = req.params;
        
        // Temukan proposal yang dikirimkan ke dosen berdasarkan username
        const proposals = await Review.find({ username: username });

        res.status(200).json(proposals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
