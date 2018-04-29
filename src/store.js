import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/root';
import rootSaga from './sagas/root';

export default function configureStore(initialState) {
    const composeEnhancers =
        (process.env.REACT_APP_SERVICES !== 'prod' &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
        compose;
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(sagaMiddleware))
    );

    sagaMiddleware.run(rootSaga);

    if (process.env.REACT_APP_SERVICES !== 'prod' && module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers/root', () => {
            const nextRootReducer = require('./reducers/root').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
