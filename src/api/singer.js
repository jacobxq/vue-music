import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
// import axios from 'axios'

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0
  })

  return jsonp(url, data, options)
}

export function getSongList(id) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_album.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    singermid: id,
    begin: 0,
    num: 100,
    g_tk: '5381',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0
  })

  return jsonp(url, data, options)
}
