<script setup lang="ts">
const props = defineProps({
    title: String,
    class:String
});
</script>

// ===============================|| Ui Parent Card||=============================== //
<template>
    <v-card elevation="10" class="withbg">
        <v-card-item class="pa-0">
            <div class="d-sm-flex align-center justify-space-between">
                <h1 class="text-h5 mb-6 px-7 pt-7 tw-truncate">{{ title }}</h1>
                <!-- <template v-slot:append> -->
                <slot name="action"></slot>
                <!-- </template> -->
            </div>

            <slot />
        </v-card-item>
       
    </v-card>
</template>
