<template>

    <div class="w-[80%] grid grid-cols-12 gap-2 space-y-3">
        <nav class="col-span-3">
            <h1>Menu</h1>
            <div class="flex flex-col space-y-2">
            
                <RouterLink to="/admin">Dashboard</RouterLink>
                <RouterLink to="/admin/setting">profile</RouterLink>
            </div>
        </nav>
        
        <main class="col-span-9">
            <router-view />
        </main>
    </div>

</template>

<script setup>


</script>