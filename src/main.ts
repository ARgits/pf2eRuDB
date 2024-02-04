import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from '@vercel/speed-insights';
import "./app.css";
import App from "./App.svelte";

const app = new App({
  target: document.getElementById("app")!,
});
inject();
injectSpeedInsights()

export default app;
