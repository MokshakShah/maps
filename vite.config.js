import { defineConfig } from 'vite'; // Import the `defineConfig` function from Vite
import react from '@vitejs/plugin-react'; // Import the React plugin for Vite

// https://vite.dev/config/
// Export the Vite configuration using `defineConfig`
export default defineConfig({
  plugins: [react()], // Use the React plugin for Vite to handle React-related tasks
});
