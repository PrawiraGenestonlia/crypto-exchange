import { createModel } from '@rematch/core'
import { RootModel } from '..'
import { CONFIG } from '../../../config'

interface CryptoState {
  socket:WebSocket | undefined | any
  data: {[index:string]:{
    seqNum:number,
    instrumentId:string,
    asks: Array<[number, number]>,
    bids: Array<[number, number]>,
    checksum:number,
    timestamp:string
  }} | undefined
}

export const crypto = createModel<RootModel>()({
  state: {
    socket: undefined,
    data  : undefined
  } as CryptoState, // initial state
  reducers: {
    setSocket (state:CryptoState, payload:WebSocket) {
      return { ...state, socket: payload }
    },
    setData (state:CryptoState, payload:any) {
      const instrumentId = payload[ 0 ].instrumentId
      const asks = payload[ 0 ].asks.sort((a: number[], b: number[]) => a[ 0 ] - b[ 0 ])
      const bids = payload[ 0 ].bids.sort((a: number[], b: number[]) =>  b[ 0 ] -a[ 0 ])
      return { ...state, data: { ...state.data, [ instrumentId ]: { ...payload[ 0 ], asks, bids } } }
    }
  },
  effects: (dispatch) => ({
    async connect ({ websocketUrl, instrumentIds }:{ websocketUrl:string, instrumentIds:string[] }, state) {
      if (!state.crypto.socket) {
      // Create WebSocket connection.
        const socket = new WebSocket(websocketUrl)
        dispatch.crypto.setSocket(socket)
        // Connection opened
        socket.addEventListener('open', (event) => {
          socket.send(JSON.stringify({
            'op'  : 'subscribe',
            'tag' : 103,
            'args': instrumentIds
          }))
        })

        // Listen for messages
        socket.addEventListener('message', (event) => {
          dispatch.crypto.saveData(event)
        })
      }
    },
    async saveData (event, state) {
      const data = JSON.parse(event.data).data
      if (data) {
        const upcomingData = data?.[ 0 ]
        const currentData = state?.crypto?.data?.[ upcomingData.instrumentId ] || { timestamp: 0 } 
        
        if (!upcomingData?.asks?.[ 0 ]?.[ 0 ] || !upcomingData?.bids?.[ 0 ]?.[ 0 ]){
          return
        }
        
        if (upcomingData.timestamp - CONFIG.WEBSOCKET_TIME_INTERVAL > currentData.timestamp) {
          dispatch.crypto.setData(data)
        }
      }
    }
  })
})