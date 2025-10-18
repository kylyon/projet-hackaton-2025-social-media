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
              <svg @click="() =>getHobbies(hobby._id)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil w-5 h-5 stroke-zinc-700 hover:stroke-zinc-900 transition-all ease-in-out hover:scale-110 stroke-1   cursor-pointer"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
              <!--Delete-->
              <svg  @click="()=> delData (hobby._id)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-delete-icon lucide-delete w-5 h-5 stroke-red-700 hover:stroke-red-500 transition-all ease-in-out hover:scale-110 stroke-1   cursor-pointer"><path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/><path d="m12 9 6 6"/><path d="m18 9-6 6"/></svg>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <Modal 
    :is-open="showModal" 
    @close="showModal = false"
    title="Confirmer la modification"
    description="Vous êtes sur le point de modifier cet hobby. Cette action remplacera les informations actuelles. Souhaitez-vous continuer ?"
    >
    <template #content>
       <form @submit.prevent>
          <div class="space-y-3" v-if="Object.keys(updateHobbiesData).length >0">
                <input type="text" id="name" for="name" v-model="updateHobbiesData.name" class="m-0 -ms-px block flex-auto  w-full border border-solid border-blue-400 rounded-md bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:text-white dark:placeholder:text-neutral-200 dark:autofill:shadow-autofill dark:focus:border-primary">
                <input hidden type="text" v-model="updateHobbiesData._id">
          </div>

           <Loading v-else />
        </form>
        <span class="text-center text-green-500" v-if="msgAction !== undefined">{{ msgAction }} !!!!</span>
    
      </template>
    <template #footer>
      <Button @button-action="showModal = false" title="Fermer" class="bg-zinc-800 "/>
      <Button @button-action="sauvegarder" class="text-zinc-800 font-semibold cursor-pointer" title="Modifier"/>
    </template>
  </Modal>

</template>

<script setup>

import {updateData}  from "../../../utils/updateData";
import Loading from "./Loading.vue";
import Modal from "./Modal.vue";
import { ref } from "vue";
import Button from "./Button.vue";

const emit = defineEmits(['refresh']);

defineProps({
  hobbies: {
    type: Array,
    required: true
  }
});

const updateHobbiesData = ref({
  _id: '',
  name: ''
}); 
const showModal = ref(false);
const msgAction=ref(undefined); //Message d'action

async function getHobbies(id) {
  try {
    showModal.value = true;
    const response = await fetch(`https://hackaton-backend-api.vercel.app/hobbies/${id}`);
   

    if(response.ok){
         const hobbiesValue = await response.json();
         updateHobbiesData.value = hobbiesValue.data;
    }

  } catch (error) {
    console.error("Error fetching hobby:", error);
    alert("Error fetching hobby details");
  }
}

async function sauvegarder() {
  try {
    if (!updateHobbiesData.value._id || !updateHobbiesData.value.name) {
      alert("Please fill all required fields");
      return;
    }

    const response = await updateData(
      "https://hackaton-backend-api.vercel.app/hobbies/update",
      updateHobbiesData.value._id,
      { name: updateHobbiesData.value.name }
    );

    if (response) {
      msgAction.value="Gread !!! Hobby updated successfully";  // Le message de retour
      
      setTimeout(()=>{
        showModal.value = false;
        msgAction.value=undefined
      },5000)

      emit('refresh'); // To refresh the parent component's data
    }
  } catch (error) {
    console.error("Error updating hobby:", error);
    alert("Error updating hobby");
  }
}

async function delData(id) {
  try {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce hobby ?")) {
      const response = await fetch(`https://hackaton-backend-api.vercel.app/hobbies/delete/${id}`);
      if (response) {
        alert("Hobby deleted successfully");
        emit('refresh'); // To refresh the parent component's data
      }
    }
  } catch (error) {
    console.error("Error deleting hobby:", error);
    alert("Error deleting hobby");
  }
}
</script>