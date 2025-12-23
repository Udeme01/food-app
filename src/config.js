export const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL ||
	(import.meta.env.MODE === "production"
		? "https://your-backend-url.vercel.app/api"
		: "http://localhost:3000");
