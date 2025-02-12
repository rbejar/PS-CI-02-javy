const app = require("./app")
const server = require("./server")
const supertest = require("supertest")
const mysql = require('mysql')

const request = supertest(app)

describe("Tests BD", () => {
  beforeAll(() => {
    var sql = "DROP TABLE IF EXISTS personas; CREATE TABLE personas (name VARCHAR(255), surname VARCHAR(255));" +
              "INSERT INTO personas(name, surname) VALUES ('Amanda', 'Atkinson');"
    app.con.query(sql, (err, result) => {      
      if (err) throw err;
    })
  })

  it("Responde en /personas con la persona de prueba que acabamos de insertar en la BD", async () => {
    const response = await request.get("/personas")
    expect(response.status).toBe(200)                  
    expect(response.body.message).toContainEqual({"name" : "Amanda", "surname" : "Atkinson"})       
  }) 
})


afterAll(() => {        
  server.closeAll()  
});

