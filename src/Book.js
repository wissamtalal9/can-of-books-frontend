import { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import bookImg from './assets/books.jpg';


export default class Book extends Component {
  render() {
    return (
      <>
        <img
          className="d-block w-100"
          src={bookImg}
          alt="img of book"
        />
        <Carousel.Caption>
          <h3>{this.props.title}</h3>
          <p>{this.props.description}</p>
          <p>{this.props.status}</p>
          <button onClick={() => this.props.onUpdateModal(this.props.book)}>Update Book</button>
          <button onClick={() => this.props.onDelete(this.props.book)}>Delete Book</button>
        </Carousel.Caption>
      </>
    );
  }
}
