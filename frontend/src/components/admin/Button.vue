<template>
    <button
          @click=" btnAction"
          type="button"
          class="rounded-md cursor-pointer px-6 pb-2 pt-2.5  text-white shadow-primary-3 transition duration-150 ease-in-out ">
       {{title}}
    </button>
</template>


<script setup>

import { defineProps} from 'vue';

const emit=defineEmits(["button-action"])

defineProps({
    title:{
        type:String,
        default:"button"
    }
}); 

function btnAction(){
    emit("button-action")
}

</script>