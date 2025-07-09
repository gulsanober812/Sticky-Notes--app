import React, { useEffect, useState } from 'react'
import CreateNotes from './CreateNotes'
import './notes.css'
import { v4 as uuid } from 'uuid'
import { SmilePlus } from 'lucide-react';
import Note from './Note'

const Notes = () => {
  const colors = ["#fce38a", "#f38181", "#a8edea", "#eaffd0", "#dcedc1", "#ffd3b6", "#c1c8e4"];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const [inputText, setInputText] = useState("")
  const [notes, setNotes] = useState([])
  const [editToggle, setEditToggle] = useState(null)

  
  const addNewNote = () => {
    setNotes(prevNotes => [
      ...prevNotes,
      {
        id: uuid(),
        text: "",
        color: getRandomColor()
      }
    ])
  }

  const editHandler = (id, text) => {
    setEditToggle(id)
    setInputText(text)
  }

  const saveHandler = () => {
    if (editToggle) {
      setNotes(notes.map((note) => (
        note.id === editToggle ?
          { ...note, text: inputText }
          : note
      )))
    } else {
      setNotes((prevNotes) => [
        ...prevNotes,
        {
          id: uuid(),
          text: inputText,
          color: getRandomColor()
        }
      ])
    }

    setInputText("")
    setEditToggle(null)
  }

  const deleteHandler = (id) => {
    const newNotes = notes.filter(n => n.id !== id)
    setNotes(newNotes)
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Notes"))
    if (data) {
      setNotes(data)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(notes))
  }, [notes])

  return (
    <div className='notes'>
    
      
   <SmilePlus className="add_new_btn" onClick={addNewNote}/>


      {
        notes.map((note) => (
          editToggle === note.id ?
            <CreateNotes
              inputText={inputText}
              setInputText={setInputText}
              saveHandler={saveHandler}
            />
            :
            <Note
              key={note.id}
              id={note.id}
              text={note.text}
              color={note.color}
              editHandler={editHandler}
              deleteHandler={deleteHandler}
            />
        ))
      }

      {
        editToggle === null &&
        <CreateNotes
          inputText={inputText}
          setInputText={setInputText}
          saveHandler={saveHandler}
        />
      }
    </div>
  )
}

export default Notes
