<template>
    <div class="post" v-if="post">
        <div class="level">
            <img class="image is-32x32" :src="this.getImage(post.image)" >
            <h1 class="title">
                {{ post.title }}
                <span class="subtitle">{{ post.createdAt | fromNow }}</span>
            </h1>
        </div>
        <p v-html="post.body"></p>
    </div>
</template>

<script>
    export default {
        name: 'ImageView',
        props: ['post'],
        methods: {
            getImage(path) {
                return `${this.$http.defaults.baseURL}/${path}`;
            }
        }
    };
</script>

<style scoped>
    .title {
        margin: 0 auto 0 .3em;
    }
</style>

