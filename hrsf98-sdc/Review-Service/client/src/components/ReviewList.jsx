
import React from 'react';

import CSSModules from 'react-css-modules';

import styles from './reviewListStyles.css';

import ReviewEntry from './ReviewEntry.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.ReviewListRef = React.createRef();
  }

  // componentWillReceiveProps(nextProps) {
  //   this.reviews = nextProps.reviews;
  //   console.log(this.reviews)
  // }

  render() {
    return (
      <div ref='reviewList' styleName='review-list' ref={this.props.getRef}>
        {this.props.reviews.map((review, index) =>
          <ReviewEntry review={review} key={index} />
        )}
      </div>
    )
  }
}  

export default CSSModules(ReviewList, styles);