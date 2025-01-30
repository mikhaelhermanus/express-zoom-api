import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import zoomRoutes from './src/routes/zoomRoutes.js'
const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // URL frontend Anda
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metode yang diizinkan
    credentials: true, // Izinkan cookies atau headers autentikasi
}));

const PORT = process.env.PORT || 3003

app.use(bodyParser.json());
app.use('/api/zoom', zoomRoutes);

app.listen(PORT)

console.log(`Api running on : http://localhost:${PORT}`)