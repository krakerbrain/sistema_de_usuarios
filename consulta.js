const PoolSingleton = require("./poolbd");

const pool = PoolSingleton.getInstance();

const creaUsuario = async (usuario) => {
  const values = Object.values(usuario);

  const consulta = {
    text: "INSERT INTO usuarios values ($1,$2) RETURNING *;",
    values,
  };
  try {
    const result = await pool.query(consulta);
    return result;
  } catch (e) {
    return e;
  }
};
const getUsuarios = async () => {
  try {
    const consulta = "SELECT * FROM usuarios";
    const result = await pool.query(consulta);
    return result;
  } catch (e) {
    return e;
  }
};

const validar = async (usuario) => {
  const values = Object.values(usuario);

  const consulta = {
    text: "SELECT * FROM usuarios WHERE email = $1 AND password = $2;",
    values: values,
  };

  try {
    const result = await pool.query(consulta);
    return result;
  } catch (e) {
    return e;
  }
};

module.exports = { creaUsuario, getUsuarios, validar };
