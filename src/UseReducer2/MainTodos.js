import React, { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid';
import AddTodos from './AddTodos'
import Todo from './Todo'
import style from '../Style/UseReducer.module.css'

// 建立初始要在UI上呈現的Todo Item要在UI上呈現的Todo Item
const initialTodos = [
      { id: uuidv4(), title: 'First Item', completed: false },
      { id: uuidv4(), title: 'Second Item', completed: false },
      { id: uuidv4(), title: 'Third Item', completed: true },
]
// 建立 Reducer Function並依據UI需求分別建立不Case狀態
const TodosReducer = (Todos, action) => {
      switch (action.type) {
            //將更新title值後的title透過Spread Operator放入Todos array內，使更新後所產生的Item Object及舊的Item Object 都會在Todos array內
            case 'AddTodo':
                  return [...Todos, { id: uuidv4(), title: action.payload, completed: false }]
            //先確定原有的Item Object的id是否與正在編輯中的Item Object的id相同，若相同則會更新title的狀態值，透過Spread Operator將整個Item Object做一次更新(因為使用map，所以Todos[]及 todo[]並不相同)
            case 'EditTodo':
                  return Todos.map(todo => {
                        if (todo.id === action.payload.id) {
                              return { ...todo, title: action.payload.title }
                        } else {
                              return todo
                        }
                  })
            // 透過filter的array method，將Todos array中id不相同的 Object Item給移除Todos array
            case 'DelTodo':
                  return Todos.filter(todo => todo.id !== action.id)
            //與狀態EditTodo相似，但主要是以將Object Item中的'completed 'property在id相同時反轉為不同的布林值
            case 'ToggleTodo':
                  return Todos.map(todo => {
                        if (todo.id === action.id) {
                              return { ...todo, completed: !todo.completed }
                        } else {
                              return todo
                        }
                  })
            default:
                  return Todos
      }
}

export default function MainTodos() {
      const [state, dispatch] = useReducer(TodosReducer, initialTodos)
      // 設定payload 為想要更新title狀態值的變數代稱，
      const handleAddTodo = (title) => {
            dispatch({
                  type: 'AddTodo',
                  payload: title
            })
      }
      // 設定payload 為想要更新title狀態值及id值的變數Object(包含title,id兩個變量)
      const handleEditTodo = ({ id, title }) => {
            dispatch({
                  type: 'EditTodo',
                  payload: { id, title }
            })
      }
      // 將id以Id變量做為輸入時的代稱
      const handleDelTodo = (Id) => {
            dispatch({
                  type: 'DelTodo',
                  id: Id
            })
      }
      // 將id以Id變量做為輸入時的代稱
      const handleToggleTodo = (Id) => {
            dispatch({
                  type: 'ToggleTodo',
                  id: Id
            })
      }

      return (
            < div className={style.bg}>
                  <h1>This is a TodoList</h1>
                  {/* 將function handleAddTodo透過props傳給AddTodo Component */}
                  <AddTodos AddTodo={handleAddTodo} />
                  {/* state代表所有Todo Item的集合，若對state做map將回傳新的array並透多Todo Component 修改行為樣式 */}
                  {state.map(todo => (
                        <Todo
                              todo={todo}
                              key={todo.id}
                              editTodo={handleEditTodo}
                              delTodo={handleDelTodo}
                              toggleTodo={handleToggleTodo}
                        />
                  ))}
            </div>
      )
}




