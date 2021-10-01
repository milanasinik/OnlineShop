import bcrypt from 'bcryptjs';
const data = {
    users: [
        {
            name: 'Milana',
            email: 'milana@uns.ac.rs',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            name: 'Milan',
            email: 'milan@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        },

    ],
    products: [
        {
            name: 'Sun-Moon Hemp Pack',
            category: 'Mini Packs',
            image: '/images/product_1.jpg',
            price: 3900,
            countInStock: 10,
            rating: 4.5,
            numReviews: 10,
            description: 'High quality, handmade in Nepal, mini hemp pack'
        },
        {
            name: 'Half Moon Hemp Pack',
            category: 'Baby Packs',
            image: '/images/product_1.jpg',
            price: 4000,
            countInStock: 9,
            rating: 4,
            numReviews: 10,
            description: 'High quality, handmade in Nepal, mini hemp pack'
        }
    ],
};
export default data;