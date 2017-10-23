<template>
  <div class="posts level is-verticle">
    <router-link class="button ml-auto is-primary is-outlined" :to="'/create'">
        New Post
    </router-link>
    <table class="table is-fullwidth is-striped">
      <thead>
        <tr>
          <th class="post-title" @click="sortBy('title')">Title</th>
          <th class="post-date is-small" @click="sortBy('createdAt')">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr class="post-item" v-for="post in sortedPosts" :key="post._id">
          <td>
             <div class="media" >
              <figure class="media-left" v-if="post.image">
                <p class="image is-32x32">
                  <img :src="getImage(post.image)">
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p class="level">
                    <router-link :to="'/post/' + post._id">
                      {{ post.title }}
                    </router-link>
                  </p>
                </div>
              </div>
            </div>
          </td>
          <td>{{ post.createdAt | fromNow }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import * as _ from 'lodash';

export default {
    name: 'Posts',
    data() {
        return {
            posts: null,
            key: 'createdAt',
            reverse: true
        };
    },
    mounted() {
        this.fetch();
    },
    computed: {
        sortedPosts() {
            return _.orderBy(this.posts, [this.key], [this.reverse ? 'desc' : 'asc']);
        }
    },
    methods: {
        getImage(path) {
            return `${this.$http.defaults.baseURL}/${path}`;
        },
        sortBy(key) {
            this.key = key;
            this.reverse = !this.reverse;
        },
        async fetch() {
            try {
                const { data } = await this.$http.get('/posts');
                this.posts = data.data;
            } catch (e) {
                console.warn('Cannot connect to the server.');
            }
        }
    }
};
</script>

<style scoped lang="scss">
@import "~bulma/sass/utilities/_all";
@import "~bulma/sass/layout/section";
.posts {
    @extend .section;
    th {
        cursor: pointer;
    }
    .is-small {
        width: 30%;
    }
}
</style>
