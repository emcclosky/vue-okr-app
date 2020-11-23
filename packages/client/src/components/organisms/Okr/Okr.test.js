import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { mount, createLocalVue } from "@vue/test-utils";
import Okr from "./index.vue";

jest.mock('axios');
import axios from 'axios'

const localVue = createLocalVue();
localVue.use(Vuex)
localVue.use(VueRouter)
const router = new VueRouter()

describe("Okr", () => {
    it('renders properly', () => {
        const store = new Vuex.Store({
            state: {
                currentOkrData: {
                    objective: 'I am an objective',
                    keyResults: [{ result: 'I am a key result' }],
                    _id: '1234'
                }
            },
        });

        const wrapper = mount(Okr, {
            localVue,
            store,
            router,
            data(){
                return {
                    submissionData: {
                        objective: 'objective',
                        keyResults: []
                    }
                }
            }
        });
        expect(wrapper.vm).toBeTruthy();
    });

    it('axios put should be called when handleSubmit is invoked', async () => {
        const store = new Vuex.Store({
            state: {
                currentOkrData: {
                    objective: 'I am an objective',
                    keyResults: [{ result: 'I am a key result' }],
                    _id: '1234'
                }
            },
        });

        const wrapper = mount(Okr, {
            localVue,
            store,
            router,
            data(){
                return {
                    submissionData: {
                        objective: 'objective',
                        keyResults: []
                    }
                }
            }
        });
        await wrapper.vm.handleSubmit();
        expect(axios).toBeCalledWith({"method": "put","data": "{\"objective\":\"I am an objective\",\"keyResults\":[{\"result\":\"I am a key result\"}],\"id\":\"1234\"}", "headers": {"Content-Type": "application/json"}, "url": "http://localhost:8000/okrs/okr/1234"});
    });

    it('router should redirect to /okrs after axios put', async () => {
        const store = new Vuex.Store({
            state: {
                currentOkrData: {
                    objective: 'I am an objective',
                    keyResults: [{ result: 'I am a key result' }],
                    _id: '1234'
                }
            },
        });

        const wrapper = mount(Okr, {
            localVue,
            store,
            router,
            data(){
                return {
                    submissionData: {
                        objective: 'objective',
                        keyResults: []
                    }
                }
            }
        });
        router.push('/okrs/okr/1234')
        await wrapper.vm.handleSubmit();
        expect(router.currentRoute.fullPath).toEqual("/okrs");
    });

    it('adds new key result input when Add Key Result clicked', async () => {
        const store = new Vuex.Store({
            state: {
                currentOkrData: {
                    objective: 'I am an objective',
                    keyResults: [{ result: 'I am a key result' }],
                    _id: '1234'
                }
            },
        });

        const wrapper = mount(Okr, {
            localVue,
            store,
            router,
            data(){
                return {
                    submissionData: {
                        objective: 'objective',
                        keyResults: []
                    }
                }
            }
        });
       await wrapper.find('.okr-form__add-more-button').trigger('click');
        expect(wrapper.vm.submissionData.keyResults.length).toEqual(2);
    });

    it('click cancel calls $router.go with -1 param', async () => {
        const store = new Vuex.Store({
            state: {
                currentOkrData: {
                    objective: 'I am an objective',
                    keyResults: [{ result: 'I am a key result' }],
                    _id: '1234'
                }
            },
        });

        const wrapper = mount(Okr, {
            localVue,
            store,
            router,
        });
        const spy = jest.spyOn(router, 'go');
        await wrapper.find('.button--border').trigger('click');
        expect(spy).toHaveBeenCalledWith(-1);
    });

});