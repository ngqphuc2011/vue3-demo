<script setup lang="ts">
import { RouterView } from 'vue-router';
// import VerticalSidebarVue from './vertical-sidebar/VerticalSidebar.vue';
// import VerticalHeaderVue from './vertical-header/VerticalHeader.vue';
import MainView from './Main.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
    <v-locale-provider >
        <v-app>
            <!-- <VerticalSidebarVue />
            <VerticalHeaderVue  /> -->
            <MainView />
            <v-main>
                <v-container fluid class="page-wrapper">
                    <div class="maxWidth">
                        <RouterView :key="route.path" />
                    </div>
                </v-container>
            </v-main>
        </v-app>
    </v-locale-provider>
</template>
