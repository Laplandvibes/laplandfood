import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// CRITICAL — see lv_critical_react_dedupe.md.
// Site imports from `../../shared/`. Without dedupe two React copies ship,
// useContext returns null and the prod page renders blank.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router', 'react-router-dom'],
  },
  server: {
    port: 5199,
  },
})
