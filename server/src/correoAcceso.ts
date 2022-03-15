var email = require("emailjs/email");
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

module.exports = (formulario: any) => {
	const token: string = jwt.sign(formulario.correo, process.env.TOKEN_SECRET || 'prueba');
	var server = email.server.connect({
		user: "axldorian3@yandex.com",
		password: "knsthandimulsyyn",
		host: "smtp.yandex.com",
		ssl: true,
		port: 465
	});
	var message: any = {};
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
	server.send(message, function (err: any, message: any) { 
		console.log(1);
		console.log(err);
	});
}