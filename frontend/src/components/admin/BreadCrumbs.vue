<template>
    <!--Second breadcrumb-->
<nav class="w-full rounded-md text-sm">
  <ol class="list-reset flex">
    <li>
      <router-link to="/admin">Admin</router-link>
    </li>
    <li>
      <span class="mx-2 text-neutral-400">/</span>
    </li>
     <li>
      <router-link :to="route.path" class="text-neutral-400">{{route.name}}</router-link>
    </li>
  </ol>
</nav>
</template>

<script setup>

import { useRoute, RouterLink } from 'vue-router';
const route = useRoute();
</script>