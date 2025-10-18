<template>
    <!--Footer container-->
        <footer
            class="flex flex-col items-center bg-zinc-800 text-center text-surface dark:bg-neutral-700 text-zinc-200 lg:text-left">
            <div class="w-full bg-black/5 p-4 text-center">
                © {{ data.getFullYear() }} Copyright :
                <a href="https://hackaton-backend-api.vercel.app/api/" class="text-blue-500">hackaton-backend-api</a>
            </div>
        </footer>
</template>

<script setup>

const data = new Date();

</script>