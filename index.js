import { createServer } from 'http'

import { Server } from 'node-static'
import mailgun from 'mailgun-js'

const PORT = process.env.PORT ?? 3000

const mg = mailgun({
	apiKey: '5d019aa0eb068e698adfe4c6190f8ada-7ecaf6b5-a74d2904',
	domain: 'sandbox8c054e5cc019477786bc1b7d8a8d464f.mailgun.org',
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

			mg.messages().send(
				{
					from: 'perronalgonpoton@gmail.com',
					to,
					subject,
					html,
				},
				(error, body) => {
					if (error) {
						console.log(error)
						return
					}

					console.log('Email was sent successfully', body)
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
