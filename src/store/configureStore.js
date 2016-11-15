import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas'

/**
 * Responsible for creating store,
 * also applying enhanced middlewares onto stores.
 *
 * @param {function} rootReducer
 * @param {object} finalizedState
 */
export default function configureStore (rootReducer, finalizedState) {

  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    finalizedState,
    compose(
      applyMiddleware(sagaMiddleware),
      global.__CLIENT__ && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
  )

  sagaMiddleware.run(rootSaga)

  return store
}
