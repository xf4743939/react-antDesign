import React,{useState,useEffect} from 'react'

const LikeButton:React.FC = ()=>{
  const [count,setCount] =useState(0)
  useEffect(()=>{
    document.title='my is studying react'
  })

  return <div>
    <button onClick={()=>setCount(count+1)}>点赞{count}</button>
  </div>
}

export default LikeButton