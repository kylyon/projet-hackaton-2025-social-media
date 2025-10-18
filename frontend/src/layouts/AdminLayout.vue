<template>

    <div class="w-[80%] mx-auto space-y-4">
        <Header/>

        <div class="grid grid-cols-12 gap-3 space-y-6 ">
            <nav class="col-span-2 bg-neutral-50  rounded-md border-[0.1rem] border-neutral-100 p-3 space-y-3 h-[15rem] sticky top-5">
                <div class="flex space-x-3 items-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-dashboard-icon lucide-layout-dashboard stroke-blue-500"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
                    <h2 class="font-semibold">Menu</h2>
                </div>
                <div class="flex flex-col space-y-2" v-for="(items,index) in ItemsNav" :key="index">
                
                    <RouterLink :to="items.to" :class="[route.path === items.to ?`text-blue-500 mb-4 border-l-3 pl-3 lg:mb-0 lg:pe-2 font-semibold`:`mb-4 lg:mb-0 lg:pe-2 pl-3  font-semibold`]" :v-html="items.icon">
                        {{items.name}}
                    </RouterLink>
        
                </div>
            </nav>
            
            <main class="col-span-10 space-y-4">
                <BreadCrumbs/>
                <router-view />
            </main>
        </div>

        <Footer/>
    </div>

</template>

<script setup>
import Header from "@/components/admin/Header.vue"
import Footer from "@/components/admin/Footer.vue"
import BreadCrumbs from "@/components/admin/BreadCrumbs.vue";
import { useRoute } from "vue-router"; 

const route=useRoute(); 

const ItemsNav=[

    {
        to:"/admin/setting",
        name:" Profile",
        icon:`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-cog-icon lucide-user-round-cog"><path d="m14.305 19.53.923-.382"/><path d="m15.228 16.852-.923-.383"/><path d="m16.852 15.228-.383-.923"/><path d="m16.852 20.772-.383.924"/><path d="m19.148 15.228.383-.923"/><path d="m19.53 21.696-.382-.924"/><path d="M2 21a8 8 0 0 1 10.434-7.62"/><path d="m20.772 16.852.924-.383"/><path d="m20.772 19.148.924.383"/><circle cx="10" cy="8" r="5"/><circle cx="18" cy="18" r="3"/></svg>`
    },
    {
        to:"/admin/users",
        name:"Users",
        icon:`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-cog-icon lucide-user-round-cog"><path d="m14.305 19.53.923-.382"/><path d="m15.228 16.852-.923-.383"/><path d="m16.852 15.228-.383-.923"/><path d="m16.852 20.772-.383.924"/><path d="m19.148 15.228.383-.923"/><path d="m19.53 21.696-.382-.924"/><path d="M2 21a8 8 0 0 1 10.434-7.62"/><path d="m20.772 16.852.924-.383"/><path d="m20.772 19.148.924.383"/><circle cx="10" cy="8" r="5"/><circle cx="18" cy="18" r="3"/></svg>`
    },
    {
        to:"/admin/hobbies",
        name:"Hobbies",
        icon:`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-cog-icon lucide-user-round-cog"><path d="m14.305 19.53.923-.382"/><path d="m15.228 16.852-.923-.383"/><path d="m16.852 15.228-.383-.923"/><path d="m16.852 20.772-.383.924"/><path d="m19.148 15.228.383-.923"/><path d="m19.53 21.696-.382-.924"/><path d="M2 21a8 8 0 0 1 10.434-7.62"/><path d="m20.772 16.852.924-.383"/><path d="m20.772 19.148.924.383"/><circle cx="10" cy="8" r="5"/><circle cx="18" cy="18" r="3"/></svg>`
    }
]

</script>