import moment from 'moment';

// mock data
// 某个曲线
const visitData = [];
const beginDay = new Date().getTime();
const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];

for (let i = 0; i < fakeY.length; i += 1) {
    visitData.push({
        x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
        y: fakeY[i],
    });
}

// 夹具数量统计
const toolInfo = {
    // 夹具实体数量
    toolNum: 3680,
    // 夹具定义数量
    tDefNum: 24,
}

// 使用信息统计
const useInfo = {
    // 使用总次数（出库总次数）
    allUseRecordNum: 16232,
    // 今日使用出库总次数
    todayUseRecordNum: 321
};

// 故障（保修）信息统计
const failureInfo = {
    // 总次数
    failureNum: 324,
    // 故障率：有报修记录的夹具数 / 总夹具数
    failureRate: 0.4536
};

//  报废夹具信息统计
const scrapInfo = {
    // 报废总数
    scrapNum: 124,
    // 报废率
    scrapRate: 0.1536
};


// 员工职位分布
const userInfo = [
    {
        x: 'operatorI',
        y: 43,
    },
    {
        x: 'operatorII',
        y: 22,
    },
    {
        x: 'supervisor',
        y: 9,
    },
    {
        x: 'manager',
        y: 11,
    },
    {
        x: 'admin',
        y: 2
    }
];

// 夹具状态分布
const toolStatusInfo = [
    {
        x: 'billing',
        y: 43,
    },
    {
        x: 'indoor',
        y: 22,
    },
    {
        x: 'outdoor',
        y: 9,
    },
    {
        x: 'repairing',
        y: 11,
    },
    {
        x: 'scraped',
        y: 2
    }
]

// 夹具使用次数排名
const tDefUseRank = [
    {
        "tDef": "MOD 3XM2 调谐夹具",
        "useCount": 34
    },
    {
        "tDef": "MOD 3XM2 调谐夹具",
        "useCount": 28
    },
    {
        "tDef": "MOD 3XM2 调谐夹具",
        "useCount": 21
    },
    {
        "tDef": "MOD 3XM2 调谐夹具",
        "useCount": 19
    },
    {
        "tDef": "MOD 3XM2 调谐夹具",
        "useCount": 14
    },
    {
        "tDef": "MOD 3XM2 调谐夹具",
        "useCount": 12
    },
    {
        "tDef": "MOD 3XM2 调谐夹具",
        "useCount": 11
    },
    {
        "tDef": "MOD 3XM2 调谐夹具",
        "useCount": 9
    },
];


const homePageData = {
    "status": "success",
    "data": {
        // 夹具数量统计
        "toolInfo": {
            // 夹具实体数量
            "toolNum": 3680,
            // 夹具定义数量
            "tDefNum": 24
        },
        // 使用信息统计
        "useInfo": {
            // 使用总次数（出库总次数）
            "allUseRecordNum": 16232,
            // 今日使用出库总次数
            "todayUseRecordNum": 321
        },
        // 故障（保修）信息统计
        "failureInfo": {
            // 总次数
            "failureNum": 324,
            // 故障率：有报修记录的夹具数 / 总夹具数
            "failureRate": 0.4536
        },
        //  报废夹具信息统计
        "scrapInfo": {
            // 报废总数
            "scrapNum": 124,
            // 报废率
            "scrapRate": 0.1536
        },
        // 使用（出库）信息统计
        "useHistory": [
            // 一月 至 十二月
            {
                "month": "一月",
                "useNum": 12
            },
            {
                "month": "二月",
                "useNum": 32
            },
            {
                "month": "十二月",
                "useNum": 21
            }
        ],
        // 夹具定义使用排名：按照使用次数对所有 夹具定义 进行排名（前7名）
        "tDefUseRank": [
            {
                "tDef": "MOD 3XM2 调谐夹具",
                "useCount": 34
            },
            {
                "tDef": "MOD 3XM2 调谐夹具",
                "useCount": 28
            },
            {
                "tDef": "MOD 3XM2 调谐夹具",
                "useCount": 21
            },
            {
                "tDef": "MOD 3XM2 调谐夹具",
                "useCount": 19
            }
        ],
        // 用户信息统计（五种权限的用户所占比例数据）
        "userInfo": {
            "operatorI": 0.43,
            "operatorII": 0.22,
            "supervisor": 0.09,
            "manager": 0.11,
            "admin": 0.02
        },
        // 夹具实体当前状态信息统计（）
        "toolStatusInfo": {
            "billing": 0.43,
            "indoor": 0.22,
            "outdoor": 0.09,
            "repairing": 0.11,
            "scraped": 0.02
        }
    }
}


const salesData = [];

for (let i = 0; i < 12; i += 1) {
    salesData.push({
        x: `${i + 1}月`,
        y: Math.floor(Math.random() * 1000) + 200,
    });
}

const searchData = [];

for (let i = 0; i < 50; i += 1) {
    searchData.push({
        index: i + 1,
        keyword: `搜索关键词-${i}`,
        count: Math.floor(Math.random() * 1000),
        range: Math.floor(Math.random() * 100),
        status: Math.floor((Math.random() * 10) % 2),
    });
}

const salesTypeData = [
    {
        x: '家用电器',
        y: 4544,
    },
    {
        x: '食用酒水',
        y: 3321,
    },
    {
        x: '个护健康',
        y: 3113,
    },
    {
        x: '服饰箱包',
        y: 2341,
    },
    {
        x: '母婴产品',
        y: 1231,
    },
    {
        x: '其他',
        y: 1231,
    },
];
const salesTypeDataOnline = [
    {
        x: '家用电器',
        y: 244,
    },
    {
        x: '食用酒水',
        y: 321,
    },
    {
        x: '个护健康',
        y: 311,
    },
    {
        x: '服饰箱包',
        y: 41,
    },
    {
        x: '母婴产品',
        y: 121,
    },
    {
        x: '其他',
        y: 111,
    },
];
const salesTypeDataOffline = [
    {
        x: '家用电器',
        y: 99,
    },
    {
        x: '食用酒水',
        y: 188,
    },
    {
        x: '个护健康',
        y: 344,
    },
    {
        x: '服饰箱包',
        y: 255,
    },
    {
        x: '其他',
        y: 65,
    },
];
const offlineData = [];

for (let i = 0; i < 10; i += 1) {
    offlineData.push({
        name: `Stores ${i}`,
        cvr: Math.ceil(Math.random() * 9) / 10,
    });
}

const offlineChartData = [];

for (let i = 0; i < 20; i += 1) {
    offlineChartData.push({
        x: new Date().getTime() + 1000 * 60 * 30 * i,
        y1: Math.floor(Math.random() * 100) + 10,
        y2: Math.floor(Math.random() * 100) + 10,
    });
}

const radarOriginData = [
    {
        name: '个人',
        ref: 10,
        koubei: 8,
        output: 4,
        contribute: 5,
        hot: 7,
    },
    {
        name: '团队',
        ref: 3,
        koubei: 9,
        output: 6,
        contribute: 3,
        hot: 1,
    },
    {
        name: '部门',
        ref: 4,
        koubei: 1,
        output: 6,
        contribute: 5,
        hot: 7,
    },
];
const radarData = [];
const radarTitleMap = {
    ref: '引用',
    koubei: '口碑',
    output: '产量',
    contribute: '贡献',
    hot: '热度',
};
radarOriginData.forEach(item => {
    Object.keys(item).forEach(key => {
        if (key !== 'name') {
            radarData.push({
                name: item.name,
                label: radarTitleMap[key],
                value: item[key],
            });
        }
    });
});
const getFakeChartData = {
    status: "success",
    data: {
        //   visitData,
        // 夹具信息
        toolInfo,
        // 使用信息
        useInfo,
        // 故障信息
        failureInfo,
        // 报废信息
        scrapInfo,
        // 员工分布数据
        userInfo,
        // 夹具状态分布数据
        toolStatusInfo,
        // 夹具使用次数排名
        tDefUseRank,
        // 夹具月使用次数统计
        salesData,
        // searchData,
        // offlineData,
        // offlineChartData,
        // salesTypeData,
        // salesTypeDataOnline,
        // salesTypeDataOffline,
        // radarData,
    }

};



export default {
    // 'GET  /api/homePageData': getFakeChartData,
};
