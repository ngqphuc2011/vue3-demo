<script setup lang="ts">
import { router } from '@/router';
import { ref } from 'vue';
const apiUrl = import.meta.env.VITE_API_URL

const items = ref([]) as any;
fetch(apiUrl + '/api/news?populate=*').then(response => response.json()).then(res => {
    items.value = res.data;
})
const onClickImage = (id: any) => {
    router.push({
        name: 'NewsDetail',
        params: {
            id: id,
        },
    })
}
</script>
<template>
    <v-row>
        <v-col cols="12" lg="3" sm="6" v-for="card in items" :key="card.key">
            <v-card elevation="10" class="withbg tw-cursor-pointer" rounded="md">
                <div class="tw-py-5">
                <v-img  :src="apiUrl + card.img?.url" height="150" class="rounded-t-md" @click="onClickImage(card.id)"></v-img>
                </div>
                <v-card-item class=" d-flex tw-min-h-[140px]">
                    <h6 class="text-h6 tw-mb-2" v-text="card.title"></h6>
                    <div class="text-h7 tw-h-[72px] tw-line-clamp-3 tw-break-all">
                        {{ card.summary }}
                    </div>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</template>
