import React from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import socket from '../../conf/socket';

class NewAgenda extends React.Component {
  constructor(props) {
    super(props);
    this.state = { success: '', msg: '' };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    socket.emit('getEditAgenda', id);
    socket.on('sendEditAgenda', (data) => {
      console.log(data, '--------');

      this.setState({ ...this.state, ...data.data });
    });


  }

  inputHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    const { status, msg, ...data } = this.state;

    socket.emit('editAgenda', data);
  }

  msgHandler = () => {
    this.setState({ msg: '', success: null });
  }

  render() {
    console.log(this.state);
    const { success, msg, title, content } = this.state;

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
              value={title}
              onChange={this.inputHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleText">Mazmuni</Label>
            <Input
              type="textarea"
              name="content"
              id="exampleText"
              value={content}
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