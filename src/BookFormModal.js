import { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class BookFormModal extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    const bookInformation = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.statusbox.checked,
      email: event.target.email.value,
    };
    this.props.onCreate(bookInformation);
  }



  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="title" placeholder="Enter book title" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          {/* //might not need onChange */}
          <Form.Control type="description" placeholder="Enter book description" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="statusbox">
          <Form.Check type="checkbox" label="Read" />
        </Form.Group>

        <Button variant="primary" type="submit">
          SUBMIT
        </Button>

      </Form>
    );
  }
}

export default BookFormModal;
