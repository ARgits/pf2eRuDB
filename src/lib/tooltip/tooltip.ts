import Tooltip from "./TooltipFromAction.svelte";
import { allDataArr } from "../getData";

export function tooltip(element: HTMLElement) {
  element.querySelectorAll("[data-id]").forEach((el: HTMLAnchorElement) => {
    const id = el.dataset.id;
    const data = allDataArr.find((v) => v.id === id);
    if (!document.querySelector(`#${id}.message`) && data) {
      function onClick(ev: Event) {
        ev.preventDefault();
        const card: HTMLElement | undefined = document.querySelector(`#${id}.message`);
        if (card) {
          card.focus();
        } else {
          const tooltipComponent = new Tooltip({
            props: {
              data,
              onClick: () => {
                tooltipComponent.$destroy();
              },
            },
            target: document.body,
          });
        }
      }
      el.addEventListener("click", onClick);
    }
  });
  return {
    destroy() {
      console.log("destroy");
    },
  };
}
