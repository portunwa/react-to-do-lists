import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Button, Form, Row } from 'react-bootstrap';
import { FiPlus, FiSave } from "react-icons/fi";
import Taskcard from '../components/Taskcard';

function Home() {
  const [toggled, setToggled] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [addtaskname, setAddtaskname] = useState('');
  const [addtaskdescription, setAddtaskdescription] = useState('');

  const navigate = useNavigate();

  const addTask = () => {
    if (addtaskname === '') {
        return;
    }

    axios.post(`http://localhost:8080/api/createtask`, {
      "Name" : addtaskname,
      "Description" : addtaskdescription })
    .then((res) => console.log("ADD Member: ", res))
    .catch((err) => console.log("err : ",err))

    alert("Task Added Successfully");
    navigate('/');
  };

  useEffect(() => {
    axios.get('http://localhost:8080/api/task')
      .then(res => { setTasks(res.data); })
      .catch(err => { console.log(err); }
    );
  }, []);

  return (
    <>
      <div className="d-flex align-items-center">
        <h1 className="m-4 text-center"><b>TO-DO LISTS</b></h1>
        <Button variant="success" onClick ={() => setToggled(!toggled)}><FiPlus /> ADD</Button>{' '}
      </div>

      { toggled && 
        <div className='d-flex mx-4'>
          <Form>
            <Row className='mb-3'> 
              <Form.Group className='mb-3' controlId="formTask">
                <Form.Label>Task Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Task Name" 
                  defaultValue = { addtaskname || "" }
                  onChange = {e => setAddtaskname(e.target.value)} required />   
              </Form.Group>

              <Form.Group className='mb-3' controlId="formTaskDescription">
                <Form.Label>Task Description (Optional)</Form.Label>
                <Form.Control type="text" placeholder="Enter Task Description" 
                  defaultValue = { addtaskdescription || "" }
                  onChange = {e => setAddtaskdescription(e.target.value)} />   
              </Form.Group>

              <Button className='mx-3 w-25' variant="success" type="submit" onClick={ addTask } ><FiSave /> SUBMIT</Button>
            </Row>
          </Form>
        </div>
      }


      {
        tasks.length ? tasks.map(task => (
        <Taskcard key={task.TaskID} id={task.TaskID} taskname={task.Name} description={task.Description} />)) : 
        <h2 className='mx-4 text-success'>HOORAY! NO TO-DO LIST, ENJOY YOUR LIFE!</h2>
      }
    </>
  );
}

export default Home;
