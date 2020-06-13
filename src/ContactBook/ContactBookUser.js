import React, { Component } from 'react';
import './ContactBookUser.css';

export class ContactBookUser extends Component {
    render() {
        const { contact } = this.props;
        return (
            <tr onClick={() => this.props.selectContact(contact.id)}>
                <td className='id'>{contact.id}</td>
                <td>{contact.name}</td>
                <td>{contact.phone}</td>
                <td>{contact.email}</td>
            </tr>
        );
    }
}

export default ContactBookUser;