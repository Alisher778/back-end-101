import React from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import socket from '../../conf/socket';

class NewAgenda extends React.Component {
  constructor(props) {
    super(props);
    this.state = { success: '', msg: '' };
  }

  componentDidMount() {
    socket.on('agendaStatus', (data) => {
      this.setState({ ...this.state, ...data });
    })
  }

  inputHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    const { status, msg, ...data } = this.state;

    socket.emit('newAgenda', data);
  }

  msgHandler = () => {
    this.setState({ msg: '', success: null });
  }

  render() {
    console.log(this.state);
    const { success, msg } = this.state;

    return (
      <div className="container my-5">
        {
          msg && (
            <Alert color={success ? 'success' : 'danger'}>
              {msg}
              <span onClick={this.msgHandler} style={styles.alert}>&times;</span>
            </Alert>
          )
        }
        <Form style={{ maxWidth: '700px', margin: 'auto' }} onSubmit={this.onSubmitForm}>
          <h2 className="text-center">Yangi so'rovnoma</h2>
          <FormGroup>
            <Label for="exampleUrl">Sarlavha</Label>
            <Input
              type="text"
              name="title"
              id="exampleUrl"
              placeholder="Sarlavha kiriting"
              onChange={this.inputHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleText">Mazmuni</Label>
            <Input
              type="textarea"
              name="content"
              id="exampleText"
              onChange={this.inputHandler}
            />
          </FormGroup>
          <FormGroup>
            <Button color='primary' className="d-block w-100">Yaratish</Button>
          </FormGroup>
        </Form>
      </div>

    );
  }

}

const styles = {
  alert: {
    position: 'absolute',
    right: 10,
    top: 7,
    fontSize: 22,
    cursor: 'pointer',
  }
}
export default NewAgenda;