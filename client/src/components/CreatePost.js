import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Note from "./Note.js";
import axios from "axios";

class CreatePost extends Component {
  constructor() {
    super();
    this.state = {
      synthType: "synth",
      notes: [],
      title: "",
      redirect: false
    }

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onClick(e) {
    if(this.state.notes.length < 8) {
      let newArr = this.state.notes;
      newArr.push(e.target.id);
      this.setState({notes: newArr});
    }
  }

  handleSubmit() {
    let noteString = "";
    this.state.notes.forEach(note => {
      noteString += note + ","
    });

    noteString = noteString.substring(0, noteString.length - 1);

    // Extremely basic input validation
    if(this.state.title.indexOf("<") !== -1 || this.state.title.indexOf(">") !== -1) {
      alert("Stop That.");
      return;
    }

    if(this.state.title.length === 0 || this.state.title.length > 25) {
      alert("Title is required and must be less than 25 characters in length");
      return;
    }

    if(noteString.length === 0) {
      alert("You must select at least one note");
      return;
    }

    let newPost = {
      title: this.state.title,
      synthType: this.state.synthType,
      notes: noteString
    }

    // POST TO DATABASE LOGIC GOES HERE
    axios.post("/api/post/create", newPost)
      .then(res => {
        this.setState({
          redirect: true
        });
      })
      .catch(err => console.log(err));
  }

  removeNote() {
    let newArr = this.state.notes;
    newArr.pop();
    this.setState({notes: newArr});
  }

  render() {
    const arr = this.state.notes;

    if(this.state.redirect) {
      return <Redirect to="/" />
    }

    return (
      <div className="createPost">
        <h1>Create Post</h1>
        <div className="container">
          <h2 className="selectionLabel">Sound Type:</h2>
          <select className="dropdown" name="synthType" onChange={this.onChange}>
            <option value="synth">Synth</option>
            <option value="pluck">PluckSynth</option>
            <option value="poly">PolySynth</option>
            <option value="duo">DuoSynth</option>
          </select>
        </div>
        <div className="noteSelector">
          <h2 className="selectionLabel">Select Notes:</h2>
          <div className="noteButtons">
            <div className="noteIcon" id="A4" onClick={this.onClick}>A</div>
            <div className="noteIcon" id="A#4" onClick={this.onClick}>A#</div>
            <div className="noteIcon" id="B4" onClick={this.onClick}>B</div>
            <div className="noteIcon" id="C4" onClick={this.onClick}>C</div>
            <div className="noteIcon" id="C#4" onClick={this.onClick}>C#</div>
            <div className="noteIcon" id="D4" onClick={this.onClick}>D</div>
            <div className="noteIcon" id="D#4" onClick={this.onClick}>D#</div>
            <div className="noteIcon" id="E4" onClick={this.onClick}>E</div>
            <div className="noteIcon" id="F4" onClick={this.onClick}>F</div>
            <div className="noteIcon" id="F#4" onClick={this.onClick}>F#</div>
            <div className="noteIcon" id="G4" onClick={this.onClick}>G</div>
            <div className="noteIcon" id="G#4" onClick={this.onClick}>G#</div>
          </div>
          <div className="removeNote" onClick={this.removeNote}>
            <i className="fas fa-arrow-left fa-2x"></i>
          </div>
        </div>
        <div className="notesContainer">
          {arr.map(item => <Note key={arr.indexOf(item)} note={item} />)}
        </div>
        <div className="container title">
          <h2 className="selectionLabel">Title:</h2>
          <input className="dropdown" type="text" name="title" onChange={this.onChange} placeholder="Max Length: 20 Characters"></input>
        </div>
        <div className="container">
          <div className="submit" onClick={this.handleSubmit}>SUBMIT</div>
        </div>
      </div>
    );
  }
}

export default CreatePost;