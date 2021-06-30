'use strict';

require('@code-fellows/supergoose');

const foodModel = require('../src/models/food.js');
const clothesModel = require('../src/models/clothes.js');
const Collection = require('../src/models/data-collection-class.js');

const newFood = new Collection(foodModel);
const newClothes = new Collection(clothesModel);

const server = require('../src/server.js')
const supertest = require('supertest');
const { find } = require('../src/models/food.js');
const fakeServer = supertest(server.app);

// const mockingPort = supertest(server.start(5050))


// describe('TEST listening to the PORT', () => {
//     it('should listen to the port', async() => {
//         let result = await mockingPort
//         expect(result).toEqual('Listening on 5050');
//     });
// });





describe('TEST NotFound and Bad Method for food', () => {
    it('Bad Method for Food Routes', async() => {
        let result = await fakeServer.post('/food/:id');
        expect(result.status).toEqual(404);
    });


    it('Bad Route for Food Routes', async() => {
        let result = await fakeServer.post('/notFood')
        expect(result.status).toEqual(404);
    });

    it('Check Create method DATA (FOOD)', async() => {
        let obj = { name: "potato", price: 20, availability: true }
        let result = await newFood.create(obj);
        Object.keys(obj).forEach(key => {
            expect(result[key]).toEqual(obj[key]);
        });

    });

    it('Check Post route status (FOOD)', async() => {
        let obj = { name: "potato", price: 20, availability: true }
        let postRout = await fakeServer.post('/food').send(obj);
        expect(postRout.status).toEqual(201);
    });

    it('Check GET method to read all for FOOD', async() => {
        let obj = { name: "potato", price: 20, availability: true }
        let postRout = await fakeServer.post('/food').send(obj);

        let result = await newFood.get()
        expect(result.length).toEqual(3);
    });

    it('Check GET method for reading single value data and status (FOOD)', async() => {
        let obj = { name: "potato", price: 20, availability: true }
        let postRout = await fakeServer.post('/food').send(obj)
        let getRout = await fakeServer.get('/food');
        let findId = getRout.body[0]._id

        let getSingleValueRout = await fakeServer.get(`/food/${findId}`);

        let finalResult = await newFood.get(String(findId));

        expect(finalResult.length).toEqual(1);
        expect(finalResult[0].name).toEqual("potato");
        expect(getRout.status).toEqual(200);
        expect(getSingleValueRout.status).toEqual(200);
    });


    it("Check PUT method and Route ---> data and status (FOOD)", async() => {
        let getRout = await fakeServer.get('/food');
        let findId = getRout.body[0]._id
        let PutRout = await fakeServer.put(`/food/${findId}`);
        let obj = { name: "Banana", price: 20, availability: true }
        let result = await newFood.update(findId, obj);


        expect(result.name).toEqual("Banana");
        expect(PutRout.status).toEqual(200);
    });

    it('Check DELETE method and Route ---> status and Data (FOOD)', async() => {
        let getRout = await fakeServer.get('/food');
        let findId = getRout.body[0]._id
        let deleteRout = await fakeServer.delete(`/food/${findId}`);

        let result = await newFood.delete(findId);
        expect(result).toEqual(null)
        expect(deleteRout.status).toEqual(202);
    });

});





describe('TEST NotFound and Bad Method for clothes', () => {
    it('Bad Method for Food Routes', async() => {
        let result = await fakeServer.post('/clothes/:id');
        expect(result.status).toEqual(404);
    });


    it('Bad Route for Food Routes', async() => {
        let result = await fakeServer.post('/notClothes')
        expect(result.status).toEqual(404);
    });



    it('Check Create method DATA (clothes)', async() => {
        let obj = { name: "T-shirt", price: '20', availability: true }
        let result = await newClothes.create(obj);
        Object.keys(obj).forEach(key => {
            expect(result[key]).toEqual(obj[key]);
        });

    });

    it('Check Post route status (clothes)', async() => {
        let obj = { name: "T-shirt", price: 20, availability: true }
        let postRout = await fakeServer.post('/clothes').send(obj);
        expect(postRout.status).toEqual(201);
    });

    it('Check GET method to read all for CLOTHES', async() => {
        let obj = { name: "T-shirt", price: 20, availability: true }
        let postRout = await fakeServer.post('/clothes').send(obj);

        let result = await newClothes.get()
        expect(result.length).toEqual(3);
    });

    it('Check GET method for reading single value data and status (clothes)', async() => {
        let obj = { name: "T-shirt", price: 20, availability: true }
        let postRout = await fakeServer.post('/clothes').send(obj)
        let getRout = await fakeServer.get(`/clothes`);
        let findId = getRout.body[0]._id

        let getSingleValueRout = await fakeServer.get(`/clothes/${findId}`);

        let finalResult = await newClothes.get(String(findId));

        expect(finalResult.length).toEqual(1);
        expect(finalResult[0].name).toEqual("T-shirt");
        expect(getRout.status).toEqual(200);
        expect(getSingleValueRout.status).toEqual(200)
    });


    it("Check PUT Method and Route ---> data and status (clothes)", async() => {
        let getRout = await fakeServer.get('/clothes');
        let findId = getRout.body[0]._id
        let PutRout = await fakeServer.put(`/clothes/${findId}`);
        let obj = { name: "Pair of Pants", price: 20, availability: true }
        let result = await newClothes.update(findId, obj);


        expect(result.name).toEqual("Pair of Pants");
        expect(PutRout.status).toEqual(200);
    });

    it('Check DELETE Method and Route ---> status and Data (clothes)', async() => {
        let getRout = await fakeServer.get('/clothes');
        let findId = getRout.body[0]._id
        let deleteRout = await fakeServer.delete(`/clothes/${findId}`);

        let result = await newClothes.delete(findId);
        expect(result).toEqual(null)
        expect(deleteRout.status).toEqual(202);
    });

});