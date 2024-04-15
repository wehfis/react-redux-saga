import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { tokenReducer } from './reducers/tokenReducer';
import createSagaMiddleware from 'redux-saga';
import { rootWatcher } from '../sagas';
import { userReducer } from './reducers/userReducer';
import { boardReducer } from './reducers/boardReducer';
import { taskReducer } from './reducers/taskReducer';
import { categoryReducer } from './reducers/categoryReducer';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    token: tokenReducer,
    user: userReducer,
    board: boardReducer,
    category: categoryReducer,
    task: taskReducer
});

export const setupStore = () => {
    const store = configureStore({
        reducer: rootReducer,
        
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
    })
    sagaMiddleware.run(rootWatcher);

    return store;
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']