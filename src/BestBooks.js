import React from 'react';
import Book from './Book';
import axios from 'axios';
import BookFormModal from './BookFormModal';
import AddBookButton from './AddBookButton';
import Carousel from 'react-bootstrap/Carousel';
import UpdateBook from './UpdateBook';
import { withAuth0 } from '@auth0/auth0-react';

const API = process.env.REACT_APP_API_URL;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false,
      selectBook: null,
    };
  }

  //This is showing the create a book form
  BookFormHandler = () => {
    this.setState({
      showModal: true
    });
  }

  //this was our app.get function before
  componentDidMount = () => {
    this.props.auth0.getIdTokenClaims().then(async res => {
      const  jwt_key= res.__raw;

      const config = {
        headers: { Authorization: `Bearer ${jwt_key}` },
        baseURL: API,
        url: '/books',
        params: { email: this.props.auth0.user.email },
        method: 'get'
      };

      const responses = await axios(config);

      this.setState({ books: responses.data });
    })
      .catch(err => console.error(err));
  }

  //This function, along with addBook is creating a book
  createBook = async (bookInformation) => {
    this.props.auth0.getIdTokenClaims().then(async res => {
      const jwt_key = res.__raw;

      const config = {
        headers: { Authorization: `Bearer ${jwt_key}` },
        data: bookInformation,
        baseURL: API,
        url: '/books',
        method: 'post',
        params: { email: this.props.auth0.user.email }
      };
      try {
        const responses = await axios(config);
        const newBook = responses.data;
        const books = [...this.state.books, newBook];
        this.setState({ books });
        this.setState({ showModal: false });
      } catch (err) {
        console.error(err);
      }
    });
  }

  //This is showing the update a book form
  UpdateModal = (book) => {
    this.setState({
      selectedBook: book
    });
  }

  //This is hiding the update a book form
  closeUpdatedModal = () => {
    this.setState({
      selectBook: null
    });
  }

  updateBook = async (updateBooklast) => {

    this.props.auth0.getIdTokenClaims().then(async res => {
      const jwt_key = res.__raw;

      const config = {
        headers: { 'Authorization': `Bearer ${jwt_key}` },
        data: updateBooklast,
        method: 'put',
        baseURL: API,
        url: `/books/${updateBooklast._id}`,
        params: { email: this.props.auth0.user.email },
      };
      try {
        const responses = await axios(config);
        const updatedBook = responses.data;
        const books = this.state.books.map(currentBook => updatedBook._id === currentBook._id ? updatedBook : currentBook);
        this.setState({ books, selectBook: null });
      } catch (err) {
        console.log(err);
      }
    });
  }

  // function that removes book from carousel
  removeBook = async (bookRemove) => {
    this.props.auth0.getIdTokenClaims().then(async res => {
      const jwt_key = res.__raw;
      const config = {
        params: { email: this.props.auth0.user.email },
        headers: { 'Authorization': `Bearer ${jwt_key}` },
        method: 'delete',
        baseURL: process.env.REACT_APP_API_URL,
        url: `/books/${bookRemove._id}`,
        data: bookRemove,
      };
      await axios(config);
      const books = this.state.books.filter(candidate => candidate._id !== bookRemove._id);
      this.setState({ books });
    });
  }

  render() {
    return (
      <>
        <h2>My Book List</h2>

        {this.state.books.length ? (
          <Carousel>{this.state.books.map((books) => {
            return (
              <Carousel.Item key={books._id}>
                <Book
                  title={books.title}
                  description={books.description}
                  status={books.status}
                  email={books.email}
                  onDelete={this.removeBook}
                  onUpdateModal={this.UpdateModal}
                  book={books}>
                </Book>
              </Carousel.Item>
            );
          })}
          </Carousel>) : (<h3>No Books Found </h3>)}


        {this.state.showModal ? <BookFormModal onCreate={this.createBook} /> : <AddBookButton onButtonClick={this.BookFormHandler} />}

        <UpdateBook book={this.state.selectBook} onUpdate={this.updateBook} onClose={this.closeUpdatedModal} />

      </>
    );
  }
}

export default withAuth0(BestBooks);
