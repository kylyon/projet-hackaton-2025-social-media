<template>
        <main>
            <div v-if="Hobbies.length > 0">
                <HobbiesTable :hobbies="Hobbies"/>
            </div>
            <div v-else>
                 <Loading/>
            </div>
        </main>
</template>

<script setup>

import HobbiesTable from '@/components/admin/HobbiesTable.vue';
import Loading from '@/components/admin/Loading.vue';
import { onMounted, ref } from 'vue';

const Hobbies=ref([]);
let url=`https://hackaton-backend-api.vercel.app/hobbies`; 

async function getAllHobbies(){
    
    try{

        const getHobbies=await fetch(`${url}`);

        if(!getHobbies.ok) return console.error(`Impossible de récuperer les données`); 

        const res= await getHobbies.json();
        Hobbies.value=res.hobbies;

        console.log(Hobbies)

    }catch(error){
        console.error(`Erreur détecté :${error}`);
    }
}

onMounted(()=>{
    getAllHobbies(); 
})
</script>