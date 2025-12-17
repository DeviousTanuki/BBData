// src/utils/loadJson5.js
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import JSON5 from 'json5';

export async function loadJson5(relativePath) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fullPath = path.join(__dirname, relativePath);
    const raw = await fs.readFile(fullPath, 'utf-8');
    return JSON5.parse(raw);
}
