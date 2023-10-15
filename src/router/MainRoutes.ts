const MainRoutes = {
    path: '/main',
    meta: {
        requiresAuth: true
    },
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            name: 'Dashboard',
            path: '/',
            component: () => import('@/views/dashboard/index.vue')
        },
        {
            name: 'News',
            path: '/news',
            component: () => import('@/views/news/NewsPage.vue')
        },
        {
            name: 'NewsDetail',
            path: '/news/:id',
            component: () => import('@/views/news/NewsDetail.vue')
        },
        {
            name: 'Post',
            path: '/post',
            component: () => import('@/views/news/PostNews.vue')
        },
        {
            name: 'PostEdit',
            path: '/post/:id',
            component: () => import('@/views/news/PostNews.vue')
        },
    ]
};

export default MainRoutes;
