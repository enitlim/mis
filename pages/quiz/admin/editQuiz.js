import React from 'react'
import { useRouter } from 'next/router'
const EditQuiz = () => {
  const router = useRouter()
  const {id, name}=router.query
  return (
    <div>{id}{name}</div>
  )
}

export default EditQuiz