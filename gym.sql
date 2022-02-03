CREATE DATABASE gym;
DROP DATABASE gym;
\c gym;

CREATE TABLE ejercicios(
    nombre VARCHAR(30),
    series VARCHAR(30),
    repeticiones VARCHAR(30),
    descanso VARCHAR(30)
);

--archivos que trabajan: index.html, gym.sql, index.js, consultas.js