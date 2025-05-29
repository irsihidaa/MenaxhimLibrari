const express = require("express");
const router = express.Router();

const {getBooks, setBooks, updateBooks, deleteBooks} = require("../controllers/bookController");
const {protect} = require('../middleware/authMiddleware');

router.get('/', protect, getBooks);
router.post('/', protect, setBooks);
router.put('/:id', protect, updateBooks);
router.delete('/:id', protect, deleteBooks);

module.exports = router;