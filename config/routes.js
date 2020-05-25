const routes = [
    {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
            {
                name: 'login',
                path: '/user/login',
                component: './user/login',
            },
        ],
    },

    {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
            {
                path: '/',
                component: '../layouts/BasicLayout',
                authority: ['operator 1', 'operator 2', 'supervisor', 'manager', 'admin'],
                routes: [
                    {
                        path: '/',
                        redirect: '/dashboardanalysis',
                    },
                    {
                        name: 'welcome',
                        icon: 'smile',
                        path: '/dashboardanalysis',
                        component: './DashboardAnalysis',
                    },
                    // {
                    //     path: '/welcome',
                    //     name: 'welcome',
                    //     icon: 'smile',
                    //     component: './Welcome',
                    // },
                    {
                        path: '/tdefs',
                        name: 'tdef',
                        icon: 'read',
                        component: './tDefs',
                    },
                    {
                        path: '/tdefs/:id',
                        component: './tDefs/$id',
                    },
                    {
                        path: '/tools/:id',
                        component: './tDefs/tools/$id',
                    },
                    {
                        name: 'bills',
                        icon: 'arrow-right',
                        path: '/bills',
                        authority: ['operator 1', 'operator 2', 'supervisor', 'manager', 'admin'],
                        routes: [
                            {
                                path: '/bills/list',
                                name: 'list',
                                component: './bills',
                            },
                            {
                                name: 'append',
                                path: '/bills/append',
                                component: './bills/billAppend',
                            },
                            {
                                path: '/bills/:id',
                                component: './bills/$id',
                            },
                        ],
                    },
                    {
                        name: 'useRecords',
                        icon: 'logout',
                        path: '/useRecords',
                        authority: ['operator 1', 'admin'],
                        routes: [
                            {
                                path: '/useRecords/list',
                                name: 'list',
                                component: './useRecords',
                            },
                            {
                                name: 'useout',
                                path: '/useRecords/useout',
                                component: './useRecords/useout',
                            },
                            {
                                name: 'usein',
                                path: '/useRecords/usein',
                                component: './useRecords/usein',
                            },
                            {
                                path: '/useRecords/:id',
                                component: './useRecords/$id',
                            },
                        ],
                    },
                    {
                        name: 'scraps',
                        icon: 'inbox',
                        path: '/scraps',
                        authority: ['supervisor', 'manager', 'admin'],
                        routes: [
                            {
                                path: '/scraps/list',
                                name: 'list',
                                component: './scraps',
                            },
                            {
                                name: 'append',
                                path: '/scraps/append',
                                component: './scraps/scrapAppend',
                            },
                            {
                                path: '/scraps/:id',
                                component: './scraps/$id',
                            },
                        ],
                    },
                    {
                        name: 'repairs',
                        icon: 'read',
                        path: '/repairs',
                        authority: ['operator 1', 'operator 2', 'supervisor', 'manager', 'admin'],
                        routes: [
                            {
                                path: '/repairs/list',
                                name: 'list',
                                component: './repairs',
                            },
                            {
                                name: 'append',
                                path: '/repairs/append',
                                component: './repairs/repairAppend',
                            },
                            {
                                path: '/repairs/:id',
                                component: './repairs/$id',
                            },
                        ],
                    },
                    {
                        name: 'userManage',
                        icon: 'user',
                        path: '/usermanage',
                        authority: ['admin'],
                        component: './userManage',
                    },
                    {
                        name: 'accountsettings',
                        icon: 'setting',
                        path: '/accountsettings',
                        component: './AccountSettings',
                    },
                    {
                        name: 'accountcenter',
                        icon: 'smile',
                        path: '/accountcenter',
                        component: './AccountCenter',
                    },
                    {
                        name: 'changetdefs',
                        icon: 'arrow-right',
                        path: '/changetdefs',
                        component: './ChangetDefs',
                    },
                    {
                        component: './404',
                    },
                ],
            },
            {
                component: './404',
            },
        ],
    },
    {
        component: './404',
    },
];

export default routes;