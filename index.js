import { createServer } from 'http'

import { Server } from 'node-static'
import NodeMailer from 'nodemailer'

const PORT = process.env.PORT ?? 3000

const transporter = NodeMailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'perronalgonpoton@gmail.com',
		pass: 'perroNalgon2005',
	},
})

const file = new Server('./static')
const server = createServer((req, res) => {
	if (req.method === 'POST' && req.url === '/send-email') {
		let body

		req.on('data', chunk => {
			console.log(`data chunk available ${chunk}`)
			body = chunk.toString()
		})

		req.on('end', () => {
			const { to, subject, html } = JSON.parse(body)

			transporter.sendMail(
				{
					from: 'perronalgonpoton@gmail.com',
					to,
					subject,
					html,
				},
				(error, info) => {
					if (error != null) {
						console.log(error)
						return
					}

					console.log(info)
				},
			)
		})

		res.writeHead(200, { 'Content-Type': 'application/json' })
		res.end(JSON.stringify({ message: 'Email sent successfully' }))

		return
	}

	file.serve(req, res)
})

server.listen(PORT, '127.0.0.1', () => {
	console.log('server running at http://127.0.0.1:3000')
})
