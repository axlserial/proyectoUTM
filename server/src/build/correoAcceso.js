"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var email = require("emailjs/email");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
module.exports = (formulario) => {
    const token = jsonwebtoken_1.default.sign(formulario.correo, process.env.TOKEN_SECRET || 'prueba');
    var server = email.server.connect({
        user: "axldorian3@yandex.com",
        password: "knsthandimulsyyn",
        host: "smtp.yandex.com",
        ssl: true,
        port: 465
    });
    var message = {};
    message =
        {
            from: "Desarrollo UTM <axldorian3@yandex.com>",
            to: formulario.correo,
            bcc: "",
            subject: "Cambio de contraseña",
            attachment: [
                {
                    data: `
					En la siguiente liga podrás cambiar tu contraseña:
					<a href="http://localhost:4200/recuperar/${token}" >ACEPTAR</a>
					<br><br>
					`,
                    alternative: true
                }
            ]
        };
    server.send(message, function (err, message) {
        console.log(1);
        console.log(err);
    });
};
