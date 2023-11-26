const comment = require("../models/comment.model");

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
    const data = req.body;
    const result = await comment.create({ data });
    return {
      status: 201,
      result,
    };
  } catch (e) {
    throw new Error(e);
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
