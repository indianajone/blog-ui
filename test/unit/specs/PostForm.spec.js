import { mount } from 'vue-test-utils';
import PostForm from '@/components/PostForm';
import { createRenderer } from 'vue-server-renderer';

describe('PostForm.vue', () => {

    it('should render as create mode.', () => {
        const wrapper = mount(PostForm, {
            mocks: {
                $route: {
                    name: 'CreatePost'
                }
            }
        });

        expect(wrapper.find('.title').text()).toBe('Create Post');

        const renderer = createRenderer();
        renderer.renderToString(wrapper.vm, (err, str) => {

            if (err) {
                throw new Error(err);
            }
            expect(str).toMatchSnapshot();

        });
    });

    it('should render as edit mode.', () => {
        const wrapper = mount(PostForm, {
            mocks: {
                $route: {
                    name: 'EditPost',
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

        expect(wrapper.find('.title').text()).toBe('Edit Post');

        const renderer = createRenderer();
        renderer.renderToString(wrapper.vm, (err, str) => {

            if (err) {
                throw new Error(err);
            }
            expect(str).toMatchSnapshot();

        });
    });

    it('should submit a post to the server.', () => {
        // eslint-disable-next-line no-unused-vars
        const postMock = jest.fn((...args) => Promise.resolve());
        const wrapper = mount(PostForm, {
            mocks: {
                $route: {
                    name: 'CreatePost'
                },
                $router: {
                    push: () => Promise.resolve()
                },
                $http: {
                    post: postMock
                }

            }
        });

        wrapper.setData('title', 'HelloWorld');
        wrapper.setData('body', 'Write someting great.');

        wrapper.find('#submit-btn').trigger('click');

        const [args] = postMock.mock.calls;
        expect(args[0]).toBe('/posts');
        expect(args[1]).toBeInstanceOf(FormData);
        expect(args[2].headers['Content-Type']).toBe('multipart/form-data');
    });

});
