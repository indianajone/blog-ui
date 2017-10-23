import Vue from 'vue';
import Router from 'vue-router';
import Posts from '@/components/Posts';
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
            path: '/create',
            name: 'CreatePost',
            component: PostForm
        }
    ]
});
