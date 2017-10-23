<template>
    <div class="section is-flex is-verticle is-block-center">
        <router-link class="button ml-auto is-primary is-outlined" :to="'/edit/' + post._id">
            Edit
        </router-link>
        <component :is="view" :post="post"></component>
    </div>
</template>

<script>
import TextView from '@/components/views/TextView';
import ImageView from '@/components/views/ImageView';

export default {
    name: 'Post',
    components: { TextView, ImageView },
    data() {
        return {
            post: {},
            view: null
        };
    },
    mounted() {
        this.fetch().then(() => {
            this.loadView();
        });
    },
    methods: {
        async fetch() {
            const { id } = this.$route.params;
            const { data } = await this.$http.get(`/posts/${id}`);
            this.post = data.data;
        },
        loadView() {
            this.view = `${this.titleCase(this.post.type)}View`;
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

