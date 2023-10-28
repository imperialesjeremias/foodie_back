const Restaurant = require('../models/restaurant');

const restaurantController = {
    getAll: async (req, res) => {
        try {
            const restaurant = await Restaurant.findAll();
            res.status(200).json({
                message: 'Lista de restaurantes',
                data: restaurant
            })
        } catch (error) {
            res.status(400).json({
                message: 'Error al obtener la lista de restaurantes',
                data: error
            })
        }
    },
    getById: async (req, res) => {
        try {
            // obetener restaurant por id
            const restaurantId = req.params.id;
            const restaurant = await Restaurant.findByPk(restaurantId);
            !restaurant && res.status(404).json({ message: 'Restaurante encontrado' });
            res.status(200).json({
                message: 'Restaurante',
                data: restaurant
            });
        } catch (error) {
            res.status(400).json({
                message: 'Error al obtener el restaurante',
                data: error
            })
        }
    },
    // obtener platos del restaurante relacionado 
    getPlatos: async (req, res) => {
        try {
            const restaurantId = req.params.id;
            const restaurant = await Restaurant.findByPk(restaurantId, { include: ['platos'] });
            !restaurant && res.status(404).json({ message: 'Plato de restaurantes encontrados' });
            res.status(200).json({
                message: 'Platos del restaurante',
                data: restaurant
            });
        } catch (error) {
            res.status(400).json({
                message: 'Error al obtener los platos del restaurante',
                data: error
            })
        }
    }
}

module.exports = restaurantController;