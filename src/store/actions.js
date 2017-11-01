import * as types from './mutation-type'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'
import { saveSearch, deleteSearch, clearSearch } from 'common/js/cache'

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAY_LIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAY_LIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function ({commit}, {list}) {
  commit(types.SET_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAY_LIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = function ({commit, state}, song) {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex

  // 获取当前播放歌曲
  let currentSong = state.playlist[currentIndex]
  // 获取当前播放歌曲索引
  let fpIndex = findIndex(playlist, song)

  // 因为要添加一首歌，所以索引++
  currentIndex++

  // 添加一首歌
  playlist.splice(currentIndex, 0, song)

  // 判断当前添加歌曲是否已经在列表中
  if (fpIndex > -1) {
    // 添加的歌曲在已有歌曲的前面
    if (fpIndex > currentIndex) {
      playlist.splice(fpIndex + 1, 1)
    } else {
      // 添加的歌曲在已有歌曲的后面
      playlist.splice(fpIndex, 1)
      currentIndex--
    }
  }

  // 获取播放歌曲在顺序列表的索引
  let currentSindex = findIndex(sequenceList, currentSong) + 1

  let fsIndex = findIndex(sequenceList, song)

  sequenceList.splice(currentSindex, 0, song)

  if (fsIndex > -1) {
    if (currentSindex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAY_LIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const deleteSong = function ({commit, state}, song) {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let pIndex = findIndex(playlist, song)
  playlist.splice(pIndex, 1)
  let sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)
  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }

  commit(types.SET_PLAY_LIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)

  if (!playlist.length) {
    commit(types.SET_PLAYING_STATE, false)
  } else {
    commit(types.SET_PLAYING_STATE, true)
  }
}

export const deleteSongList = function ({commit}) {
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAY_LIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_PLAYING_STATE, false)
}

export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}