import Post from '@/components/Post';
import { mount } from 'vue-test-utils';
import { createRenderer } from 'vue-server-renderer';

describe('Post.vue', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = mount(Post, {
            mocks: {
                $route: {
                    params: { id: '59eccf0e4e8b8f72705ac87d' }
                },
                $http: {
                    defaults: { baseURL: 'localhost' },
                    get() {
                        return { data: {
                            data: {
                                title: 'New Post',
                                body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                                _id: '59eccf0e4e8b8f72705ac87d',
                                createdAt: '2017-10-02T17:02:06.051Z',
                                type: 'text'
                            }
                        } };
                    }
                }
            }
        });
    });

    it('should matches snapshot', () => {
        const renderer = createRenderer();
        renderer.renderToString(wrapper.vm, (err, str) => {

            if (err) {
                throw new Error(err);
            }
            expect(str).toMatchSnapshot();

        });
    });

});
