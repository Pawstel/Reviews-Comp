import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './breakdownStyles.css';
import SubBreakdownLeft from './SubBreakdownLeft.jsx'
import SubBreakdownRight from './SubBreakdownRight.jsx'

const Breakdown = (props) => {

  const leftRatings = {};
  const rightRatings = {};

  leftRatings['Accuracy'] = props.ratings.accuracy;
  leftRatings['Communication'] = props.ratings.communication;
  leftRatings['Cleanliness'] = props.ratings.cleanliness;
  rightRatings['Location'] = props.ratings.cleanliness;
  rightRatings['Check-in'] = props.ratings.cleanliness;
  rightRatings['Value'] = props.ratings._value;


  return (
    <div styleName='clearfix main-container'>
      <SubBreakdownLeft ratings={leftRatings} />
      <SubBreakdownRight ratings={rightRatings} />
    </div>
  ) 
}

export default CSSModules(Breakdown, styles, {allowMultiple: true});
// module.exports.Breakdown = Breakdown;

