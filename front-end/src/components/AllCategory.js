import { deleteCategory } from "network/ApiAxios";
import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const AllCategory = ({ cat }, args) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const id = cat._id;
  const aziz = async () => {
    const response = await deleteCategory(id);
    const { data } = response;
    if (data) {
      window.location.reload();
    }
  };
  return (
    <>
      <tbody>
        <tr>
          <th scope="row">{cat.name}</th>
          <td>{cat.description}</td>
          <Button onClick={aziz} className="mr-4" color="danger" size="sm">
            Delete
          </Button>
        </tr>
      </tbody>
    </>
  );
};

export default AllCategory;
