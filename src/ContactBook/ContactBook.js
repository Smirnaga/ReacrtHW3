import React, { Component } from 'react';
import './ContactBook.css';
import ContactBookUser from './ContactBookUser';
import ContactBookForm from './ContactBookForm';


export default class ContactBook extends Component {
    state = {
        users: [],
        selectedContact: {
          id: "",
          name: "",
          phone: "",
          email: "",
        },
      };

      resetSelectedContact = () => {
        this.setState({
          selectedContact: {
            id: "",
            name: "",
            phone: "",
            email: ""
          },
        });
      };
    
    componentDidMount = () =>{
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
            this.setState({ users: data });
        });
    }

    selectContact = (id) => {
        this.setState({
          selectedContact: this.state.users.find((contact) => contact.id === id),
        });
      };

      deleteContact = async (contactId) => {
        try {
          await fetch(`https://jsonplaceholder.typicode.com/users/${contactId}`, {
            method: "DELETE",
          });
        } catch (error) {
          console.log(error);
        }
        this.componentDidMount();
        this.resetSelectedContact();
      };
    
      newContact = () => {
        this.resetSelectedContact();
      };
    
      addContact = async (newContact) => {
        newContact.id = Date.now();
        try {
          await fetch("https://jsonplaceholder.typicode.com/users", {
            method: "POST",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(newContact),
          });
        } catch (error) {
          console.log(error);
        }
        this.componentDidMount();
        this.resetSelectedContact();
      };
    
      updateContact = async (updatedContact) => {
        try {
          await fetch(
            `https://jsonplaceholder.typicode.com/users/${updatedContact.id}`,
            {
              method: "PUT",
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
              body: JSON.stringify(updatedContact),
            }
          );
        } catch (error) {
          console.log(error);
        }
        this.resetSelectedContact();
        this.componentDidMount();
      };
    

    render() {
        return (
            <table className="contactsBook">
            <div className = 'container'>
              <thead>
                  <tr>
                      <th>ФИО</th>
                      <th>Телефон</th>
                      <th>Email</th>
                  </tr>
              </thead>
              <tbody>
                      {this.state.users.map((contact) => (
                          <ContactBookUser
                              contact={contact}
                              key={contact.id}
                              selectContact={this.selectContact}
                          ></ContactBookUser>
                      ))}
                      <button className="btn btn-new" onClick={this.newContact}>
                  New Contact
                </button>
              </tbody>
            </div>
            <ContactBookForm
              selectedContact={this.state.selectedContact}
              updateContact={this.updateContact}
              deleteContact={this.deleteContact}
              addContact={this.addContact}
            />
        </table>
        );
    }
}

