import React, { Component } from 'react';
import socket from '../../conf/socket';
import swal from 'sweetalert2';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import './Poll.css'

export class Poll extends Component {
  constructor(props) {
    super(props);
    this.state = { active: false }
  }
  componentDidMount() {
    socket.on('sendPoll', (res) => {
      const { success, data, active } = res;
      this.setState({ data, success, active });
    });
  }

  voteHandler = (value) => {
    const { _id } = this.state.data;
    this.setState({ active: false });
    socket.emit('updatePoll', { _id, vote: { id: '5e453dbd58dadcb8936ef3f1', vote: value } })
  }
  render() {
    const { data = {}, active = true } = this.state;

    return (
      <div className="container text-center mt-5">
        <h3>Ovoz berish sahifasi</h3>
        <p>Biroz kuting. Tez orada ovoz berish boshlanadi</p>
        {active && (
          <div className={`modal ${active && 'd-flex align-items-center'}`} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} role="dialog">
            <div className="modal-dialog modal-lg w-100" role="document">
              <div className="modal-content text-center">
                <div className="modal-header">
                  <h5 className="modal-title text-center w-100">{data.title}</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>{data.content}</p>
                </div>
                <div className="modal-footer justify-content-center">
                  <button className="btn btn-lg btn-success" onClick={() => this.voteHandler('yes')}>Roziman</button>
                  <button className="btn btn-lg btn-warning mx-3" onClick={() => this.voteHandler('unknown')}>Betaraf</button>
                  <button className="btn btn-lg btn-danger" onClick={() => this.voteHandler('no')}>Qarshiman</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Poll;
