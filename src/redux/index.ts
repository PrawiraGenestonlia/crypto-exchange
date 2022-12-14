import { init, RematchDispatch, RematchRootState } from '@rematch/core'
import { models, RootModel } from './models'
import { useSelector } from 'react-redux'
export const store = init({
  models
})
export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
const { dispatch } = store
const useReduxSelector = ():RootState => useSelector((state: RootState) => state)
export {
  dispatch,
  useReduxSelector
}