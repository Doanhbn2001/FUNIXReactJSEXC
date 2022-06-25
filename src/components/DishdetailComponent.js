import React, { useState, usestate } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Nav,
  NavItem,
  Row,
  Col,
  Label,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";

function RenderDish({ dish }) {
  return (
    <div className="col-12 col-md-5 m-1 dis">
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
      </Card>
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </div>
  );
}

function RenderComments({ comments }) {
  if (comments != null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {comments.map((comment) => {
            return (
              <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>
                  -- {comment.author},
                  {new Intl.DateTimeFormat(
                    "en-Us",
                    {},
                    { year: "numeric", month: "short", day: "2-digit" }
                  ).format(new Date(Date.parse(comment.date)))}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return <div></div>;
  }
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => !val || val.length >= len;
const isNumber = (val) => !isNaN(Number(val));

const DishDetail = (props) => {
  const [isModalOpen, setState] = useState(false);
  const handleSubmit = (values) => {
    console.log("Current State is: " + JSON.stringify(values));
    alert(JSON.stringify(values));
  };
  const toggleModal = () => {
    setState(!isModalOpen);
  };
  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDish dish={props.dish} />
          <RenderComments comments={props.comments} />
        </div>
        <div className="row">
          <div className="col-5"></div>
          <div>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Button outline onClick={toggleModal}>
                  <span className="fa fa-sign-in fa-lg"></span> Submit Comment
                </Button>
              </NavItem>
            </Nav>
          </div>
        </div>
        <div className="row">
          <Modal isOpen={isModalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={(values) => handleSubmit(values)}>
                <Row className="form-group">
                  <label htmlFor="rating">Rating</label>
                  <Control.text
                    model=".rating"
                    id="rating"
                    name="rating"
                    placeholder="1"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                      isNumber: isNumber,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".rating"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less",
                      isNumber: " Must be a number",
                    }}
                  />
                </Row>
                <Row className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <Control.text
                    model=".name"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less",
                    }}
                  />
                </Row>
                <Row className="form-group">
                  <Label htmlFor="comment">Comment</Label>
                </Row>
                <Row>
                  <Col>
                    <Control.textarea
                      model=".comment"
                      id="comment"
                      name="comment"
                      rows="7"
                      className="form-control"
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col>
                    <Button type="submit" color="primary">
                      Submit
                    </Button>
                  </Col>
                </Row>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DishDetail;
