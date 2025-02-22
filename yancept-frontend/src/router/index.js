import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import TeacherPage from '@/views/TeacherPage.vue'
import StudentPage from '@/views/StudentPage.vue'

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
	{
		path: '/student/:id',
		name: 'StudentPage',
		component: StudentPage,
		props: true,
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
