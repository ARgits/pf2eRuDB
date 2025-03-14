import type { generalContent, Routes } from "@types";
import { defineStore } from "pinia";
import { reactive, watch } from "vue";
import { useContentStore } from "./content";
import { devLog } from "@/utils";
import { useRoute } from "vue-router";
import { useLocalStorage } from "@vueuse/core";
import {pg as dbObject} from "@/main"

export const useFavoritesStore = defineStore("favorites", () => {
  const route = useRoute()
  const favoritesLocalStorage = useLocalStorage<generalContent["id"][]>("favorites",[])
  watch(favoritesLocalStorage,()=>console.log(favoritesLocalStorage.value))

  const data = reactive([])
  function hasItemById(itemId: generalContent["id"]) {
    return favoritesLocalStorage.value.find((v)=> v===itemId )
  }
  function addRemoveItem(itemId: generalContent["id"]) {
    if (localStorage) {
      const index = favoritesLocalStorage.value.findIndex((v)=>v===itemId)
      if(index===-1){
        favoritesLocalStorage.value.push(itemId)
        devLog("Favorite add item", itemId)
      }else{
        favoritesLocalStorage.value.splice(index,1)
        devLog("Favorites remove item", itemId)
      }
      const { setFilter } = useContentStore()
      const routeName = route.name as Routes
      if (routeName.includes("favorite")) {
        setFilter().then(()=>devLog("refresh data after add/remove favorite"))
      }else{
        setFilter(`favorite${routeName as Exclude<Routes,`favorite${string}`>}`).then(()=>devLog("refresh data after add/remove favorite"))
      }
    }
  }

  //Необходимо привести localStorage со всеми id для избранного к одному формату.
  async function migrateOldFavorites(){
    devLog("Миграция ID")
    for(const index in favoritesLocalStorage.value ){
      const favorite = favoritesLocalStorage.value[index] as (string|{ id:string })
      if(typeof favorite!=="string"){
        favoritesLocalStorage.value[index] = favorite.id
      }
    }
    const idArrayForQuery = favoritesLocalStorage.value.map((v)=>`'${v}'`)
    console.log(`select id, aon_id, ru_id from content where ru_id in (${idArrayForQuery}) or aon_id in (${idArrayForQuery})`, favoritesLocalStorage.value)
    const data = (await dbObject.query<{ id:generalContent["id"],aon_id:generalContent["aon_id"],ru_id:generalContent["ru_id"] }>(`select id, aon_id, ru_id from content where ru_id in (${idArrayForQuery}) or aon_id in (${idArrayForQuery})`)).rows
    for(const favorite of data){
      const {id,aon_id,ru_id} = favorite
      const isRightId = favoritesLocalStorage.value.includes(id)
      if(!isRightId){
        const wrongIdIndex = favoritesLocalStorage.value.findIndex((v)=>v===aon_id||v===ru_id)
        if(wrongIdIndex!==-1){
          favoritesLocalStorage.value[wrongIdIndex] = id
        }else throw Error("Что-то не так, не существующий id")
      }

    }
    devLog("New favorites", favoritesLocalStorage.value)
  }
  return {

    //refs
    data,

    //computables

    //functions
    addRemoveItem,
    hasItemById,
    migrateOldFavorites
  }

})