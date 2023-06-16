const express = require('express');

const {
	getAll,
	getById,
	addContact,
	deleteById,
	updateById,
	updateStatusContact 
} = require('../../controllers/contacts-controller');

const isValidId = require('../../helpers/IsValidID');

const {authenticate} = require('../../middlewars');

const router = express.Router()

router.get('/', authenticate, getAll)

router.get('/:id', authenticate, isValidId, getById)

router.post('/', authenticate, addContact)

router.delete('/:id', authenticate, isValidId, deleteById)

router.put('/:id', authenticate, isValidId, updateById)

router.patch('/:id/favorite', authenticate, isValidId, updateStatusContact)

module.exports = router;