import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";

const AllMessages = ({ message }, args) => {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState();
  const [role, setRole] = useState();
  const [tuser, setTuser] = useState("");
  const [organisateur, setOrganisateur] = useState("");

  const toggle = () => setModal(!modal);

  const id = message._id;

  const getUserById = async () => {
    try {
      const data = await axios.get(
        `http://localhost:5000/user/getUser/${message.userId}`
      );
      //   console.log(data.data.name);
      setUser(data.data.name);
      setRole(data.data.role);
    } catch (error) {}
  };
  useEffect(() => {
    getUserById();
  }, []);

  const handleChange = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.put(
        `http://localhost:5000/user/updateRole/${message.userId}`,
        { role: tuser || organisateur }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <tbody>
        <tr>
          <th scope="row">{user}</th>

          <td>{message.message}</td>
          <Button onClick={() => {}} className="mr-4" color="danger" size="sm">
            Delete
          </Button>

          {/* <Button color="info" onClick={toggle}>
            Update Role
          </Button> */}
          <Modal isOpen={modal} toggle={toggle} {...args}>
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>
              {/* <h3>Name : {message.name}</h3>
              <h3>Email : {message.email}</h3>
              <h3>Adress : {message.location}</h3>
              <h3>Phone : {message.phone}</h3> */}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={toggle}>
                Back
              </Button>
            </ModalFooter>
          </Modal>
        </tr>
      </tbody>
      <label for="cars">Update User:</label>
      <select name="cars" id="cars">
        <option onChange={(e) => setTuser(e.target.value)} value="tuser">
          User
        </option>
        <option
          onSelect={(e) => {
            setOrganisateur(e.target.value);
            console.log(e);
          }}
          value="Organisateur"
        >
          Organisateur
        </option>
      </select>
      <Button onClick={handleChange} color="primary" outline>
        Update
      </Button>
    </>
  );
};

export default AllMessages;
