const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

    test("GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto", async () => {
        const response = await request(server).get("/cafes");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("DELETE /cafes/:id devuelve un código 404 al intentar eliminar un café con un id que no existe", async () => {
        const nonExistentId = 999;
        const response = await request(server).delete(`/cafes/${nonExistentId}`).set('Authorization', 'Bearer token');
        expect(response.status).toBe(404);
    });

    test("POST /cafes agrega un nuevo café y devuelve un código 201", async () => {
        const newCafe = {
            id: 5,
            nombre: "Latte"
        };
        const response = await request(server).post("/cafes").send(newCafe);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining(newCafe)]));
    });

    test("PUT /cafes/:id devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload", async () => {
        const updatedCafe = {
            id: 6,
            nombre: "Flat White"
        };
        const response = await request(server).put("/cafes/1").send(updatedCafe);
        expect(response.status).toBe(400);
    });

});