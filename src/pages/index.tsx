import { useEffect } from 'react'
import { CryptoPair } from '../components/CryptoPair.component'
import { dispatch, useReduxSelector } from '../redux'

function IndexPage() {
  const { crypto } =useReduxSelector()

  useEffect(()=>{
    if (!crypto.socket) {
      dispatch.crypto.connect({
        websocketUrl : 'wss://v2api.coinflex.com/v2/websocket',
        instrumentIds: [ 'depth:BTC-USD-SWAP-LIN', 'depth:ETH-USD-SWAP-LIN', 'depth:BNB-USD-SWAP-LIN', 'depth:USDT-USD-SWAP-LIN' ]
      })
    }
  }, [])

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex flex-row flex-wrap'>
        {
          Object.keys(crypto.data || {}).map((key:string) => {
            return <CryptoPair 
              key={key} title={key} 
              asks={crypto.data?.[ key ]?.asks[ 0 ][ 0 ] || 0} 
              bids={crypto.data?.[ key ]?.bids[ 0 ][ 0 ] || 0} />
          })
        }
      </div>
    </div>
  )
}

export default IndexPage
