import { nextTick, type Ref } from "vue"
import { useModalWindows } from "./stores/modalWindows"
import { useEventListener } from "@vueuse/core"
import type { generalContent } from "./types"
import { devLog } from "./utils"

export function createDescHTML(rawString:string,descElem:Ref<HTMLElement|null>,descRef:Ref<string>,level=0){
  devLog("createDescHTML:start")
  if(!document) return

  const { showModal } = useModalWindows()
  const tempDiv = document.createElement("div")
  const isRuDesc = !!rawString.match(/[а-яА-Я]/ms)?.length

  tempDiv.innerHTML = isRuDesc ? rawString : AONmarkDownToHTML(rawString,level)
  descRef.value = tempDiv.innerHTML
  devLog("createDescHTML: descElem",descElem.value)

  // if (!descElem.value) return
  nextTick().then(() => {

    for (const button of descElem.value?.querySelectorAll<HTMLButtonElement & { dataset: { id: string, name: string } }>("button[data-id][data-name]")) {
      console.log("set useEventListener",button)
      useEventListener(button, "click", (ev) => {
        devLog("modal window click", button.dataset.id)
        showModal(button.dataset.id as generalContent["id"], ev, button.dataset.name)
      })
    }
  })
  devLog("createDescHTML:finish")
  
}
export function AONmarkDownToHTML(rawString:string,level:number){
  console.log(`${rawString}`)
  const arr = rawString
      .replace(/(<title.*?level="1".*?<\/title>)|(<\/?column.?>)/gms,"")
      .replace(/\r\n/gm," ")
      .split(/[\r\n]+/gm)
      .map(s=>s.trim())
      .filter(v=>v!=="")

  // let notNeededTag = false
  console.log([...arr])
  for(const ind in arr){
    arr[ind]=arr[ind]
        .trim()
        .replace(/<traits>.+?<\/traits>/gms,"")
        .replace(/<title level="(\d)".+?>(.+?)<\/title>/gms, (_, p1, p2) => `<h${parseInt(p1)+level} class='title'>${p2}</h${parseInt(p1)+level}>`)
        .replace(/(#{1,6})(.+)/gm, (_, p1, p2) => `<h${p1.length+level}>${p2.trim()}</h${p1.length+level}>`)
        .replace(/(^[^<].+)/gm, (_, p1) => `<p>${p1}</p>`)
        .replace(/(\*\*)(.+?)(\*\*)/gm, (_, __, p2, ___) => `<strong>${p2}:</strong>`)
        .replace(/<actions string="(.+?)" \/>/gms, (_, p1) => {
          const src = p1 === "Single Action" ?
            "PF_action_1.webp" :
            p1 === "Reaction" ?
              "PF_action_reaction.webp" :
              p1 === "Free Action" ?
                "PF_action_free.webp" :
                p1 === "Two Actions" ?
                  "PF_action_2.webp" :
                  "PF_action_3.webp";
          return `<img src="../${src}" style="height:1em;" />`
        })
        .replace(/\[(.+?)]\((.+?)\)/gm, (_, p1, p2) =>  
          p2.match(/\.aspx\?ID=[0-9]{1,4}/gm) ? `<button data-id="https://2e.aonprd.com${p2}" data-name="${p1}" aria-label="open ${p1} description in modal window">${p1} </button>` : `<em>${p1}</em>`)
  }
  console.log(arr)
  console.log(arr.filter(r=>r.length).join(""))
  return arr.filter(r=>r.length).join("")
}