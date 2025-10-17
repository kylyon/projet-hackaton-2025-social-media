<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-gray-900">Liste des hobbies</h3>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Index</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Options</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(hobby,index) in hobbies" :key="index" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap"> 
              <div class=" flex items-center justify-left text-gray-600 font-semibold">
                  {{ index +1 }}
              </div>
            </td>

            <td class="px-6 py-4 whitespace-nowrap"> 
              <div class=" flex items-center justify-left text-gray-600 font-semibold">
                  {{hobby.name }}
              </div>
            </td>

            <td class="px-6 py-4 flex items-center space-x-3 whitespace-nowrap">
              <!--Edit-->
              <svg @click="() =>getHobbies(hobby._id)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil w-5 h-5 stroke-zinc-500 hover:stroke-blue-500 transition ease-in-out  cursor-pointer"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
              <!--Delete-->
              <svg @click="()=> delData (hobby._id)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash w-5 h-5 stroke-zinc-500 hover:stroke-blue-500 transition ease-in-out  cursor-pointer"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <Modal 
    :is-open="showModal" 
    @close="showModal = false"
    title="Modification">
    <template #content>
      <form @submit.prevent>
         <div class="space-y-3" v-if="updateHobbiesData.length >0">
              <label for="name">Name</label>
              <input type="text" id="name" for="name" v-model="updateHobbiesData.name" class="m-0 -ms-px block flex-auto rounded-e border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:text-white dark:placeholder:text-neutral-200 dark:autofill:shadow-autofill dark:focus:border-primary">
              <input hidden type="text" v-model="updateHobbiesData._id">
         </div>
      </form>
    </template>
    <template #footer>
       <button
          @click="showModal = false"
          type="button"
          class="ms-1 inline-block rounded bg-zinc-400 px-6 pb-2 pt-2.5  text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
          data-twe-ripple-init
          data-twe-ripple-color="light">
        Fermer
      </button>
      <button @click="sauvegarder" class="text-zinc-500 font-semibold">Sauvegarder</button>
    </template>
  </Modal>

</template>

<script setup>
import {deleteData} from "../../../utils/deleteData";
import {updateData}  from "../../../utils/updateData";
import { getData } from "../../../utils/getData";
import Modal from "./Modal.vue";
import { ref } from "vue";

defineProps({
  hobbies: {
    type: Array,
    required: true
  }
})

const updateHobbiesData=ref([]); 
const showModal=ref(false);

async function getHobbies(id){
  showModal.value=true 
  const Hobbies=await fetch(`https://hackaton-backend-api.vercel.app/hobbies/${id}`);
  const data=await Hobbies.json();
  updateHobbiesData.value=data.hobbies; 

  console.log(updateHobbiesData);
}

async function edit(id){

  showModal.value=true
  console.log(showModal.value+" "+id)
  
//  try {
//       const  update=await updateData("https://hackaton-backend-api.vercel.app/hobbies/update",id,data);

//       if( update){
//         alert( update);
//       }

//   }catch(error){
//     console.log(`Erreur lors de la modification : ${error}`);
//     alert(`Erreur lors de la modification : ${error}`); 
//   }
}

async function delData(id){
  try {
      const del=await deleteData("https://hackaton-backend-api.vercel.app/hobbies/delete",id);

      if(del){
        alert(del);
      }

  }catch(error){
    console.log(`Erreur lors de la suppression : ${error}`);
    alert(`Erreur lors de la suppression : ${error}`); 
  }
}

</script>