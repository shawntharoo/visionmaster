
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), name: 'Home' },
      { path: 'timetable', component: () => import('pages/TimetablePage.vue'), name: 'Timetable' },
      { path: 'teachers', component: () => import('pages/TeachersPage.vue'), name: 'Teachers' },
      { path: 'newsfeed', component: () => import('pages/NewsFeed.vue'), name: 'newsfeed' },
      { path: 'aboutus', component: () => import('pages/AboutUs.vue'), name: 'AboutUs' },
      { path: 'contactus', component: () => import('pages/ContactUs.vue'), name: 'contactus' }
    ]
  },
  {
    name: 'LoginIn',
    path: '/login',
    component: () => import('pages/LoginPage.vue')
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Admin/Timetables.vue'), name: 'Timetable' },
      { path: 'adminNewsfeed', component: () => import('pages/Admin/AdminNewsFeed.vue'), name: 'AdminNewsfeed' }
    ],
    meta: { requireLogin: true }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
