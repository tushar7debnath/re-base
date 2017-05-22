import React from 'react';
import ReactDOM from 'react-dom';
import base from '../rebase';

class NewChat extends React.Component {
  _newChat(e) {
    e.preventDefault();

    /*
     * Here, we call .post on the '/chats' ref
     * of our Firebase.  This will do a one-time 'set' on
     * that ref, replacing it with the data prop in the
     * options object.
     *
     * Keeping with the immutable data paradigm in React,
     * you should never mutate, but only replace,
     * the data in your Firebase (ie, use concat
     * to return a mutated copy of your state)
    */

    base.post('chats', {
      data: this.props.chats.concat([
        {
          title: ReactDOM.findDOMNode(this.refs.title).value,
          message: ReactDOM.findDOMNode(this.refs.message).value
        }
      ]),
      context: this,
      /*
       * This 'then' method will run after the
       * post has finished.
       */
      then: () => {
        console.log('POSTED');
      }
    });

    ReactDOM.findDOMNode(this.refs.message).value = '';
    ReactDOM.findDOMNode(this.refs.title).value = '';
  }
  render() {
    return (
      <div className="col-md-12">
        <form
          onSubmit={this._newChat.bind(this)}
          className="form-group col-md-8"
        >
          <input
            ref="title"
            type="text"
            placeholder="Title"
            className="form-control"
            style={{ margin: '5px auto' }}
          />
          <textarea
            ref="message"
            placeholder="Message"
            className="form-control"
            style={{ margin: '5px auto' }}
          />
          <input type="submit" className="btn btn-success" />
        </form>
      </div>
    );
  }
}

export default NewChat;
