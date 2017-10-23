<template>
    <div class="section is-flex is-verticle is-block-center">
        <router-link class="button ml-auto is-primary is-outlined" :to="'/post/edit/' + post._id">
            Edit
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'Post',
    data() {
        return {
            post: {},
        };
    },
    methods: {
        async fetch() {
            const { id } = this.$route.params;
            const { data } = await this.$http.get(`/posts/${id}`);
            this.post = data.data;
        },
        titleCase(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    }
};
</script>

<style lang="scss">
    .post {
        margin: 1em;
    }
</style>

