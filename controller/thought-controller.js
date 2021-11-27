const { Thought, User } = require('../models')

const thoughtController = {
    addComment({ params, body }, res ) {
        console.log(params);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.pizzaId },
                    { $push: { comments: _id } },
                    { new: true }
                )
            })
            .then(dbUserData => {
                console.log(dbUserData)
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!'})
                    return
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err))
    },

    addReaction({ params, body }, res ) {
        Thought.find
    }
}