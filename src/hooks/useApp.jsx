import { useContext } from 'react'
import { AppContext } from '../providers/AppProvider'

const useApp = () => {
  return useContext(AppContext)
}

export default useApp
