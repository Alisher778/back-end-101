import React from 'react';
import { Link } from 'react-router-dom';
import { Media, ListGroupItem, Button } from 'reactstrap';
import img from '../../assets/img/employee.svg'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

const AgendaList = ({ data, createPoll, deletePoll }) => {
  console.log(data);

  return (
    <ListGroupItem>
      <Media className="align-items-center">
        <img src={img} alt="Generic placeholder image" width="75" />
        <Media body className="mx-4">
          <Media heading>
            {data.title}
          </Media>
          {data.content}
        </Media>
        <div className="text-center">
          <Link outline color="info" className="btn-sm" to={`/agendas/${data._id}/edit`}><AiOutlineEdit /></Link>
          <Button outline color="danger" className="btn-sm mx-2" onClick={() => deletePoll(data._id)}><AiOutlineDelete /></Button>
          <Button color="success" onClick={() => createPoll({ _id: data, title: data.title, content: data.content })}>Ovozga Qo'yish</Button>
        </div>

      </Media>
    </ListGroupItem>
  );
};

export default AgendaList;