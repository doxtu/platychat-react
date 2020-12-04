import { all, call, put, takeEvery } from 'redux-saga/effects'

import { CONVO_LIST_RESPONSE } from './socket/socket.reducer'

import { setConvos } from './messages/messages.reducer'

function* convoListResponseSaga() {
  yield takeEvery(CONVO_LIST_RESPONSE, function* ({ payload }) {
    yield put(setConvos(payload))
  })
}

export default function* allSagas() {
  yield all([call(convoListResponseSaga)])
}
