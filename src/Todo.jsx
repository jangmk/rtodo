import { Box, Button, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

// 일부러 업데이트 남겨 놓았으니깡 한번 해보는 걸롱
// MUI 컴포넌트에 Dialog를 한번 써 본다면 너무나 훌륭!
function Todo({todo}) {

  const queryClient = useQueryClient()
  const handleDelete = () =>{
    delmute.mutate()
  }

  const delTodo = async ()=>{
    const response = await axios.delete(`http://localhost:8080/todos/${todo.todoId}`)
    return response.data
  }

  const delmute = useMutation({
    mutationFn: delTodo,
    onSuccess: () => {
      // 리스트 가져오는 쿼리가 무효다 다시 가져와라
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  return (
    <Box display={"flex"} sx={{"justifyContent":"space-between"}}>
      <Typography variant='h6'>
        {todo.todoTitle}
      </Typography>
      <Button variant='outlined' onClick={handleDelete} >삭제</Button>
    </Box>
  )
}

export default Todo