import { useState } from 'react'

const useToggle = (initState:boolean=false) :[boolean,any]=>{
   const [state,setState] = useState<boolean>(initState) 
   const toggle  = ():void => setState(state => !state);
   return [state,toggle]
}

export default useToggle