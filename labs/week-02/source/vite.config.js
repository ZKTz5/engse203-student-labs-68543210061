import { defineConfig } from "vite";

// TODO: เปลี่ยนให้ตรงชื่อ repository ของตนเอง เช่น engse203-lab02-67123456789
const repositoryName = "engse203-student-labs-68543210061";

export default defineConfig({
  base: "./",
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
});