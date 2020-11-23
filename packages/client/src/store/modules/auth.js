'use strict';
import router from '../../router';
import { axiosHandler } from '../../services/axiosService'

export default {
	state: {
		userData: null,
    authorized: false,
    },
	mutations: {
		SET_USER_DATA(state, data){
			state.userData = data;
		},
		SET_AUTHORIZED(state, data){
      state.authorized = data;
		}
  },
	actions: {
		setUserData({commit}, data){
			console.log('session Data', data)
			for(let key in data) {
				sessionStorage.setItem(key, data[key]);
			}
			commit('SET_USER_DATA', sessionStorage);
		},
		setAuthorized({commit}, data){
			commit('SET_AUTHORIZED', data);
		},
		async registerNewUser({commit}, payload){
			try {
				const axiosParams = {
					url: 'http://127.0.0.1:8000/register',
					method: 'post',
					payload
				};

				const success = await axiosHandler(axiosParams);
				// log for successes: no modal system yet
				console.log(success);
				router.push('/login');
			} catch (err) {
        throw new Error(err)
			}
		},
		async login({commit, dispatch}, payload){
			try {
				const axiosParams = {
					url: 'http://127.0.0.1:8000/login',
					method: 'post',
					payload
				};
				const response = await axiosHandler(axiosParams);
				const userData = response.data;
				dispatch('setUserData', userData)
				commit('SET_AUTHORIZED', true);
				router.push('/okrs');
			} catch (err) {
				if(err.response && err.response.status === 401)
					commit('SET_AUTHORIZED', false);
				throw new Error(err)
			}
		},
		async logout({commit}){
			try {
				const axiosParams = {
					url: 'http://127.0.0.1:8000/logout',
					method: 'post'
				};

				await axiosHandler(axiosParams);
				sessionStorage.clear();
				this.dispatch('setUserData', null);
				commit('SET_AUTHORIZED', false);
				router.push('/');
			} catch (err) {
				if(err.response &&  err.response.status === 401)
					commit('SET_AUTHORIZED', false);
				console.error('err from store logout', err);
			}
		},
		async sendPasswordReset({commit}, payload){
			try {
				const axiosParams = {
					url: 'http://127.0.0.1:8000/reset',
					method: 'post',
					payload
				};

				const response = await axiosHandler(axiosParams);
				return response;
			} catch (err) {
				console.log('err from store login', err);
				return err;
			}
		},
		async validateRequestToken({commit}, payload){
			const { token, user } = payload;
			try {
				const axiosParams = {
					url: `http://127.0.0.1:8000/reset/${token}?user=${user}`,
					method: 'get',
				};

				return await axiosHandler(axiosParams);
			} catch (err) {
				console.log('err from store login', err);
				return err;
			}
		},
		async createNewPassword({commit}, payload){
			try {
				const axiosParams = {
					url: `http://127.0.0.1:8000/new-password`,
					method: 'post',
					payload
				};

				return await axiosHandler(axiosParams);
			} catch (err) {
				console.log('err from store login', err);
				return err;
			}
    },
		// Validates the current user and removes data from session storage if
		//expired
		validate({ commit, state }) {
			const authorized = sessionStorage.getItem('authorized');
			const expiration = sessionStorage.getItem('expiration');
			const currentDate = new Date().toISOString();
			if(authorized && expiration >= currentDate) {
				commit('SET_AUTHORIZED', true);
				return true;
			} else {
				sessionStorage.clear();
				commit('SET_AUTHORIZED', false);
				return false;
			}
		},
	}
}