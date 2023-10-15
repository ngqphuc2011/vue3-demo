<script setup lang="ts">
import { ref } from 'vue';
const apiUrl = import.meta.env.VITE_API_URL
const headers = [
    { title: 'Exchanges', key: 'name', width: '30%' },
    { title: '24h trade volume', key: 'volume', width: '30%' },
    { title: 'Markets', key: 'market', width: '30%' },
    { title: 'Recommended', key: 'recommended', width: '10%' },
]
const items = ref([]);
fetch(apiUrl + '/api/exchanges?populate=*&pagination[limit]=160').then(response => response.json()).then(res => {
    items.value = res.data;
})
const onClickTableRow = (e: Event, { item }: any) => {
    window.open(item.raw.url, '_blank');
}

</script>
<template>
    <v-card elevation="10" class="">
        <v-card-item class="pa-6">
            <v-card-title class="text-h5 pt-sm-2">Crypto exchanges ranked by trading volume</v-card-title>
            <v-card-subtitle class="text-h6 pt-sm-2 pb-7">Compare all 160 top crypto exchanges. The list is ranked by
                trading volume.</v-card-subtitle>
            <v-data-table :headers="headers" :items="items" class="month-table" @click:row="onClickTableRow">
                <template v-slot:item.name="{ item }">
                    <div class="d-flex">
                        <v-img class="mr-2" :width="20" :src="apiUrl + item.raw.img.url" inline />
                        <span class="font-weight-bold">{{ item.raw.name }}</span>
                    </div>
                </template>
                <template v-slot:item.volume="{ item }">
                    <span>$ {{ parseInt(item.raw.volume).toLocaleString() }}</span>
                </template>
                <template v-slot:item.market="{ item }">
                    <span>{{ parseInt(item.raw.market).toLocaleString() }}</span>
                </template>
                <template v-slot:item.recommended="{ item }">
                    <v-chip v-if="item.raw.recommended" class="text-body-1 bg-success" color="white" size="small">
                        Recommended
                    </v-chip>
                </template>
            </v-data-table>
        </v-card-item>
    </v-card>
</template>
