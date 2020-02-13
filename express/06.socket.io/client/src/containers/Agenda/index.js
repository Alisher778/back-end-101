import React, { Component } from 'react';
import AgendaList from './AgedaList';
import { ListGroup } from 'reactstrap'
import socket from '../../conf/socket';

export class Agendas extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [{ title: ' Media heading', content: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus' }] }
  }

  componentDidMount() {
    socket.emit('fetchAgenda');

    socket.on('getAgenda', (res) => {
      const { success, msg, data } = res;
      this.setState({ data, success, msg });
    });
  }

  createPoll = (data) => {
    socket.emit('createPoll', data);
  }

  deletePoll = (id) => {
    console.log('hey');

    socket.emit('deleteAgenda', { id });
    socket.emit('fetchAgenda');
  }

  render() {
    const { data } = this.state;
    console.log('Hello');

    return (
      <div className="container">
        <h2 className="text-center my-5">Кўриб ўтиладиган масалалар</h2>
        <ListGroup>
          {
            data.map(item => {
              return (
                <AgendaList
                  key={item._id}
                  data={item}
                  createPoll={this.createPoll}
                  deletePoll={this.deletePoll}
                  editPoll={this.editPoll}
                />
              )
            })
          }
        </ListGroup>
      </div>
    );
  }
}

export default Agendas;
