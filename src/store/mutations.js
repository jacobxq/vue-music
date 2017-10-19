import * as types from './mutation-type'

const mutation = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  }
}

export default mutation