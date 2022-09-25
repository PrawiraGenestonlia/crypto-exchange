import { Models } from '@rematch/core'
import { crypto } from './crypto'

export interface RootModel extends Models<RootModel> {
  crypto: typeof crypto;
}
export const models: RootModel = { crypto }