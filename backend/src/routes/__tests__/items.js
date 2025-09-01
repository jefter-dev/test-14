const request = require("supertest");
const express = require("express");
const itemsRouter = require("../items");
const path = require("path");
const mockItems = require("../mock-items");
const fs = require("fs").promises;

const mockDataPath = path.join(__dirname, "../../../../data/items.json");

const app = express();
app.use(express.json());
app.use("/api/items", itemsRouter);

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

describe("Items API - Happy Path", () => {
  beforeEach(async () => {
    await fs.writeFile(mockDataPath, JSON.stringify(mockItems, null, 2));
  });

  afterAll(async () => {
    await fs.writeFile(mockDataPath, JSON.stringify([], null, 2));
  });

  test("GET /api/items should return all items with default pagination", async () => {
    const res = await request(app).get("/api/items");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      page: 1,
      limit: 20,
      totalItems: mockItems.length,
      totalPages: 1,
      items: mockItems,
    });
  });

  test('GET /api/items with "q" query should filter items', async () => {
    const res = await request(app).get("/api/items?q=Desk");
    expect(res.statusCode).toEqual(200);
    expect(res.body.items.length).toEqual(1);
    expect(res.body.items).toEqual([mockItems[4]]);
  });

  test('GET /api/items with "limit" query should limit the number of items', async () => {
    const res = await request(app).get("/api/items?limit=2");
    expect(res.statusCode).toEqual(200);
    expect(res.body.items.length).toEqual(2);
    expect(res.body.items).toEqual([mockItems[0], mockItems[1]]);
    expect(res.body.page).toEqual(1);
    expect(res.body.totalItems).toEqual(mockItems.length);
    expect(res.body.totalPages).toEqual(3);
  });

  test('GET /api/items with "q" and "limit" queries should filter and limit', async () => {
    const res = await request(app).get("/api/items?q=Chair&limit=1");
    expect(res.statusCode).toEqual(200);
    expect(res.body.items.length).toEqual(1);
    expect(res.body.items).toEqual([mockItems[3]]);
  });

  test("GET /api/items/:id should return a specific item", async () => {
    const res = await request(app).get("/api/items/2");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockItems[1]);
  });

  test("POST /api/items should create a new item", async () => {
    const newItem = {
      name: "Smartphone X",
      category: "Electronics",
      price: 1299,
      image: "",
    };
    const res = await request(app).post("/api/items").send(newItem);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toEqual(newItem.name);
    expect(res.body.price).toEqual(newItem.price);

    const data = await fs.readFile(mockDataPath, "utf-8");
    const items = JSON.parse(data);
    expect(items.length).toEqual(mockItems.length + 1);
    expect(items).toContainEqual(expect.objectContaining(newItem));
  });
});

describe("Items API - Error Cases", () => {
  beforeEach(async () => {
    await fs.writeFile(mockDataPath, JSON.stringify(mockItems, null, 2));
  });

  test("GET /api/items/:id with a non-existent ID should return 404", async () => {
    const res = await request(app).get("/api/items/999");
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual("Item not found");
  });

  test("GET /api/items with a corrupted data file should return 500", async () => {
    await fs.writeFile(mockDataPath, '{ "malformed": "json"');

    const res = await request(app).get("/api/items");
    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual("Internal Server Error");
  });

  test("POST /api/items with a file write failure should return 500", async () => {
    jest
      .spyOn(fs, "writeFile")
      .mockRejectedValueOnce(new Error("File write failure"));

    const newItem = { name: "Item com problema", price: 60 };
    const res = await request(app).post("/api/items").send(newItem);

    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual("File write failure");

    jest.restoreAllMocks();
  });
});
