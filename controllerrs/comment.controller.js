const Comment = require('../models/comment.model');

const commentController = {
getComentarios: async (req, res) => {
  try {
    const result = await comment.findAll();
    return result;
  } catch (error) {
    throw new Error(error);
  }
},
createComentario: async (req, res) => {
  try {
    console.log(req.body);
    const { id, description, restaurantId } = req.body;
    console.log(id, description, restaurantId);

    if (!id || !description || !restaurantId) {
      return res.status(400).json({
        status: 400,
        message: "Missing information",
      });
    }

    const comment = await Comment.create({
      usuarioId: id,
      description: description,
      restaurantId: restaurantId
    });

    return res.status(201).json({
      comment: comment,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
},
editComentario: async (req, res) => {
  try {
    const { id } = req.params;
    const { usuarioId, description } = req.body;
    const newComment = await User.update(
      { usuarioId: usuarioId },
      { description: description },
      {
        where: {
          id: id,
        },
      }
    );
    return {
      status: 200,
      newComment,
    };
  } catch (error) {
    throw new Error(e);
  }
},
deleteComentario: async (req, res) => {
  try {
    const { id } = req.params;
    await comment.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {}
  throw new Error(e);
},
}

module.exports = commentController;
