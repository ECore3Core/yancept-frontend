import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/MainPage.vue'

// Пока для страницы преподавателя создаём заглушку (позже можно добавить реальную реализацию)
const TeacherPage = {
	template: '<div>Страница преподавателя (будет реализована позже)</div>',
}

const routes = [
	{
		path: '/',
		name: 'MainPage',
		component: MainPage,
	},
	{
		path: '/teacher/:id',
		name: 'TeacherPage',
		component: TeacherPage,
		props: true,
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
