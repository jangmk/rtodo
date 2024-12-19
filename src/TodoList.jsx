import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import Todo from './Todo'

function TodoList() {
  // tanstack query에 접근
  // 처음에 당연히 낯설엉!, 몇번 보면 그냥 씀!
  const queryClient = useQueryClient()
  const jcTxt = useRef(null)

  const getTodos = async ()=>{
    // axios로 get이 와야 함
     const response = await axios.get("http://localhost:8080/todos")
     return response.data
  }
  // useQuery는 get방식 곧 읽기에 사용
  const {data} = useQuery({ 
    queryKey: ['todos'], 
    queryFn: getTodos 
  })

  console.log("꼭 체킁",data);
 

  const postTodo = async (todo) =>{
    // axios로 post가 와야 해
     const response = await axios.post("http://localhost:8080/todos",todo) 
     return response.data;
  }

  // 추가 버튼 눌렀을 때
  const handleAdd = () =>{
    inmute.mutate({
      todoId: data.length+1,
      todoTitle: jcTxt.current.value
    })
    jcTxt.current.value="";
    jcTxt.current.focus();
  }

  // useMutation은 post/put/delete에 사용
  const inmute = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      // 리스트 가져오는 쿼리가 무효다 다시 가져와라
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  useEffect(()=>{
    jcTxt.current.focus();
  },[])

  return (
    <div>
      {data?.map((todo) => <Todo key={todo.todoId} todo={todo} />)}
      <input type='text' ref={jcTxt} style={{border:"1px solid black"}}  defaultValue={"수민 할일 많음"} />
      <button onClick={handleAdd}>
        Add Todo
      </button>
    </div>
  )
}

export default TodoList