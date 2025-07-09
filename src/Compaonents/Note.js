import { Delete } from 'lucide-react';
import { FilePenLine } from 'lucide-react';

const Note = ({ id, text, color, editHandler, deleteHandler }) => {
  const ramadanGradient = "linear-gradient(135deg, #9d50bb, #6e48aa)";
  const background = color === "ramadan" ? ramadanGradient : color || "#fff";

  return (
    <div className='note' style={{ background, color: color === "ramadan" ? "#fff" : "#000" }}>
      <textarea value={text} readOnly />
      <div className='note_footer'>
            <FilePenLine  onClick={() => editHandler(id, text)}/>
            <Delete  onClick={() => deleteHandler(id)}/>

      
      
      </div>
    </div>
  )
}

export default Note;
