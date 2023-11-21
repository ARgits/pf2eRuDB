import { inject } from "@vercel/analytics";
import "./app.css";
import App from "./App.svelte";

const app = new App({
  target: document.getElementById("app")!,
});
inject();
export default app;
