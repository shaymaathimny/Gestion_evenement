import { deleteUser } from "network/ApiAxios";
import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const AllUsers = ({ user }, args) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const id = user._id;
  const aziz = async () => {
    const response = await deleteUser(id);
    const { data } = response;

    if (data) {
      console.log(data);
      window.location.reload();
    }
  };

  return (
    <>
      <tbody>
        <tr>
          <th scope="row">{user.name}</th>
          <td>{user.email}</td>
          <Button onClick={aziz} className="mr-4" color="danger" size="sm">
            Delete
          </Button>
          <Button color="info" onClick={toggle}>
            More Info
          </Button>
          <Modal isOpen={modal} toggle={toggle} {...args}>
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>
              <h3>Name : {user.name}</h3>
              <h3>Email : {user.email}</h3>
              <h3>Adress : {user.location}</h3>
              <h3>Phone : {user.phone}</h3>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={toggle}>
                Back
              </Button>
            </ModalFooter>
          </Modal>
        </tr>
      </tbody>
    </>
  );
};

export default AllUsers;
