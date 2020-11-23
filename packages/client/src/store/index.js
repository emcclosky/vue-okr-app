import { createStore } from 'vuex';
import modules from './modules'

export default createStore({
	state: {
		clientWidth: null,
		resizeListener: false,
		scrollPos: null,
		menuOpen: false,
		searchOpen: false,
		dialogOpen: false,
	},
	mutations: {
		SET_CLIENT_WIDTH(state, data){
			state.clientWidth = data;
		},
		SET_SCROLL_POS(state, data){
			state.scrollPos = data;
		},
		MENU_OPEN(state, data){
			state.menuOpen = data;
		},
		SEARCH_OPEN(state, data){
			state.searchOpen = data;
		},
		DIALOG_OPEN(state, data){
			state.dialogOpen = data;
		},
		SET_RESIZE_LISTENER(state, data){
			state.setResizeListener = data;
		},
	},
	actions: {
		setClientWidth({commit}, data){
			commit('SET_CLIENT_WIDTH', data);
		},
		setResizeListener({commit}, data){
			commit('SET_RESIZE_LISTENER', data);
		},
		setScrollPos({commit}, data){
			commit('SET_SCROLL_POS', data);
		},
		menuOpen({commit}, data){
			commit('MENU_OPEN', data);
		},
		searchOpen({commit}, data){
			commit('SEARCH_OPEN', data);
		},
		dialogOpen({commit}, data){
			commit('DIALOG_OPEN', data);
		}
	},
	modules
});