import React from 'react';
import Summary from './Summary.jsx';
import Breakdown from './Breakdown.jsx';
import CSSModules from 'react-css-modules';
import styles from './app.css';

const Overview = (props) => {
  return (
    <div>
      <Summary total={props.ratings.total} avg={props.ratings.avg} />
      <Breakdown ratings={props.ratings}/>
    </div>
  );
};


export default CSSModules(Overview, styles);
// module.exports.Overview = Overview;
