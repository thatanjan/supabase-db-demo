import { useActionState, useEffect, useState } from 'react'

const useResettableActionState = ({ initialState = {}, action }) => {
  const [state, setState] = useState(initialState)

  const [data, formAction, isPending] = useActionState(action, initialState)

  useEffect(() => {
    if (!isPending) {
      setState(data)
    }
  }, [isPending])

  const resetState = () => setState(initialState)
  const updateState = newState => {
    setState(prev => ({ ...prev, ...newState }))
  }

  return {
    state,
    formAction,
    isPending,
    resetState,
    updateState,
  }
}

export default useResettableActionState
