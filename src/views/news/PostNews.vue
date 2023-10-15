<script setup lang="ts">
import { router } from '@/router';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
const apiUrl = import.meta.env.VITE_API_URL
const route = useRoute();
const itemId = route.params.id;

const title = ref<string>('');
const summary = ref<string>('');
const content = ref<string>('');
const image = ref<Array<File>>([]);
const imageUrl = ref<string | ArrayBuffer | null>('');
const isImageChanged = ref<boolean>(false);
const isLoading = ref<boolean>(false);

const onFileChange = (e: any) => {
    imageUrl.value = '';
    isImageChanged.value = true;
    const files = e.target.files || e.dataTransfer.files
    if (!files.length) { return }
    createImage(files[0])
}
const onFileClear = () => {
    imageUrl.value = '';
}
const createImage = (file: any) => {
    const reader = new FileReader()
    reader.onload = (e) => {
        if (e.target) {
            imageUrl.value = e.target.result;
        }
    }
    reader.readAsDataURL(file)
}
const onClickPostButton = () => {
    if (!title.value || !summary.value || !content.value || !image.value.length) {
        return
    }
    isLoading.value = true;
    const formData = new FormData()
    formData.append('files', image.value[0])
    const options = {
        method: 'POST',
        body: formData,
    };
    if (isImageChanged.value) {
        fetch(apiUrl + '/api/upload', options).then((res) => res.json()).then((res) => {
            const imageId = res[0].id
            const data = {
                title: title.value,
                summary: summary.value,
                content: content.value,
                img: imageId,
            }
            postNews(data);
        }).catch((e) => {
            isLoading.value = false;
        })
    } else {
        const data = {
            title: title.value,
            summary: summary.value,
            content: content.value,
        }
        postNews(data);
    }
}
const postNews = (data: any) => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data))
    const newsUrl = !!itemId ? apiUrl + '/api/news/' + itemId : apiUrl + '/api/news';
    const newsOptions = !!itemId ? {
        method: 'PUT',
        body: formData,
    } : {
        method: 'POST',
        body: formData,
    };
    fetch(newsUrl, newsOptions).then(() => {
        isLoading.value = false;
        if (!!itemId) {
            router.push({
                name: 'NewsDetail',
                params: {
                    id: itemId,
                }
            })
        } else {
            router.push({
                name: 'News',
            })
        }
    }).catch((e) => {
        isLoading.value = false;
    })
}

if (!!itemId) {
    fetch(apiUrl + '/api/news/' + itemId + '?populate=*').then(response => response.json()).then(res => {
        const data = res.data || {};
        title.value = data.title;
        summary.value = data.summary;
        content.value = data.content;
        if (data.img) {
            const imgUrl = apiUrl + data.img.url;
            imageUrl.value = imgUrl;
            fetch(imgUrl)
                .then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], 'image.jpg', { type: blob.type });
                    image.value = [file];
                });
        }
    })
}
</script>

<template>
    <v-row class="d-flex mb-3">
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Title</v-label>
            <v-text-field v-model="title" variant="outlined" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Summary</v-label>
            <v-text-field v-model="summary" variant="outlined" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Content</v-label>
            <v-textarea v-model="content" variant="outlined" hide-details color="primary"></v-textarea>
        </v-col>
        <v-col cols="6">
            <v-label class="font-weight-bold mb-1">Image</v-label>
            <v-file-input v-model="image" accept="image/png, image/jpeg, image/bmp" placeholder="Pick an image"
                prepend-icon="" append-inner-icon="mdi-camera" variant="outlined" @change="onFileChange"
                @click:clear="onFileClear"></v-file-input>
        </v-col>
        <v-col cols="6">
            <v-img class="preview-image rounded border-grey" :src="imageUrl" :height="200">
                <template v-slot:placeholder>
                    <div class="tw-flex tw-items-center tw-justify-center tw-h-full">Preview Image</div>
                </template>
            </v-img>
        </v-col>
        <v-col cols="12">
            <v-btn :loading="isLoading" color="primary" size="large" block flat @click="onClickPostButton">Post</v-btn>
        </v-col>
    </v-row>
</template>

<style scoped>
.preview-image {
    border: #BDBDBD 1px solid;
}
</style>