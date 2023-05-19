import React, { useState } from 'react'

export default function List({ item }) {

  const [isUpdate, setIsUpdate] = useState(true)

  const renderForm = () => {
    return (
      <form >
        <input type="text" defaultValue={item.title} />
        <button type='submit'>save</button>
      </form>
    );
  }
  const renderList = () => {
    return (
      <>
        <span>  {task.title}</span>

      </>
    )
  }

  return (
    <div>
      {
        isUpdate ? renderList() : renderForm()
      }
    </div>
  )
}
