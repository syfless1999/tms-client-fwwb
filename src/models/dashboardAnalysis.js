import { fakeChartData } from '../services/homePageData';
import moment from 'moment';

// mock 访问量曲线
const visitData = [];
const beginDay = new Date().getTime();
const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
for (let i = 0; i < fakeY.length; i += 1) {
    visitData.push({
        x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
        y: fakeY[i],
    });
}


const initState = {
    visitData: [],
    // 新加的
    toolInfo: {},
    useInfo:{},
    failureInfo:{},
    scrapInfo:{},
    userInfo:[],
    toolStatusInfo:[],
    tDefUseRank:[],
    salesData: [],
};
const Model = {
    namespace: 'dashboardAnalysis',
    state: initState,
    effects: {
        *fetch(_, { call, put }) {
            const response = yield call(fakeChartData);
            yield put({
                type: 'save',
                payload: response.data,
            });
        },

        *fetchSalesData(_, { call, put }) {
            const response = yield call(fakeChartData);
            yield put({
                type: 'save',
                payload: {
                    salesData: response.salesData,
                },
            });
        },
    },
    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                ...payload,
                visitData: visitData,
            };
        },

        clear() {
            return initState;
        },
    },
};
export default Model;
