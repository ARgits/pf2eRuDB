import Tooltip from "./TooltipFromAction.svelte";
import { allData } from "@stores/dataStore";
import { get } from "svelte/store";
import { conditions } from "@components/constants";

export function tooltip(element: HTMLElement) {
  const allDataArr = get(allData)
  for (const el of element.querySelectorAll("[data-id]") as NodeListOf<HTMLAnchorElement>) {

    const id = el.dataset.id;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    let data: any
    if (id.includes('c-')) {
      data = conditions.find((c) => c.id === id)
    } else {
      data = allDataArr.find((v) => v.id === id)
    }
    console.log(id, data)
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

  }
  return {
    destroy() {
      console.log("destroy");
    },
  };
}
