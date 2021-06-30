'use strict';

const supergoose = require('@code-fellows/supergoose');
const { app } = require('../src/server');
const mockRequest = supergoose(app);

const foodModel = require('../src/models/food.js');
const clothesModel = require('../src/models/clothes.js');
const Collection = require('../src/models/data-collection-class.js');

const newFood = new Collection(foodModel);
const newClothes = new Collection(clothesModel);

// const server = require('../src/server.js')
// const supertest = require('supertest');
// const { find } = require('../src/models/food.js');
// const mockRequest = supertest(server.app);

describe('TEST NotFound and Bad Method for food', () => {
  it('Bad Method for Food Routes', async () => {
    let result = await mockRequest.post('/food/:id');
    expect(result.status).toEqual(404);
  });

  it('Bad Route for Food Routes', async () => {
    let result = await mockRequest.post('/notFood');
    expect(result.status).toEqual(404);
  });

  it('Check Create method DATA (FOOD)', async () => {
    let obj = { name: 'potato', catugary: 'veg', availability: true };

    const res = await mockRequest.post('/api/v1/food').send(obj);
    expect(res.body.name).toBe(obj.name);
    expect(res.body.catugary).toBe(obj.catugary);
  });

  it('Check Post route status (FOOD)', async () => {
    let obj = { name: 'potato', catugary: 'veg', availability: true };
    let postRout = await mockRequest.get('/api/v1/food').send(obj);
    expect(postRout.status).toEqual(200);
  });
});
it('Check DELETE method and Route ---> status and Data (FOOD)', async () => {
  let getRout = await mockRequest.get('/api/v1/food');
  let findId = getRout.body[0]._id;
  let deleteRout = await mockRequest.delete(`/api/v1/food/${findId}`);

  let result = await newFood.delete(findId);
  expect(result).toEqual(null);
  expect(deleteRout.status).toEqual(202);
});

    it('Check GET method for reading single value data and status (FOOD)', async() => {
        let obj = { name: 'potato', catugary: 'veg', availability: true };

        let postRout = await mockRequest.post('/api/v1/food').send(obj)
        let getRout = await mockRequest.get('/api/v1/food');
        let findId = getRout.body[0]._id

        let getSingleValueRout = await mockRequest.get(`/api/v1/food/${findId}`);

        let finalResult = await newFood.get(String(findId));

        // expect(finalResult.length).toEqual(1);
        // expect(finalResult[0].name).toEqual("potato");
        expect(getRout.status).toEqual(200);
        expect(getSingleValueRout.status).toEqual(200);
    });

    it("Check PUT method and Route ---> data and status (FOOD)", async() => {
        let getRout = await mockRequest.get('/api/v1/food');
        let findId = getRout.body[0]._id
        let PutRout = await mockRequest.put(`/api/v1/food/${findId}`);
        let obj = { name: 'potato', catugary: 'veg', availability: true };
        let result = await newFood.update(findId, obj);

        expect(result.name).toEqual("potato");
        expect(PutRout.status).toEqual(200);
    });

    it('Check DELETE method and Route ---> status and Data (FOOD)', async() => {
        let getRout = await mockRequest.get('/api/v1/food');
        let findId = getRout.body[0]._id
        let deleteRout = await mockRequest.delete(`/api/v1/food/${findId}`);

        let result = await newFood.delete(findId);
        expect(result).toEqual(null)
        expect(deleteRout.status).toEqual(202);
    });



describe('TEST NotFound and Bad Method for clothes', () => {
  it('Bad Method for Food Routes', async () => {
    let result = await mockRequest.post('/clothes/:id');
    expect(result.status).toEqual(404);
  });

  it('Bad Route for Food Routes', async () => {
    let result = await mockRequest.post('/notClothes');
    expect(result.status).toEqual(404);
  });





























  it('Check Create method DATA (clothes)', async () => {
    let obj = { name: 'T-shirt', catugary: 'blue', availability: true };
    const res = await mockRequest.post('/api/v1/clothes').send(obj);
    expect(res.body.name).toBe(obj.name);
    expect(res.body.catugary).toBe(obj.catugary);
    });
  });


      it('Check Post route status (clothes)', async() => {
        let obj = { name: 'T-shirt', catugary: 'blue', availability: true };

          let postRout = await mockRequest.post('/api/v1/clothes').send(obj);
          expect(postRout.status).toEqual(200);
      });

      it('Check GET method to read all for CLOTHES', async() => {
        let obj = { name: 'T-shirt', catugary: 'blue', availability: true };

          let postRout = await mockRequest.post('/api/v1/clothes').send(obj);

          let result = await newClothes.get()
          expect(result.length).toEqual(3);
      });

      it('Check GET method for reading single value data and status (clothes)', async() => {
        let obj = { name: 'T-shirt', catugary: 'blue', availability: true };
          let postRout = await mockRequest.post('/api/v1/clothes').send(obj)
          let getRout = await mockRequest.get(`/api/v1/clothes`);
          let findId = getRout.body[0]._id

          let getSingleValueRout = await mockRequest.get(`/api/v1/clothes/${findId}`);

          let finalResult = await newClothes.get(String(findId));

        //   expect(finalResult.length).toEqual(1);
        //   expect(finalResult[0].name).toEqual("T-shirt");
          expect(getRout.status).toEqual(200);
          expect(getSingleValueRout.status).toEqual(200)
      });

      it("Check PUT Method and Route ---> data and status (clothes)", async() => {
          let getRout = await mockRequest.get('/api/v1/clothes');
          let findId = getRout.body[0]._id
          let PutRout = await mockRequest.put(`/api/v1/clothes/${findId}`);
          let obj = { name: 'Pair of Pants', catugary: 'blue', availability: true };
          let result = await newClothes.update(findId, obj);

          expect(result.name).toEqual("Pair of Pants");
          expect(PutRout.status).toEqual(200);
      });

      it('Check DELETE Method and Route ---> status and Data (clothes)', async() => {
          let getRout = await mockRequest.get('/api/v1/clothes');
          let findId = getRout.body[0]._id
          let deleteRout = await mockRequest.delete(`/api/v1/clothes/${findId}`);

          let result = await newClothes.delete(findId);
          expect(result).toEqual(null)
          expect(deleteRout.status).toEqual(202);
      });

