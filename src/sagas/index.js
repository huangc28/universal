import { all, call } from 'redux-saga/effects'
import helloWorldSaga from './helloWorld'

export default function * root() {
  yield all([
    call(helloWorldSaga),
  ])
}
