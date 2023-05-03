import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Alert,
  Table,
} from "reactstrap";
// core components
import EditHeader from "../../components/Headers/EditHeader";
import axios from "axios";
import AllCategory from "../../components/AllCategory.js";
import { getAllCategorie } from "network/ApiAxios";

const EditProfile = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState([]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("http://localhost:5000/category/newCat", {
        name,
        description,
      });
      data && setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const run = async () => {
      const response = await getAllCategorie();
      const { data } = response;
      console.log(data);
      if (data) {
        setCategory(data);
      }
    };
    run();
  }, []);
  return (
    <>
      <EditHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Add new Category</h3>
                  </Col>

                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={handleClick}
                      size="sm"
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Category information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Name of Category"
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Description
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            onChange={(e) => setDescription(e.target.value)}
                            type="text"
                            placeholder="Add description"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
            {visible && (
              <Alert
                color="success"
                toggle={() => setVisible(false)}
                isOpen={visible}
              >
                Category is created successfully!
              </Alert>
            )}
          </div>
        </Row>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">All Category</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>

                {category.map((cat) => (
                  <AllCategory cat={cat} key={cat._id} />
                ))}
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default EditProfile;
