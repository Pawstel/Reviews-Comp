import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './summaryStyles.css';
import Paws from './Paws.jsx';

const Summary = (props) => {
  let average = props.avg;
  return (
    <div styleName='summary-main'>
      <h2 styleName='total'>{props.total} Reviews</h2>
      <Paws size='big' rating={average} />
    </div>
  )
}

export default CSSModules(Summary, styles);
// module.exports.Summary = Summary;
