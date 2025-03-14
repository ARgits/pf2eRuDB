import { useContentStore } from "@/stores/content"
import type { DataRoutes } from "@types"
import { capitalize } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import { pg as dbObject } from "@/main"
import { useLocalStorage } from "@vueuse/core"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: { path: "/compendium/backgrounds" }
    },
    {
      path:"/compendium",
      name:"compendium",
      redirect:{path:"/compendium/ancestries"},
      meta:{label:"Компендиум",level:1},
      children:[
        {
          path: "ancestries",
          name: "ancestry",
          components: {
            default:() => import("@views/ContentView.vue"),
            LeftSidebar:()=>import("@components/layout/LeftSidebarComponent.vue"),
            RightSidebar:()=>import("@components/layout/SidebarComponent.vue")
          },
          meta:{label:"Родословные"}
        },
        {
          path: "feats",
          name: "feat",
          components: {
            default:() => import("@views/ContentView.vue"),
            LeftSidebar:()=>import("@components/layout/LeftSidebarComponent.vue"),
            RightSidebar:()=>import("@components/layout/SidebarComponent.vue")
          },
          meta:{label:"Способности"}
        },
        {
          path: "backgrounds",
          name: "background",
          components: {
            default:() => import("@views/ContentView.vue"),
            LeftSidebar:()=>import("@components/layout/LeftSidebarComponent.vue"),
            RightSidebar:()=>import("@components/layout/SidebarComponent.vue")
          },
          meta:{label:"Происхождения"}
        },
        {
          path: "spells",
          name: "spell",
          components: {
            default:() => import("@views/ContentView.vue"),
            LeftSidebar:()=>import("@components/layout/LeftSidebarComponent.vue"),
            RightSidebar:()=>import("@components/layout/SidebarComponent.vue")
          },
          meta:{label:"Заклинания"}
        },
        {
          path: "actions",
          name: "action",
          components: {
            default:() => import("@views/ContentView.vue"),
            LeftSidebar:()=>import("@components/layout/LeftSidebarComponent.vue"),
            RightSidebar:()=>import("@components/layout/SidebarComponent.vue")
          },
          meta:{label:"Действия"}
        },
        {
          path: "creatures",
          name: "creature",
          components: {
            default:() => import("@views/ContentView.vue"),
            LeftSidebar:()=>import("@components/layout/LeftSidebarComponent.vue"),
            RightSidebar:()=>import("@components/layout/SidebarComponent.vue")
          },
          meta:{label:"Бестиарий"}
        },
      ]
    },
    {

      path: "/favorites",
      name: "favorite",
      meta:{label:"Избранное",level:1},
      beforeEnter: async (to, from) => {
        
        const { isDataFetched } = useContentStore()
        const favoriteIds = useLocalStorage("favorites",[]).value.map(str=>`'${str}'`)
        
        if (isDataFetched && dbObject && favoriteIds.length) {
          const favoriteDataTypes = (await dbObject.query<{ data_type: DataRoutes }>(`SELECT data_type FROM content where id in (${favoriteIds})  group by data_type order by array_position(array[${["feat", "spell", "background", "creature", "action", "ancestry"].map(v=>`'${v}'`)}],data_type)`)).rows.map(v=>v.data_type)
          const firstFavoriteDataType = favoriteDataTypes[0]
          const pathName = `favorite${capitalize(firstFavoriteDataType)}`
          if(to.name!==pathName)
            return {name:pathName}

          // for (const path of favoriteDataTypes as DataRoutes[]) {
          //   console.log(firstRoute)
          //   if (firstFavoriteDataType === path && to.name !== `favorite${capitalize(path)}`&&firstRoute.length===0) {
          //     firstRoute = `favorite${capitalize(path)}`
          //     return {name:firstRoute}
          //   }
          // }
          // return {name:firstRoute}
        }
        else if (to.name !== "favoriteFeat" && from.name) {
          return { name: "favoriteFeat" }
        }
      },
      children: [
        {
          path: "feats", name: "favoriteFeat",
          components: {
            default:() => import("@views/ContentView.vue"),
            LeftSidebar:()=>import("@components/layout/LeftSidebarComponent.vue"),
            RightSidebar:()=>import("@components/layout/SidebarComponent.vue")
          },meta:{label:"Способности",level:2, empty:true} 
        },
        {
          path: "spells", name: "favoriteSpell",
          components: {
            default:() => import("@views/ContentView.vue"),
            LeftSidebar:()=>import("@components/layout/LeftSidebarComponent.vue"),
            RightSidebar:()=>import("@components/layout/SidebarComponent.vue")
          },meta:{label:"Заклинания",level:2, empty:true} 
        },
        {
          path: "actions", name: "favoriteAction",
          components: {
            default:() => import("@views/ContentView.vue"),
            LeftSidebar:()=>import("@components/layout/LeftSidebarComponent.vue"),
            RightSidebar:()=>import("@components/layout/SidebarComponent.vue")
          }, meta:{label:"Действия",level:2,empty:true}
        },
        {
          path: "backgrounds", name: "favoriteBackground",
          components: {
            default:() => import("@views/ContentView.vue"),
            LeftSidebar:()=>import("@components/layout/LeftSidebarComponent.vue"),
            RightSidebar:()=>import("@components/layout/SidebarComponent.vue")
          }, meta:{label:"Происхождения",level:2,empty:true}
        },
        {
          path: "creatures", name: "favoriteCreature",
          components: {
            default:() => import("@views/ContentView.vue"),
            LeftSidebar:()=>import("@components/layout/LeftSidebarComponent.vue"),
            RightSidebar:()=>import("@components/layout/SidebarComponent.vue")
          }, meta:{label:"Бестиарий",level:2,empty:true}
        },
        {
          path: "ancestries", name: "favoriteAncestry",
          components: {
            default:() => import("@views/ContentView.vue"),
            LeftSidebar:()=>import("@components/layout/LeftSidebarComponent.vue"),
            RightSidebar:()=>import("@components/layout/SidebarComponent.vue")
          }, meta:{label:"Родословные",level:2,empty:true}
        },
      ]
    },
    {
      path:"/rules",
      redirect:"/rules/rules-1",
      name:"rules",
      meta:{label:"Правила",level:1},
      children:[
        {
          path:":id",
          name:"currentRule",
          components:{
            default:()=>import("@components/layout/mainRules.vue"),
            LeftSidebar:()=>import("@components/layout/LeftSidebarRules.vue")
          },
          props:true,
        }
      ]
    },
    {
      path:"/about",
      name:"about",
      component:()=>import("@components/layout/FooterComponent.vue"),
      meta:{label:"О проекте",level:1}
    },
    {
      path: "/content/:id",
      name: "content",
      component: () => import("@views/ItemView.vue")
    }
  ],
})
export default router
