import React, { Component } from 'react';

import './ContactBookForm.css';

export default class ContactBookForm extends Component {
    state = {
        name: "",
        phone: "",
        email: "",
    };
   
    componentDidUpdate(prevProps) {
        if (this.props.selectedContact.id !== prevProps.selectedContact.id) {
          this.setState({
            ...this.props.selectedContact,
          });
        }
      }
    
      handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
          [name]: value,
        });
      };
    
      updateContact = () => {
        this.props.updateContact(this.state);
      };
    
      cancelClick = () => {
        this.setState({
          name: "",
          phone: "",
          email: ""
        });
      };
    
      addContact = () => {
        this.props.addContact({ ...this.state });
        this.setState({
          name: "",
          phone: "",
          email: "",
        });
      };
render() {
    const { name, phone, email, id } = this.state;
    return (
        <div className='detail'>
            <div className='header'>
                <div className='body'>
                    {this.props.selectedContact.id ? "Contact Details" : "New Contact"}
                </div>
            </div>

            <div className = 'formGroup'>
                <label htmlFor="name">Name</label>
                <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={this.handleInputChange}
                />
            </div>
            <div className='formGroup'>
                <label htmlFor="phone">Phone</label>
                <input
                type="text"
                id="username"
                name="phone"
                value={phone}
                onChange={this.handleInputChange}
                />
            </div>
            <div className='formGroup'>
                <label htmlFor="email">Email</label>
                <input
                type="text"
                id="username"
                name="email"
                value={email}
                onChange={this.handleInputChange}
                />
            </div>
            {this.props.selectedContact.id ? (
            <div className="btn-block">
              <button className="btn btn-update" onClick={this.updateContact}>
                Update
              </button>
              <button
                className="btn btn-delete"
                onClick={this.props.deleteContact.bind(null, id)}
              >
                Delete
              </button>
            </div>
          ) : (
            <div className="btn-block">
              <button className="btn btn-add" onClick={this.addContact}>
                Add
              </button>
              <button className="btn btn-cancel" onClick={this.cancelClick}>
                Cancel
              </button>
            </div>
            )}
        </div>

    )
}
};