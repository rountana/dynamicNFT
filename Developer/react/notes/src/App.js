import React from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import { data } from "./components/Data.js";
import Split from "react-split";
import { nanoid } from "nanoid";

export default function App() {
  //note lazy state initialization below (arrow function for JSON.parse)
  const [notes, setNotes] = React.useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  );
  //notes[0].id throws "undefined" error if it doesnt exist
  //in which case OR would revert to null
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  );

  //side effect - store entire notes object in local storage
  //timing - everytime the dependency (notes) is updated.
  //this useEffect is to save notes between browser reloads
  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    //every line in the text editor is stored as a new
    // string in the note array. so 1st in array[0], 2nd in array[1] and so on.
    // console.log(notes[0].body.split("\n"));
  }, [notes]);

  //create a new note template and set it to current
  function createNewNote() {
    //initialize object with starting content
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    };
    //need prevNotes cos state variable isnt directly updated
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  // how is text text sent??
  function updateNote(text) {
    var tempArray = [];

    //unshift => move to top of array
    //push => move to end of array
    //at the point, notes is globally available array
    //which we loop thru instead of map, cos
    //we dont manipulate array elements but perform
    //custom operations when stepping thru array
    for (var i = 0; i < notes.length; i++) {
      if (notes[i].id === currentNoteId) {
        // move modified note to top of the array
        tempArray.unshift({ ...notes[i], body: text });
      } else {
        tempArray.push(notes[i]);
      }
    }
    setNotes(tempArray);

    // map maintains array order
    //i.e. chronological order of creation in our case
    // setNotes((oldNotes) =>
    //   oldNotes.map((oldNote) => {
    //     return oldNote.id === currentNoteId
    //       ? { ...oldNote, body: text }
    //       : oldNote;
    //   })
    // );
  }

  // passed down the event from sidebar, we stopPropagation
  // to parent elment
  // noteId ids the note to be excluded from the array filter method
  function deleteNote(event, noteId) {
    event.stopPropagation();
    // console.log("deleted, " + noteId)
    setNotes((notesCopy) => notesCopy.filter((note) => note.id !== noteId));
  }

  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}
