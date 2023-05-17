import React, { useState } from 'react'
import style from '../Style/UseReducer.module.css'

export default function Todo({ todo, editTodo, delTodo, toggleTodo }) {
      // 建立isEditing狀態來控制Save 及Edit button 的出現之條件
      const [isEditing, setIsEditing] = useState(false)
      // 建立editedTitle來追蹤使用者對title編輯的狀態變化
      const [editedTitle, setEditedTitle] = useState(todo.title)
      // 將使用者對title所輸入的值放入 function setEditedTitle以更新editedTitle的狀態值
      const handleInputChange = (e) => {
            setEditedTitle(e.target.value)
      }
      // 若使用者點擊Edit時，則狀態更新為'可編輯狀態'(也就是Save button出現的時點)
      const handleEditButtonClick = () => {
            setIsEditing(true)
      }
      // 若使用者點擊Save時，則狀態更新為'不可編輯狀態'(也就是Edit button 出現的時點)
      const handleSaveButtonClick = () => {
            // 將更新後的id及title透過editTodo以回傳新的Object Item
            if (editedTitle.trim()) {
                  editTodo({
                        id: todo.id,
                        title: editedTitle,
                  });
                  // 更新為'不可編輯的狀態'
                  setIsEditing(false);
            }
      }
      // 將更新後的id透過delTodo的比較來刪除與原id不符的Object Item
      const handleDelButtonClick = () => {
            delTodo(todo.id)
      }
      // 將更新後的id透過toggleTodo的比較Object Item中的completed property，不管id是否相同，都會返回相反的布林值，以達到控制樣式顯示時點。
      const handleToggleButtonClick = () => {
            toggleTodo(todo.id);
      }
      return (
            <div className={style.todoContainer}>
                  {isEditing ? (
                        <>
                              <input type='text' value={editedTitle}
                                    onChange={handleInputChange}
                                    className={style.input} />
                              <button onClick={handleSaveButtonClick}
                                    className={style.button2}>Save</button>
                        </>
                  ) : (<>
                        <span style={{ textDecoration: todo.completed ? "line-through" : "none", color: todo.completed ? "#f12f5a" : "black" }} className={style.span}>
                              {todo.title}
                        </span>
                        <button onClick={handleEditButtonClick} className={style.button2} >Edit </button>
                        <button onClick={handleToggleButtonClick}
                              className={style.button2}>{todo.completed ? 'UnDone' : 'Done'}</button>
                        <button onClick={handleDelButtonClick}
                              className={style.button2}>Delete</button>


                  </>)}
            </div>
      )
}


