import * as ACTION_TYPES from '../actions/helloWorld'
import { take } from 'redux-saga/effects'

export default function * helloWorld() {
  while (true) {
    yield take(ACTION_TYPES.SAY_HELLO)
    console.log('test saga')
  }
}
