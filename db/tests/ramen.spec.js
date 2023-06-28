require("dotenv").config();

const { createRamen, getAllRamen, getRamenById } = require("../index");
const { handle } = require("../../index");
const client = require("../client");

let ramenFromDatabase;
const getRamenFromDB = async () => {
  const { rows } = await client.query(`
      SELECT * FROM ramen;
  `);
  ramenFromDatabase = rows;
};

describe("Ramen Table", () => {
  beforeAll(async () => {
    await getRamenFromDB();
  });
  afterAll(async () => {
    await client.end();
    handle.close();
  });

  describe("getAllRamen", () => {
    it("returns an array of all ramen", async () => {
      const ramen = await getAllRamen();
      expect(ramen).toEqual(ramenFromDatabase);
    });
  });

  describe("getRamenById", () => {
    it("gets ramen by it's correct id", async () => {
      const fakeRamen = createRamen({
        name: "Cup or Noodles",
        price: "0.99",
        brand: "Fake noodle brand",
      });
      
      const ramen = await getRamenById(fakeRamen.id);
      console.log(ramenFromDatabase)
      expect(ramen.id).toEqual(fakeRamen.id);
      expect(ramen.name).toEqual(fakeRamen.name);
      expect(ramen.price).toEqual(fakeRamen.price);
      expect(ramen.brand).toEqual(fakeRamen.fakeRamen);
    });
  });


});
