const http = require("http");
const fs = require("fs");
const { creaUsuario, getUsuarios, validar } = require("./consulta");

http
  .createServer(async (req, res) => {
    if (req.url == "/" && req.method == "GET") {
      fs.readFile("index.html", (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end();
        } else {
          res.setHeader("Content-type", "text/html");
          res.end(data);
        }
      });
    }

    if (req.url == "/usuario" && req.method == "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", async () => {
        try {
          const usuario = JSON.parse(body);
          const result = await creaUsuario(usuario);
          res.statusCode = 201;
          res.end(JSON.stringify(result));
        } catch (error) {
          res.statusCode = 400;
          res.end();
        }
      });
    }
    if (req.url == "/usuarios" && req.method === "GET") {
      try {
        const registros = await getUsuarios();
        res.writeHead(200, { "Content-Type": "application/json" });

        res.end(JSON.stringify(registros.rows));
      } catch (error) {
        console.log(error);
        res.statusCode = 500;
        res.end();
      }
    }

    if (req.url == "/login" && req.method == "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", async () => {
        const usuario = JSON.parse(body);
        const result = await validar(usuario);

        if (result.rowCount == 0) {
          res.writeHead(404, "Usuario No Existe");
          res.end();
        } else {
          res.statusCode = 201;
          res.end(JSON.stringify(result));
        }
      });
    }
  })
  .listen(3000, console.log("Servidor ON puerto 3000"));
