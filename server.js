import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openai = process.env.OPENAI_API_KEY
    ? new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
      })
    : null;

// JSON ma'lumotlarni qabul qilish
app.use(express.json({ limit: '1mb' }));

// CSS, JS va rasmlar
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// AI fayllari
app.use('/ai', express.static(path.join(__dirname, 'public')));

// Asosiy sahifa
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// AI sahifasi
app.get('/ai', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ai.html'));
});

// Server tekshiruvi
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Abdulboriy AI ishlayapti!',
    });
});

// AI suhbat
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                error: 'Xabar yozilmadi.',
            });
        }

        if (!openai) {
            return res.status(500).json({
                error: 'API kalit topilmadi.',
            });
        }

        const response = await openai.responses.create({
            model: process.env.OPENAI_MODEL,
            instructions: "Sen Abdulboriy AI yordamchisisan. O'zbek tilida javob ber.",
            input: message,
        });

        return res.json({
            reply: response.output_text,
        });
    } catch (error) {
        console.error('AI XATOSI:', error.message);

        return res.status(500).json({
            error: error.message,
        });
    }
});

// 404
app.use((req, res) => {
    res.status(404).send('404 - Sahifa topilmadi');
});

// Serverni ishga tushirish
app.listen(PORT, () => {
    console.log('ABDULBORIY SERVER ISHLAYAPTI!');
    console.log(`Asosiy sayt: http://localhost:${PORT}`);
    console.log(`AI yordamchi: http://localhost:${PORT}/ai`);
});
