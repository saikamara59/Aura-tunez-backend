const path = require('path');
const Song = require('../models/song');
const router = express.router();
const express = require('express');

// Create a song


exports.createSong = async (req, res) => {
    const { title, artist, genre, releaseDate } = req.body;
    let image = '';

    if (req.file) {
        image = path.join('uploads', req.file.filename);
    }

    try {
        const song = new Song({
            title,
            artist,
            genre,
            releaseDate,
            image
        });
        await song.save();
        res.status(201).json(song);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

    // router.post('/', async (req, res) => {
    //     try {
    //         const createdSong = await Song.create(req.body);
    //         res.status(201).json(createdSong);
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({ error: error.message})
    //     }
    //     });



exports.getSongs = async (req, res) => {
    try {
        const songs = await Song.find().populate('artist', 'name')
        res.json(songs);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

// router.get('/',async (req,res)=>{
//     try {
//         const getAllSongs = await Song.find();
//     } catch (error) {
//         console.log(error); 
//         res.status(500).json({error:error.message});
//     }
// })

exports.getSongById = async (req,res) => {
    try {
        const song = await Song.findById(req.params.id).populate('artist');
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.json(song);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};


// router.get('/:id', async (req,res) => {
//     try {
//         const song = await Song.findById(req.params.id);
//         if (!song) {
//             return res.status(404).json({ message: 'Song not found' });
//         }
//         res.json(song);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({error:error.message});
//     }
// });


// Delete a song
exports.deleteSong = async (req, res) => {
    try {
        const song = await Song.findByIdAndDelete(req.params.id);
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.json({ message: 'Song deleted successfully!' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

router.delete('/:id', async (req,res) => {
    try {
        const deletedSong = await Song.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'Song deleted successfully!'});
    } catch (error) {
        const deletedResponse = {error:error.message};
        if (res.status(404)) {
            return res.status(404).json(deletedResponse);
        }
        res.status(500).json(deletedResponse);
    }
})

// // Update a song
exports.updateSong = async (req, res) => {
    const { title, artist, genre, releaseDate } = req.body;
    let image = null;

    if (req.file) {
        image = path.join('uploads', req.file.filename);
    }

    try {
        const song = await Song.findByIdAndUpdate(
            req.params.id,
            { title, artist, genre, releaseDate, image },
            { new: true } // return the updated document
        );

        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }

        res.json(song);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

// router.put('/:id', async (req,res) => {
//     try {
//         const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body,
//              {new:true}
//             );
//     if (!updatedSong) {
//        res.status(404);
//     }
//     res.status(200).json(updatedSong);
// } catch (error) {
//     console.log(error);
//     if(res.statusCode === 404) {
//     } else {
//         res.status(500).json({error:error.message});
//     }
// }
// });


// module.exports = router;