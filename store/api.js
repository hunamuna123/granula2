import { defineStore } from 'pinia'

export const api = defineStore('apiUrl', {
	state: () => ({
		url: 'https://api.granula.raitokyokai.tech/',
	}),
})
