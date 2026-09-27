import { config } from './config.js';
import { createApp } from './app.js';
import { loadSeed } from './services/requestService.js';

await loadSeed();
const app = createApp();

/**
 * TODO W07-SRV (CP10) · ใช้ config.port แทนเลข 3001 ที่ฝังไว้
 * และพิมพ์บอกด้วยว่าอนุญาตให้เรียกจาก origin ไหน (config.corsOrigin)
 */
app.listen(config.port, () => {
  console.log(`Campus Service API พร้อมที่ http://localhost:${config.port}`);
  console.log(`อนุญาตให้เรียกจาก: ${config.corsOrigin}`);
});