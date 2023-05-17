import React, { useState } from 'react'
import style from '../Style/UseReducer.module.css'

export default function AddTodos({ AddTodo }) {
      // 建立newTitle狀態來追蹤input輸入值的改變
      const [newTitle, setNewTitle] = useState('')
      // 將使用者對input輸入的值存到setNewTitle function並更新newTitle的狀態
      const handleInputChange = (e) => {
            setNewTitle(e.target.value)
      }
      // 將使用者所輸入的值放入 AddTodo function內，這裡的newTitle即代表在MainTod.js內的function handleAddTodo裡面的payload=newTitle，以更新Object Item內的title值
      const handleSubmitChange = (e) => {
            e.preventDefault()
            AddTodo(newTitle)
            // 使用者按下Submit後清除所輸入內容
            setNewTitle('')
      }
      return (
            <>
                  <form onSubmit={handleSubmitChange} className={style.form}>
                        <input type='text' value={newTitle}
                              placeholder='Give Todos Item'
                              onChange={handleInputChange} className={style.input} />
                        <button className={style.button}>Add</button>
                  </form>
            </>
      )
}
