// jshint ignore: start

import React, { Component } from 'react';

// TODO: DRY this code out, make better use of variables

// Renders message element based on message type and content
class Message extends Component {

  rando() {
    return Math.random().toString(36).substr(2, 6);
  }

  render() {
    // Returns notification component for username change
    if (this.props.message.type === 'incomingNotification') {
      return (
        <div className='message notification'>
          <span className='message-content'>{ this.props.message.content }</span>
        </div>
      );
    }

    // Returns notification component for users connect/disconnect
    if (this.props.message.type === 'connectedUser') {
      return (
        <div className='message notification'>
          <span className='message-content'>{ this.props.message.name || 'user' } has joined</span>
        </div>
      );
    }

    // Returns image specific component TODO: deconstruct into separate component
    if (this.props.message.type === 'incomingMessage') {
      const re = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/ig;
      const found = this.props.message.content.match(re);
      if (found) {
        const split = this.props.message.content.split(' ');
        const altered = split.map(element => {
          if (element === found[0]) {
            return (
              <div key={this.rando()} className='message-content' style={{ maxWidth: 60 + 'vw', padding: 0, margin: 0 }}>
                <img className='images' src={ found[0] } />
              </div>
            );
          }
          return element + ' ';
        });

        // Returns message component containing an image
        return (
          <div className='message'>
            <span className='message-username' style={{ color: this.props.message.userColor }}>{ this.props.message.username }: </span>

              <span className='message-content'>{ altered }</span>

          </div>
        );
      } else {
        // Returns text-only message component
        return (
          <div className='message'>
            <span className='message-username' style={{ color: this.props.message.userColor }}>{ this.props.message.username }: </span>
            <span className='message-content'>{ this.props.message.content }</span>
          </div>
        );
      }
    }

    return null;
  }
}

export default Message;

