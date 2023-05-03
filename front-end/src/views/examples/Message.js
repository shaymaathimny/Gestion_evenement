import React, { useEffect, useState } from "react";
import Header from "../../components/Headers/Header";
import { Button, Card, CardHeader, Container, Row, Table } from "reactstrap";
import { getAllMessages } from "network/ApiAxios";
import AllMessages from "./AllMessages";

const Message = ({}, args) => {
  const [messages, setMessages] = useState([]);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    const getAllMessage = async () => {
      const result = await getAllMessages();
      const { data } = result;
      // console.log(data);
      setMessages(data);
    };
    getAllMessage();
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
                {messages.map((message) => (
                  //   <AllUsers user={user} key={user._id} />
                  <AllMessages message={message} key={message._id} />
                ))}
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Message;
