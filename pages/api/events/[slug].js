const { events } = require('./data.json');

export default function handler(req, res) {
	const resEvent = events.filter((ev) => ev.slug === req.query.slug)[0];

	if (req.method === 'GET') {
		res.status(200).json(resEvent);
	} else {
		res.setHeader('Allow', ['GET']),
			res.status(405).json({ message: `Method ${req.method} is not allowed.` });
	}
}
