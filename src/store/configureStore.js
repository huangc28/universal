import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas'

/**
 * Responsible for creating store,
 * also applying enhanced middlewares onto stores.
 *
 * @param {function} rootReducer
 * @param {object} preloadedState
 */
export default function configureStore (rootReducer, preloadedState) {
  const sagaMiddleware = createSagaMiddleware()
  const composeEnhancers = (
    !global.__PRODUCTION__ &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) || compose

  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(sagaMiddleware)
    )
  )

  sagaMiddleware.run(rootSaga)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index') // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
