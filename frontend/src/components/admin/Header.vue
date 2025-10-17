<template>
    <!-- Main navigation container -->
    <nav
        class="flex-no-wrap relative flex w-full items-center justify-between bg-zinc-50 py-2 shadow-dark-mild dark:bg-neutral-700 lg:flex-wrap lg:justify-start lg:py-4">
        <div class="flex w-full flex-wrap items-center justify-between px-3">
            <!-- Hamburger button for mobile view -->
            <button
            class="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
            type="button"
            data-twe-collapse-init
            data-twe-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent1"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <!-- Hamburger icon -->
            <span
                class="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor">
                <path
                    fill-rule="evenodd"
                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                    clip-rule="evenodd" />
                </svg>
            </span>
            </button>

            <!-- Collapsible navigation container -->
            <div
                class="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
                id="navbarSupportedContent1"
                >
                <!-- Logo -->
                <a
                    class="mb-4 me-5 ms-2 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
                    href="#">
                    <img
                    src="@/assets/logo.svg"
                    style="height:45px"
                    alt="Hackaton projet"
                    loading="lazy" />
                </a>
                <!-- Left navigation links -->
                <ul
                    class="list-style-none me-auto flex flex-col ps-0 lg:flex-row">
                    <li :class="[route.path === items.to ?`text-blue-500 mb-4 lg:mb-0 lg:pe-2 font-semibold`:`mb-4 lg:mb-0 lg:pe-2 font-semibold`]" v-for="(items,index) in NavItems" :key="index" >  
                        <RouterLink :to="items.to">{{items.name}}</RouterLink>
                    </li>
                </ul>
                <!-- Left links -->
            </div>

            <!-- Right elements -->
            <div class="relative flex items-center">
                <!-- Second dropdown container -->
                <div
                    class="relative">
                    <a
                        class="flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                        href="#"
                        id="dropdownMenuButton2"
                        role="button"
                        data-twe-dropdown-toggle-ref
                        aria-expanded="false">
                        <!-- User avatar -->
                        <img
                            src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
                            class="rounded-full"
                            style="height: 45px; width: 45px"
                            alt=""
                            loading="lazy" />
                    </a>
                </div>
            </div>
            <!-- Right elements -->
        </div>
    </nav>
</template>

<script setup>

import { useRoute } from 'vue-router'
const route = useRoute();

const NavItems=[
    {
        to:"/admin",
        name:"Admin"
    },
    {
        to:"/admin/setting",
        name:"Setting"
    },
]

</script>