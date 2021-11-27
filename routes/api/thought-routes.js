const router = require('express').Router()

const {
    addThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controller/thought-controller')

// /api/thoughts/<userId>
router.route('/:userId').post(addThought)

// /api/thoughts/<userId>/<thoughtId>
router
.route('/:userId/:thoughtId')
.put(addReaction)
.delete(removeThought);

// /api/thoughts/<userId>/<thoughtId>/<reactionId>
router.route('/:userId/:commentId/:replyId').delete(removeReaction)

module.exports = router