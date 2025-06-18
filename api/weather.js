export default async function handler(req, res) {
    const city = req.query.city;
    const API_KEY = process.env.WEATHER_API_KEY;

    if (!city) return res.status(400).json({ error: "City is required" });

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
}