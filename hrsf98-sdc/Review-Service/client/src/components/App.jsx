import React from 'react';
import axios from 'axios';
import path from 'path';
import Pagination from  './Pagination.jsx';
import ReviewList from './ReviewList.jsx';
import Overview from './Overview.jsx';
import CSSModules from 'react-css-modules';
import styles from './app.css';

class Reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allReviews: [],
      currentReviews: [],
      currentPage: null,
      totalPages: null,
      ratings: {},
    };

    this.onPageChanged = this.onPageChanged.bind(this);
    this.getReference = this.getReference.bind(this);
    this.revListRef = null;
  }

  componentDidMount() {
    this.getRatings();
    this.getReviews();
  }

  onPageChanged(data) {
    const { allReviews } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentReviews = allReviews.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentReviews, totalPages });
  }

  getReviews() {
    var listing_id = location.pathname.split('/')[2];
    var self = this;

    axios.get(`/reviews_service/listing/reviews/pawstel/${listing_id}`)
      .then(function(response) {
        self.setState({allReviews: response.data}, () => console.log(self.state));
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  getRatings() { 
    var listing_id = location.pathname.split('/')[2];
    var self = this;

    axios.get(`/reviews_service/listing/overview/pawstel/${listing_id}`)
      .then(function(response) {
        self.setState({ratings: response.data});
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  getReference(ref) {
    this.revListRef = ref;
  }

  render() {
    const { allReviews, currentReviews, currentPage, totalPages } = this.state;
    const totalReviews = allReviews.length;

    return (
      <div styleName='main-container'>
        <Overview ratings={this.state.ratings} />
        <ReviewList reviews={currentReviews} getRef={this.getReference}/>
        <Pagination revListRef={this.revListRef} totalRecords={totalReviews} pageNeighbours={1} onPageChanged={this.onPageChanged} />
      </div>
    );
  }
}

export default CSSModules(Reviews, styles);


// module.exports.App = App;