# 🧪 Tests - Items API

This document describes how to run automated tests for the **Items** API, which now supports **pagination**.

---

## ▶️ How to run the tests

1. Install dependencies:

```bash
npm install
```

2. Run all tests:

```bash
npm test
```

> Note: There is no need to start the server, as the tests use **Supertest** to test the routes directly.

---

## 📂 Test structure

```
/tests
 └── integration/
      └── items.test.js   # Items API tests
```

---

## ✅ Implemented test cases

### Happy Path

- **GET /api/items** → returns all items with pagination (`page`, `limit`, `totalItems`, `totalPages`, `items`).
- **GET /api/items?q=...** → filters items by name, returning paginated results.
- **GET /api/items?limit=...** → limits the number of items per page.
- **GET /api/items?page=...\&limit=...** → returns a specific page with a defined limit.
- **GET /api/items?q=...\&limit=...\&page=...** → combines name filter and pagination.
- **GET /api/items/\:id** → returns a specific item by `id`.
- **POST /api/items** → creates a new item and saves it in the JSON file.

### Error Cases

- **GET /api/items/\:id** with a non-existent ID → returns `404 Item not found`.
- **GET /api/items** with corrupted file → returns `500 Internal Server Error`.
- **POST /api/items** when a write error occurs → returns `500 Failed to write file`.

---

## 📌 Notes

- The tests use **JSON file mocks** (`items.json`) to ensure isolation and predictability.
- After execution, the file is restored to avoid affecting the application state.
- All listing responses include **pagination metadata**, making it easier for front-ends or other services to consume.
- **Supertest** allows testing routes without starting a real HTTP server.

---

## 🗂 Example response GET /api/items

```json
{
  "page": 2,
  "limit": 10,
  "totalItems": 35,
  "totalPages": 4,
  "items": [
    {
      "id": 11,
      "name": "Laptop Pro #11",
      "category": "Electronics",
      "price": 2599,
      "image": "https://cdn.ome.lt/_a08ItspuaWqbcQWxmD7QV2UKqY=/770x0/smart/uploads/conteudo/fotos/Blade_14.png"
    },
    ...
  ]
}
```
