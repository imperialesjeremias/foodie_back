const Restaurant = require('../models/restaurant');
const UserRating = require('../models/userRating.model');

const restaurantController = {
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
    },
    // obtener calificaciones del restaurante relacionado
    addRating: async (req, res) => {
        try {
            console.log(req.body);
            const { id, restaurantId, rating } = req.body;
            // verifca si el usuario ya califico el restaurante
            const existingRating = await UserRating.findOne({
                where: {
                    userId: id,
                    restaurantId: restaurantId
                },
            });
            if (existingRating) return res.status(400).json({ message: 'El usuario ya califico el restaurante' });
            // crea la calificacion
            await UserRating.create({
                userId: id,
                restaurantId: restaurantId,
                rating: rating
            });
            // obtiene las calificaciones del restaurante
            const ratings = await UserRating.findAll({
                where: { restaurantId: restaurantId },
            });
            // variable para guardar los datos
            let ratingSum = 0;
            // recorremos las calificaciones y sumamos
            for (let i = 0; i < ratings.length; i++) {
                ratingSum += ratings[i].rating;
            }
            // calculamos el promedio
            const averageRating = ratingSum / ratings.length;
            // actualizamos el promedio en la tabla restaurant
            await Restaurant.update({ averageRating }, { where: { id: restaurantId } });
            res.status(201).json({ message: 'Calificacion creada' });
        } catch (error) {
            res.status(400).json({
                message: 'Error al crear la calificacion',
                data: error
            });
        }
    },
    // obtener calificaciones del restaurante relacionado
    getRating: async (req, res) => {
        const restaurantId = req.params.id;
        const averageRating = await Restaurant.findByPk(restaurantId, { attributes: ['averageRating'] });
        res.status(200).json({
            message: 'Calificaciones del restaurante',
            averageRating
        });
    },
    getBestRest: async (req, res) => {
        try {
            const topRest = await Restaurant.findAll({
                attributes: ['id', 'name', 'averageRating'],
                order: [['averageRating', 'DESC']],
                limit: 6,
            });
    
            if (topRest.length === 0) {
                return res.status(404).json({ message: 'No hay restaurantes top' });
            }
    
            console.log(topRest);  // Mover este console.log antes de la respuesta al cliente si es necesario
    
            res.status(200).json({
                message: 'Top 6 de restaurantes',
                data: topRest
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error al obtener el top 10 de restaurantes',
                data: error
            });
        }
    },
    getByCategory: async (req, res) => {
        try {
            const { category } = req.params;
            console.log(category)
            const restaurants = await Restaurant.findAll({
                where: { category: category },
                attributes: ['id', 'name', 'averageRating'],
            });
            res.status(200).json({
                message: 'Restaurantes por categoria',
                data: restaurants
            });
        } catch (error) {
            res.status(404).json({
                message: 'No hay restaurantes en esta categoria',
                data: error
            })
        }
    }
};
module.exports = restaurantController;