import { createServer } from 'http'

import { Server } from 'node-static'
import NodeMailer from 'nodemailer'

const PORT = process.env.PORT ?? 3000

const EMAIL = process.env.EMAIL
const PASSWORD = process.env.PASSWORD

if (EMAIL == undefined || PASSWORD == undefined)
	throw new Error('Missing email credentials')

const transporter = NodeMailer.createTransport({
	service: 'outlook',
	auth: {
		user: EMAIL,
		pass: PASSWORD,
	},
})

const file = new Server('./static')
const server = createServer((req, res) => {
	try {
		if (req.method === 'POST' && req.url === '/send-email') {
			let body

			req.on('data', chunk => {
				console.log(`data chunk available ${chunk}`)
				body = chunk.toString()
			})

			req.on('end', async () => {
				const { to, subject, html } = JSON.parse(body)

				transporter.sendMail(
					{
						from: EMAIL,
						to,
						subject,
						html,
					},
					(error, info) => {
						if (error) {
							console.log(error)
							return
						}

						console.log(`Email was sent successfully: ${info}`)
					},
				)
			})

			res.writeHead(200, { 'Content-Type': 'application/json' })
			res.end(JSON.stringify({ message: 'Email sent successfully' }))

			return
		}

		file.serve(req, res)
	} catch (error) {
		console.log(error)

		res.writeHead(500, { 'Content-Type': 'application/json' })
		res.end(
			JSON.stringify({
				message: `An error has occurred: ${error}`,
			}),
		)
	}
})

server.listen(PORT, '127.0.0.1', () => {
	console.log(`server running at http://127.0.0.1:${PORT}`)
})
