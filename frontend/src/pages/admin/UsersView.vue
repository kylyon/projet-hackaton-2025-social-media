<template>
        <main>
            <div v-if="users.length > 0">
                <UserTable :users="users"/>
            </div>
            <div v-else>
               <Loading/>
            </div>
        </main>
</template>

<script setup>

import UserTable from '@/components/userKPIs/UserTable.vue';
import { onMounted, ref } from 'vue';
import Loading from '@/components/admin/Loading.vue';

const users=ref([]);
let url=`https://hackaton-backend-api.vercel.app/users`; 

async function getAllUsers(){
    
    try{

        const getUsers=await fetch(`${url}`);

        if(!getUsers.ok) return console.error(`Impossible de récuperer les données`); 

        const res= await getUsers.json();
        users.value=res.data;

        console.log(users)

    }catch(error){
        console.error(`Erreur détecté :${error}`);
    }
}

onMounted(()=>{
    getAllUsers(); 
})
</script>