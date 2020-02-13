import React, { PureComponent } from 'react';
import Piechart from './Piechart';
import socket from '../../conf/socket';
import './Result.css';

export class Results extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { votes: [] }
  }

  componentDidMount() {
    socket.emit('getLatestPoll');
    socket.on('sendResult', (res) => {
      const { success, msg, data } = res;
      this.setState({ ...data, success, msg });
    });
  }

  render() {
    const { votes = [{ vote: '' }] } = this.state;
    let count = { yes: { name: "Rozi", value: 0 }, no: { name: "Qarshi", value: 0 }, unknown: { name: "Betaraf", value: 0 } };
    votes.forEach((item) => {
      if (item.vote == 'no') {
        count.no.value++;
      } else if (item.vote == 'yes') {
        count.yes.value++;
      } else {
        count.unknown.value++;
      }
    });

    return (
      <div className="container mb-5 pb-5">
        <h2 className="text-center my-5">Кўриб ўтиладиган масалалар</h2>
        <div className="row mx-0 px-1 mb-3">
          <div className="col-sm-7 col-lg-9">
            <h2>{this.state.title}</h2>
            <p>{this.state.content}</p>
          </div>
          <div className="col-sm-5 col-lg-3">
            <div className="row mx-0 px-1">
              <div className="col-6 grey"><h5>Umuniy</h5></div>
              <div className="col-6"><h5>{votes.length}</h5></div>
            </div>
            <div className="row mx-0 px-1">
              <div className="col-6 title-success"><h5>Rozi</h5></div>
              <div className="col-6"> <h5>{count.yes.value}</h5></div>
            </div>
            <div className="row mx-0 px-1">
              <div className="col-6 title-danger"><h5>Qarshi</h5></div>
              <div className="col-6"><h5>{count.no.value}</h5></div>
            </div>
            <div className="row mx-0 px-1">
              <div className="col-6 title-warning"><h5>Betaraf</h5></div>
              <div className="col-6"><h5>{count.unknown.value}</h5></div>
            </div>
          </div>
        </div>
        <Piechart data={count} />
      </div>
    );
  }
}

export default Results;
