
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
      { path: '', component: () => import('pages/Admin/AdminTimetables.vue'), name: 'Admin Timetable' },
      { path: 'adminNewsfeed', component: () => import('pages/Admin/AdminNewsFeed.vue'), name: 'Admin Newsfeed' },
      { path: 'adminTeachers', component: () => import('pages/Admin/AdminTeachers.vue'), name: 'Admin Techers' },
      { path: 'adminChat', component: () => import('pages/Admin/AdminMessages.vue'), name: 'Admin Messages' }
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
