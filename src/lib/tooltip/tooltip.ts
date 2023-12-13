import Tooltip from "./TooltipFromAction.svelte";
import { allDataArr } from "../getData";
export function tooltip(element: HTMLElement) {
  element.querySelectorAll("a.internal, span[class^='c-'").forEach((el: HTMLAnchorElement) => {
    const href = el.href?.match(/(?<=#).+/)?.[0] || el.className;
    const data = allDataArr.find((v) => v.id === href);
    const spanReplace = document.createElement("span");
    spanReplace.innerHTML = el.firstElementChild ? el.firstElementChild.textContent : el.textContent;
    spanReplace.className = data ? "std std-ref" : "";
    el.replaceWith(spanReplace);

    // console.log(document.querySelector(`#${href}.message`), data);
    if (!document.querySelector(`#${href}.message`) && data)
      spanReplace.addEventListener("click", (ev) => {
        ev.preventDefault();
        const card: HTMLElement | undefined = document.querySelector(`#${href}.message`);
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
      });
  });
}
