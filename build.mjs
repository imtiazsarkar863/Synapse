import { writeFileSync } from 'node:fs';

const apiKey = process.env.FIREBASE_API_KEY || '';

writeFileSync(
    'firebase-config.js',
    `window.SYNAPSE_FIREBASE_API_KEY = ${JSON.stringify(apiKey)};\n`
);