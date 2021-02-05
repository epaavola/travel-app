import { atom } from 'recoil'
/*
* Search parameter value states
*/
export const continentState = atom({
  key: 'continent', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
})

export const missioTypeState = atom({
  key: 'missioType', 
  default: '', 
})

export const organizationState = atom({
  key: 'organization', 
  default: '', 
})
