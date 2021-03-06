<template>
    <div class="section">
        <h1 class="title is-size-3">{{ pageName }} Post</h1>
        <form class="form" @submit.prevent="submit">
            <div class="field">
                <div class="control">
                <input class="input" type="text" name="title" placeholder="What's it about..." v-model="title" required>
                </div>
            </div>
             <div class="field">
                <div class="control">
                    <div class="file has-name is-fullwidth">
                        <label class="file-label">
                            <input class="file-input" type="file" name="image" @change="onFileChange">
                            <span class="file-cta">
                                <span class="file-icon">
                                    <i class="fa fa-upload"></i>
                                </span>
                                <span class="file-label">
                                     Choose a thumbnial...
                                </span>
                            </span>
                            <span class="file-name">
                                {{ image ? image.name : '' }}
                            </span>
                        </label>
                    </div>
                </div>
             </div>
            <div class="field">
                <div class="control">
                    <vue-html5-editor :content="body" :height="500" @change="onContentUpdate"></vue-html5-editor>
                </div>
            </div>
            <div class="field is-grouped">
                <div class="control">
                    <button id="submit-btn" class="button is-link" v-text="buttonName"></button>
                </div>
                <div class="control">
                    <button class="button is-text" type="button" @click="clear">Cancel</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'PostForm',
        data() {
            return {
                title: null,
                image: null,
                body: 'Start your story...'
            };
        },
        computed: {
            buttonName() {
                return this.isEditMode ? 'Update' : 'Post';
            },
            isEditMode() {
                return this.$route.name === 'EditPost';
            },
            pageName () {
                return this.isEditMode ? 'Edit' : 'Create';
            }
        },
        mounted() {
            if (this.isEditMode) {
                this.fetch();
            }
        },
        methods: {
            async fetch() {
                try {
                    const { id } = this.$route.params;
                    const { data } = await this.$http.get(`/posts/${id}`);
                    this.title = data.data.title;
                    this.body = data.data.body;
                } catch (e) {
                    console.error(e);
                }
            },
            onContentUpdate(content) {
                this.body = content;
            },
            onFileChange(e) {
                const files = e.target.files || e.dataTransfer.files;
                if (files.length) {
                    this.image = files[0];
                }
            },
            async createPost(data) {
                try {
                    await this.$http.post('/posts', data, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                } catch (e) {
                    console.error(e);
                }
            },
            async updatePost(data) {
                try {
                    const { id } = this.$route.params;
                    await this.$http.put(`/posts/${id}`, data, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                } catch (e) {
                    console.error(e);
                }
            },
            submit() {
                const formData = new FormData();
                formData.append('title', this.title);
                formData.append('body', this.body);

                if (this.image) {
                    formData.append('image', this.image);
                }

                this[this.isEditMode ? 'updatePost' : 'createPost'](formData).then(() => {
                    this.$router.push('/');
                });
            },
            clear() {
                this.title = null;
                this.body = 'Start your story...';
                this.image = null;
            }
        }
    };
</script>

<style lang="scss">
    $fa-font-path: "~font-awesome/fonts";
    @import '~font-awesome/scss/font-awesome';
</style>


