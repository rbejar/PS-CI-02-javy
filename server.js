const app = require('./app')

const PORT = process.env.PORT || 8082;
server = app.listen(PORT, () => {
  console.log(`Servidor web en el puerto ${PORT}.`);
});

server.closeAll = () => {
  app.con.end()  // Cierra conexión de BD
  server.close()  // Cierra servidor web
}

module.exports = server
