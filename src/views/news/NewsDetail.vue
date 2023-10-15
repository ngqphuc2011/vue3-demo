<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { router } from '@/router';
const apiUrl = import.meta.env.VITE_API_URL
const route = useRoute()

const item = ref<any>({})
const itemId = route.params.id
fetch(apiUrl + '/api/news/' + itemId + '?populate=*').then(response => response.json()).then(res => {
    item.value = res.data;
})
const onClickDeleteButton = () => {
    fetch(apiUrl + '/api/news/' + itemId, {
        method: 'DELETE',
    }).then(() => {
        router.push({
            name: 'News',
        })
    }).catch((e) => {})
}
const onClickEditButton = () => {
    router.push({
        name: 'PostEdit',
        params: {
            id: itemId,
        }
    })
}
</script>
<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard :title="item.title">
                <div class="pa-7 pt-1">
                    <p class="text-body-2 mb-2 tw-text-gray-500">{{ item.summary }}</p>
                    <v-img v-if="item.img" :src="apiUrl + item.img.url" class="mb-2" height="400"> </v-img>
                    <p v-html="item.content" class="text-body-1 mb-6 tw-whitespace-pre-line" />
                    <div class="tw-flex tw-justify-between">
                        <RouterLink :to="{ name: 'News' }" class="tw-underline tw-cursor-pointer">Back to list</RouterLink>
                        <div>
                            <span class="tw-underline tw-cursor-pointer mr-2" @click="onClickDeleteButton">Delete</span>
                            <span class="tw-underline tw-cursor-pointer" @click="onClickEditButton">Edit</span>
                        </div>
                    </div>
                </div>
            </UiParentCard>
        </v-col>
    </v-row>
</template>
