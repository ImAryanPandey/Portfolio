
/* global process */

import express from 'express';
import cors from 'cors';
import projectRoutes from './routes/projectRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/projects', projectRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: "System Online", mode: "GitHub Sync Active" });
});

export default app;

if (process.argv[1] === new URL(import.meta.url).pathname) {
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`> ARC Backend Online: http://localhost:${PORT}`);
        console.log(`> Mode: Native ESM`);
    });
}
