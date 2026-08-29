import { makeServer } from './server-lib.mjs';
import { fileURLToPath } from 'node:url';
const port = Number(process.env.PORT || 4173);
makeServer(fileURLToPath(new URL('../site', import.meta.url))).listen(port, '127.0.0.1', () => console.log(`QuestLearn running at http://127.0.0.1:${port}`));
