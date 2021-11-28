const router = require('express').Router()

const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controller/thought-controller')

router
.route('/')
.get(getAllThoughts)

router
.route('/:userId')
.post(addThought)

router
.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

router
.route('/:thoughtId/reactions')
.put(addReaction)

router
.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction)

module.exports = router