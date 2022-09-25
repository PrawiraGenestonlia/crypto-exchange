import { useState } from 'react'

interface CryptoPairProps {
  title:string,
  asks:number,
  bids:number
}

export const CryptoPair = (props:CryptoPairProps) => {
  const [ selectedAmount, setSelectedAmount ] = useState(0)
  return (
    <div className='m-4 rounded-xl border bg-slate-600/20 p-4'>
      <div>
        <span className='font-bold underline'>{props.title.split('-')[ 0 ]}</span>
        <span>{props.title.split('-')[ 1 ]}</span>
      </div>
      <div className='flex flex-row justify-around'>
        <div className='m-2 flex w-[100px] flex-col rounded-2xl bg-blue-900 p-2'>
          <div className='text-center text-xl font-bold'>{props.bids}</div>
          <div className='text-end text-xs'>CoinFlex</div>
        </div>
        <div className='absolute rounded-lg bg-red-700 p-1'>{Number(props.asks - props.bids).toFixed(2)}</div>
        <div className='m-2 flex w-[100px] flex-col rounded-2xl bg-blue-900 p-2'>
          <div className='text-center text-xl font-bold'>{props.asks}</div>
          <div className='text-end text-xs'>CoinFlex</div>
        </div>
      </div>
      <div className='flex flex-row justify-around'>
        <button onClick={()=>alert('Bid')}>Bid</button>
        <select className='select select-info mx-4 w-[100px]' onChange={(e)=>setSelectedAmount(Number(e.target.value))}>
          <option disabled selected>Amount</option>
          <option>100</option>
          <option>500</option>
          <option>1000</option>
        </select>
        <button>Ask</button>

      </div>
    </div>
  )
}