import { fork } from 'redux-saga/effects'
import helloWorldSaga from './helloWorld'

export default function * root() {
  yield [
    fork(helloWorldSaga),
  ]
}
