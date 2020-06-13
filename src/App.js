import React from 'react';
import './App.css';
import ContactBook from './ContactBook/ContactBook';




class App extends React.Component {
    render() {
        return (
            <>
                <header className="App-header">Телефонная книга     </header>
                <ContactBook></ContactBook>
            </>
        );
    }
}

export default App;
