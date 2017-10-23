import Vue from 'vue';
import Router from 'vue-router';
import Posts from '@/components/Posts';
import Post from '@/components/Post';
import PostForm from '@/components/PostForm';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Posts',
            component: Posts,
        },
        {
            path: '/post/:id',
            name: 'Post',
            component: Post
        },
        {
            path: '/create',
            name: 'CreatePost',
            component: PostForm
        }
    ]
});
