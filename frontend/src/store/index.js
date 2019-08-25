import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';

import history from '../routes/history';
import rootReducer from './ducks';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middlwares = [sagaMiddleware, routerMiddleware(history)];

const store = createStore(rootReducer(history), applyMiddleware(...middlwares));

sagaMiddleware.run(rootSaga);

export default store;
