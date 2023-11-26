const comentario = require("../models/comentarios");

export const getComentarios = async (req, res) => {
  try {
    const result = await comentario.findAll();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
export const createComentario = async (req, res) => {
  try {
    const data = req.body;
    const result = await comentario.create({ data });
    return {
      status: 201,
      result,
    };
  } catch (e) {
    throw new Error(e);
  }
};
export const editComentario = async (req, res) => {
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
};
export const deleteComentario = async (req, res) => {
  try {
    const { id } = req.params;
    await comentario.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {}
  throw new Error(e);
};
