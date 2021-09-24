import { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class UpdateBook extends Component {

  handleSubmit = event => {
    event.preventDefault();
    this.props.onUpdate({
      _id: this.props.book._id,
      title: event.target.title.value,
      description: event.target.description.value,
      email: event.target.email.value,
      status: event.target.StatusCheckbox.checked,
    });
  };


  handleClose = () => {
    this.props.onClose();
  }


  render() {

    if (!this.props.book) return null;
    return (
      <Modal show={this.props.book} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Book</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="name" placeholder="Enter book title" defaultValue={this.props.book.title} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="name" placeholder="Enter book Description" defaultValue={this.props.book.description} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="name" placeholder="Enter email" defaultValue={this.props.book.email} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="StatusCheckbox">
              <Form.Check type="checkbox" label="Read" defaultChecked={this.props.book.status} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default UpdateBook;
