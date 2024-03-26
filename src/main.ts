import "./app.css";
import App from "./App.svelte";

const app = new App({
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  target: document.getElementById("app")!,
});
if (import.meta.env.PROD) {
  const { inject } = await import('@vercel/analytics')
  const { injectSpeedInsights } = await import('@vercel/speed-insights')
  inject();
  injectSpeedInsights()
}

export default app;
