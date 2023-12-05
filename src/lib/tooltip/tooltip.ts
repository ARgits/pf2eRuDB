import Tooltip from "./TooltipFromAction.svelte";
import { conditions } from "../constants";
import type { SvelteComponent } from "svelte";
export function tooltip(element: HTMLElement) {
  let tooltipComponent: SvelteComponent;
  function click(event: MouseEvent) {
    const condition = [...element.classList].filter((cls) => cls.includes("c-"))?.[0];
    const text = conditions[condition];
    tooltipComponent = new Tooltip({
      props: {
        text,
        onClick: () => {
          tooltipComponent.$destroy();
        },
      },
      target: document.body,
    });
  }
  function destroyComponent() {
    tooltipComponent.$destroy();
  }

  element.addEventListener("click", click);

  return {
    destroy() {
      element.removeEventListener("click", click);
    },
  };
}
