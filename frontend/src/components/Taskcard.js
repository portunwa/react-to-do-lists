import React, { useState } from 'react'
import axios from 'axios';

import { Button, Form, Row, Card } from 'react-bootstrap';
import { BsPencilSquare, BsCheck2 } from "react-icons/bs";
import { FiEdit } from 'react-icons/fi';

const Taskcard = ({id, taskname, description}) => {
  const [toggled, setToggled] = useState(false);
  const [updatetaskname, setUpdatetaskname] = useState('');
  const [updatetaskdescription, setUpdatetaskdescription] = useState('');

  const handleEdit = () => {
    console.log("Edit Task: ", id);

    axios.put(`http://localhost:8080/api/updatetask/${id}`, {
      "Name" : updatetaskname ? updatetaskname : taskname,
      "Description" : updatetaskdescription ? updatetaskdescription : description })
    .then((res) => console.log("Edit Task: ", res))
    .catch((err) => console.log("err : ",err))

  }

  const handleFinish = () => {
    console.log("Finish Task: ", id);

    axios.delete(`http://localhost:8080/api/deletetask/${id}`)
    .then((res) => console.log("Finish Task: ", res))
    .catch((err) => console.log("err : ",err))

    window.location.reload(false);
  }

  return (
    <Card className="my-2 mx-4">
        <div className='d-flex align-items-center'>
          <Card.Body>
            <Card.Title><b>{taskname}</b></Card.Title>
            <Card.Text>{description}</Card.Text>
          </Card.Body>
          <div className='d-flex m-3'>
            <Button className='mx-2' variant="warning" onClick ={() => setToggled(!toggled)}><BsPencilSquare /> EDIT</Button>{' '}
            <Button variant="success" onClick={ handleFinish }><BsCheck2 /> FINISH</Button>{' '}  
          </div>

          { toggled && 
        <div className='d-flex mx-4'>
          <Form>
            <Row className='mb-3'> 
              <Form.Group className='mb-3' controlId="formTask">
                <Form.Label>Edit Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Task Name" 
                  defaultValue = { taskname || "" }
                  onChange = {e => setUpdatetaskname(e.target.value)} required />   
              </Form.Group>

              <Form.Group className='mb-3' controlId="formTaskDescription">
                <Form.Label>Edit Description</Form.Label>
                <Form.Control type="text" placeholder="Enter Task Description" 
                  defaultValue = { description || "" }
                  onChange = {e => setUpdatetaskdescription(e.target.value)} />   
              </Form.Group>

              <Button className='mx-3 w-25' variant="warning" type="submit" onClick={ handleEdit } ><FiEdit /> EDIT</Button>
            </Row>
          </Form>
        </div>
      }
        </div>
    </Card>
  )
}

export default Taskcard