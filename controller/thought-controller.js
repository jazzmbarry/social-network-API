const { Thought, User } = require('../models');

const thoughtController = {
    //get all thoughts
    getAllThoughts(req, res) {

        const testObject = {}

        Thought.find(testObject)
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //get thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },

    //add a thought to user
    addThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true, addValidators: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // add a reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    //Update thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            body,
            { new: true, runValidators: true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'no user thought with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    //Delete Thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought with this id!' });
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'Thought has been deleted!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // Delete reaction
    deleteReaction({ params }, res) {
      console.log( params )
      Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reactions: { reactionId: params.reactionId } } },
          { new: true }
      )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  }
}

module.exports = thoughtController;