//importacion del paquete pg, desarrollar la funcion insertar
const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "postgres",
    database: "gym",
    port: 5432,
});

//funcion asincrona que nos permita crear nuevos registros
const insertar = async (datos) => {
    const consulta = {
        text: "INSERT INTO ejercicios values($1, $2, $3, $4) RETURNING *",
        values: datos,
        rowMode:"array" //que retorne el ultimo registro ingresado como arreglo
    }
    try {
        const result = await pool.query(consulta)
        console.log(result.rows[0])//que funcione rowMode
        return result
    } catch (error) {
        console.log(error.code)
    }
};

//funcion asincrona para consultar los registros que existen en consulta.js
const consultar = async () => {
    try {
        const result = await pool.query("SELECT * FROM ejercicios")
        return result
    } catch (error) {
        console.log(error.code)
        return error
    }
}

//funcion asincrona para editar los registros
const editar = async (datos) => {
    const consulta = {
        text: `UPDATE ejercicios SET
        nombre=$1,
        series=$2,
        repeticiones=$3,
        descanso=$4
        WHERE nombre=$1 RETURNING *`,
        values: datos
    }
    try {
        const result = await pool.query(consulta) 
        console.log(result)
        return result
    } catch(error) {
        console.log(error.code)
        return error
    }
}

//funcion asincrona para eliminar un registro
const eliminar = async (nombre) => {
    try {
        const result = await pool.query(`DELETE FROM ejercicios WHERE nombre='${nombre}'`)
        return result
    } catch (error) {
        console.log(error.code)
        return error
    }
}

module.exports = { insertar, consultar, editar, eliminar };

