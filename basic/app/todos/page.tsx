'use client';

import { useMutation, useQuery } from 'react-query';
import { createTodo, getTodos } from '@/app/actions/todo-actions';
import { useState } from 'react';
import { queryClient } from '@/app/config/ReactQueryProvider';

export default function TodosPage() {
  const [todoInput, setTodoInput] = useState('');
  const todoQuery = useQuery({
    queryKey: ['todos'],
    queryFn: () => getTodos()
  });

  const createTodoMutation = useMutation({
    mutationFn: async () => {
      if (todoInput === '') throw new Error('TODO를 입력해주세요');
      return createTodo(todoInput);
    },
    onSuccess: TODOS => {
      console.log('SUCCESS!!');
      console.log(TODOS);
      //todoQuery.refetch(); // 투두생성되자마자 todoQuery 업데이트 하기
      queryClient.invalidateQueries(['todos']);
    },
    onError: (error: any) => {
      alert(error.message);
    }
  });
  return (
    <div>
      <h1>TODOS</h1>
      {/*TODO를 생성하는  부분*/}
      <input
        type="text"
        placeholder="Enter Todo"
        value={todoInput}
        onChange={e => setTodoInput(e.target.value)}
      />
      <button onClick={() => createTodoMutation.mutate()}>
        {createTodoMutation.isLoading ? '생성중...' : '투두 생성'}
      </button>
      {/*TODO를 보여주는  부분*/}
      {todoQuery.isLoading && <p>Loading...</p>}
      {todoQuery.data &&
        todoQuery.data.map((todo, index) => <p key={index}>{todo}</p>)}
    </div>
  );
}
