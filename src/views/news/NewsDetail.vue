<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import MarkdownIt from 'markdown-it'
const apiUrl = import.meta.env.VITE_API_URL
const route = useRoute()
const md = new MarkdownIt();


const item = ref({}) as any
const itemId = route.params.id
fetch(apiUrl + '/api/news/' + itemId + '?populate=*').then(response => response.json()).then(res => {
const content = md.render(res.data.content);
    item.value = {...res.data, content};
})
</script>
<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard :title="item.title">
                <div class="pa-7 pt-1">
                        <p class="text-body-2 mb-2 tw-text-gray-500">{{ item.summary }}</p>
                        <v-img v-if="item.img" :src="apiUrl + item.img.url" height="100"> </v-img>
                    <p v-html="item.content" class="text-body-1 mb-6 tw-whitespace-pre-line" />
                    <RouterLink :to="{name: 'News'}" class="tw-underline tw-cursor-pointer">Back to list</RouterLink>
                </div>
            </UiParentCard>
        </v-col>
    </v-row>
</template>
