import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { mount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
import OkrDashboard from "./index.vue";

const localVue = createLocalVue();
localVue.use(Vuex)
localVue.use(VueRouter)
const router = new VueRouter()

describe("OkrDashboard", () => {
    it("adds active class to selected Okr type", () => {
        const mockActions = {
            setOkrData: jest.fn()
        }

        const store = new Vuex.Store({
            state: {
                allOkrData: []
            },
            actions: mockActions
        });

        const wrapper = mount(OkrDashboard, {
            localVue,
            store,
            router,
        });
        const types = wrapper.find('.okr-dashboard__okr-types');
        const button = types.find('button');
        button.trigger('click');
        expect(button.classes()).toContain('active');
    });

    it('route-link goes to /okrs/okr/new', () => {
        const mockActions = {
            setOkrData: jest.fn()
        }

        const store = new Vuex.Store({
            state: {
                allOkrData: []
            },
            actions: mockActions
        });

        const wrapper = mount(OkrDashboard, {
            localVue,
            store,
            router,
        });
        const button = wrapper.find('.okr-dashboard__add-button');
        expect(button.props('to')).toBe('/okrs/okr/new');
    });

    it('okr data should be dispatched when editOkr is invoked', async () => {
        const mockActions = {
            setOkrData: jest.fn()
        }

        const store = new Vuex.Store({
            state: {
                allOkrData: []
            },
            actions: mockActions
        });

        const wrapper = mount(OkrDashboard, {
            localVue,
            store,
            router,
        });
        const okr = {
            _id: '1234'
        }
        await wrapper.vm.editOkr(okr);
        expect(mockActions.setOkrData).toHaveBeenCalled();
    });

    it('should redirect to /okr/okr/${okr._id} when editOkr is invoked', async () => {
        const mockActions = {
            setOkrData: jest.fn()
        }

        const store = new Vuex.Store({
            state: {
                allOkrData: []
            },
            actions: mockActions
        });

        const wrapper = mount(OkrDashboard, {
            localVue,
            store,
            router,
        });
        router.push('/okrs');
        const okr = {
            _id: '1234'
        }
        await wrapper.vm.editOkr(okr);
        expect(router.currentRoute.fullPath).toEqual("/okrs/okr/1234");
    });

})