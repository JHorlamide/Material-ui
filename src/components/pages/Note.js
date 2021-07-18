import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Masonry from 'react-masonry-css';

/* Custom Component */
import NoteCard from '../NoteCard';

const Note = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/notes')
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        console.log(data);
        setNotes(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleDelete = async (noteId) => {
    await fetch(`http://localhost:8000/notes/${noteId}`, {
      method: 'DELETE',
    });

    const newNOte = notes.filter((note) => {
      return note.id !== noteId;
    });

    setNotes(newNOte);
  };

  const breakPoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakPoints}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
      >
        {notes.map((note) => {
          return (
            <div key={note.id}>
              <NoteCard note={note} handleDelete={handleDelete} />
            </div>
          );
        })}
      </Masonry>
    </Container>
  );
};

export default Note;
