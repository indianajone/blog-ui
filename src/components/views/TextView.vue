<template>
    <div class="post" v-if="post">
        <h1 class="title">
        {{ post.title }}
        <span class="subtitle">{{ post.createdAt }}</span>
        </h1>
        <p v-html="post.body"></p>
    </div>
</template>

<script>
    export default {
        name: 'TextView',
        props: ['post']
    };
</script>
