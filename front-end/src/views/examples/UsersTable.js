import React, { useEffect, useState } from "react";
import Header from "../../components/Headers/Header";
import { Button, Card, CardHeader, Container, Row, Table } from "reactstrap";
import { deleteUser, getAll, getAllUsers } from "../../network/ApiAxios";
import { useParams } from "react-router-dom";
import AllUsers from "./AllUsers";

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  const id = users.map((user, key) => key.toString.length);

  useEffect(() => {
    const runAsync = async () => {
      const response = await getAllUsers();
      const { data } = response;
      console.log(data);
      if (data) {
        setUsers(data);
      }
    };
    runAsync();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Users</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                  </tr>
                </thead>
                {users.map((user) => (
                  <AllUsers user={user} key={user._id} />
                ))}
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default UsersTable;
