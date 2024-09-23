const { login, logout } = require("../Controller/AuthController");
const express = require("express");
const route = express.Router();

route.post("/login", login);
route.post("/logout", logout);

module.exports = route;
