<template>
     <div class="min-h-screen flex flex-col justify-center p-4">
        <div class="elements flex flex-col items-center px-6 py-8 md:px-10 md:py-12 rounded-3xl gap-12 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full mx-auto shadow-lg">
            <div class="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2">
                <img src="#" alt="avatar" class="w-full h-full object-cover" />
            </div>
            <div class="user-infos text-center flex flex-col gap-2">
                <div class="name">
                    <p class="font-bold text-base sm:text-lg md:text-xl">Lastname</p>
                </div>
                <div class="username">
                    <p class="text-xs sm:text-sm">@username</p>
                </div>
                <!-- Si admin ou modérateur on affiche le rôle-->
                <div class="role">
                    <p class="text-xs">rôle</p>
                </div>
                <div class="hobbies">
                    <p class="text-sm sm:text-sm md:text-base">hobbies</p>
                </div>
                <div class="description">
                    <p class="text-xs sm:text-sm md:text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam officiis nobis minus optio amet nemo magnam, quae corrupti modi, sapiente dolore quod eos enim a sequi facere ipsa maxime asperiores!</p>
                </div>
            </div>
            <div class="user-components w-full space-y-4">
                <button class="w-full bg-sky-800 text-white py-2 rounded-lg hover:bg-sky-800 transition-colors">
                    Modifier mon profil
                </button>
                 <button class="w-full bg-sky-800 text-white py-2 rounded-lg hover:bg-sky-800 transition-colors">
                    Modifier mes hobbies
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>