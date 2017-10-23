import { mount } from 'vue-test-utils';
import Posts from '@/components/Posts';
import { createRenderer } from 'vue-server-renderer';

describe('Posts.vue', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = mount(Posts, {
            mocks: {
                $http: {
                    defaults: { baseURL: 'localhost' },
                    get() {
                        return { data: {
                            data: [
                                {
                                    title: 'New Post',
                                    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                                    _id: '59eccf0e4e8b8f72705ac87d',
                                    createdAt: '2017-10-02T17:02:06.051Z',
                                    type: 'text'
                                },
                                {
                                    title: 'Other Post',
                                    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                                    _id: '59eccf0e4e8b8f72705ac87d',
                                    createdAt: '2017-11-22T17:01:16.051Z',
                                    type: 'text'
                                },
                                {
                                    title: 'Another Post',
                                    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                                    _id: '59eccf0e4e8b8f72705ac87d',
                                    createdAt: '2016-07-18T17:01:16.051Z',
                                    type: 'text'
                                }
                            ]
                        } };
                    }
                }
            }
        });
    });

    it('should render all posts.', () => {
        const rows = wrapper.findAll('.post-item');

        expect(rows.at(0).find('p').text()).toContain('Other Post');
        expect(rows).toHaveLength(3);
    });

    it('should return full image path.', () => {
        expect(wrapper.vm.getImage('/uploads/image.jpg'))
            .toEqual('localhost//uploads/image.jpg');
    });

    it('should sort posts by alphabet.', () => {
        const button = wrapper.find('.post-title');
        button.trigger('click');

        expect(wrapper.findAll('.post-item').at(0).find('p').text()).toContain('Another Post');
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
