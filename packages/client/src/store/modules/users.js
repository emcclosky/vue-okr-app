'use strict';
import store from '..';
import { axiosHandler } from '../../services/axiosService'

export default {
	state: {

  },
	mutations: {

  },
	actions: {
		async updateProfile({commit}, payload){
			try {
				const axiosParams = {
					url: 'http://127.0.0.1:8000/profile',
					method: 'post',
					payload
				};

				const updatedProfile = await axiosHandler(axiosParams);
				return store.dispatch('updateUserData', updatedProfile.data);
			} catch (err) {
        throw new Error(err)
			}
    },
  }
}