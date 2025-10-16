<template>
  <div class="container min-h-screen flex flex-col md:flex-row px-4 md:px-12 gap-12">
    <!-- gauche -->
    <div class="w-full md:w-1/3 md:top-20">
      <!-- composant CardProfile -->
      gauche
    </div>

    <!-- droite -->
    <div class="flex flex-col w-full md:w-2/3 md:justify-evenly gap-6">
      <div class="">
        <!-- composant Publication -->
        droite haut
      </div>

      <div class="">
        <!-- composant des posts -->
        droite bas
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
}
</script>