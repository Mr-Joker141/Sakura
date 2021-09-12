import bcrypt from 'bcryptjs';

const data = {
    users:[
        {
            name:'Methmi',
            email:'methmi12@gmail.com',
            password:bcrypt.hashSync('1234', 8),
            isAdmin:true,
        },
        {
            name:'John',
            email:'john@gmail.com',
            password:bcrypt.hashSync('1234', 8),
            isAdmin:false,
        },

    ],
    products:[
        {
            
            name:'Nexpro tablets',
            category:'Drugs',
            image:'https://cdn.shopify.com/s/files/1/0368/8785/5243/products/64054_039ec651-fc21-4196-8d0b-fd2b0c73e5e4.png?v=1617173844',
            price:180,
            countInStock:0,
            brand:'Nexpro',
            rating:4.5,
            numReviews:10,
            description:'most recommended brand'
        },
        {
            
            name:'Glucophage tablets',
            category:'Drugs',
            image:'https://onlinepharmacy.lk/wp-content/uploads/2021/07/OIP-73.jpg',
            price:80,
            countInStock:10,
            brand:'Nexpro',
            rating:4.5,
            numReviews:10,
            description:'most recommended brand'
        },
        {
            
            name:'Dettol plasters',
            category:'Plasters',
            image:'https://athalangata.lk/assets/uploads/46a512950c4e5e05d6609d1a60c7f7af.png',
            price:50,
            countInStock:10,
            brand:'Dettol',
            rating:4.8,
            numReviews:19,
            description:'most recommended brand'
        },
        {
            
            name:'Cotton wools',
            category:'FirstAid',
            image:'https://cdn.shopify.com/s/files/1/0368/8785/5243/products/64054_039ec651-fc21-4196-8d0b-fd2b0c73e5e4.png?v=1617173844',
            price:70,
            countInStock:10,
            brand:'Med-ted',
            rating:5.0,
            numReviews:10,
            description:'most quality brand'
        },
        {
            
            name:'Fucidin oilments',
            category:'Oilment',
            image:'https://iprema.shop/wp-content/uploads/2020/11/31835-x1iosz.jpg',
            price:100,
           countInStock:10,
            brand:'Fucidin',
            rating:9.5,
            numReviews:60,
            description:'most recommended brand'
        },
        {
            
            name:'Piriton tablets',
            category:'Drugs',
            image:'https://www.rockethealth.shop/wp-content/uploads/2020/12/piriton-tabs.jpg',
            price:80,
            countInStock:5,
            brand:'Piriton',
            rating:4.5,
            numReviews:10,
            description:'best brand'
        }
    ],
};

export default data;