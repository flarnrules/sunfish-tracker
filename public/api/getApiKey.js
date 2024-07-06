if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

export default function handler(req, res) {
    res.status(200).json({ apiKey: process.env.GOOGLE_MAPS_API_KEY });
}