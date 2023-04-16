export const userFunctions = [{
    url: '/pages/meeting/index',
    title: '会议室预约',
    bg: 'linear-gradient(#1A237E,#2196F3);'
}, {
    url: '/pages/meeting-record/index',
    title: '会议室记录',
    bg: 'linear-gradient(#87CEFA,#00BFFF);'
}, {
    url: '/pages/notice/index',
    title: '公告',
    bg: 'linear-gradient(#607D8B,#1976D2);'
}]

export const adminFunctions = [{
        url: '/pages/admin/branch/index',
        title: '部门管理',
        bg: 'linear-gradient(#1A237E,#2196F3);'
    },
    {
        url: '/pages/admin/staff/list',
        title: '员工管理',
        bg: 'linear-gradient(#1A237E,#2196F3);'
    },
    {
        url: '/pages/admin/meeting/list',
        title: '会议室管理',
        bg: 'linear-gradient(#1A237E,#2196F3);'
    },
    {
        url: '/pages/admin/meeting/approve',
        title: '会议室审批',
        bg: 'linear-gradient(#1A237E,#2196F3);'
    },
    {
        url: '/pages/admin/notice/index',
        title: '公告管理',
        bg: 'linear-gradient(#1A237E,#2196F3);'
    }
]

export const ROLE = {
    USER: 'user',
    ADMIN: 'admin'
}

export const bookingStatus = {
    0: {
        text: '待审批',
        color: '#222'
    },
    1: {
        text: '已通过',
        color: '#4cd964'
    },
    2: {
        text: '已拒绝',
        color: '#dd524d'
    },
    3: {
        text: '已取消',
        color: '#222'
    }
}