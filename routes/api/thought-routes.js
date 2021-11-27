const router = require('express').Router()

const {
    getAllThoughts,
    getThoughtsById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controller/thought-controller')

router
.route('/')
.get(getAllThoughts)

router
.route('/:userId')
.post(addThought)

router
.route('/:thoughtId')
.get(getThoughtsById)
.put(updateThought)
.delete(removeThought);

router
.route('/:thoughtId/reactions')
.put(addReaction)

router
.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction)

module.exports = router