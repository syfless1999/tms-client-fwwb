import { fetchWorkcells, addWorkcell } from '@/services/user';
const WorkcellModel = {
    namespace: 'workcell',
    state: {
        workcells: [],
    },
    effects: {
        *fetch(_, { call, put }) {
            console.log('fetch');
            
            const response = yield call(fetchWorkcells);
            console.log(response);
            
            yield put({
                type: 'save',
                payload: response.data.workcells,
            });
        },
        *append({ payload }, { call, put }) {
            const response = yield call(addWorkcell, payload);
            yield put({
                type: 'add',
                payload: response.data.workcell
            })
        },
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, workcells: payload };
        },
        add(state, { payload }) {
            return { ...state, workcells: [...state.workcells, payload] };
        },
    }
}

export default WorkcellModel;
