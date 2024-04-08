import { applyMiddleware, combineReducers, configureStore } from '@reduxjs/toolkit';
import { tokenReducer } from './reducers/tokenReducer';
import createSagaMiddleware from 'redux-saga';
import { rootWatcher } from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    token: tokenReducer,
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