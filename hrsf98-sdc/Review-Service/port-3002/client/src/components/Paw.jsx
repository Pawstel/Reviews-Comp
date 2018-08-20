import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './pawStyles.css';

const Paw = (props) => {
  return (
    <div styleName={props.style}>
    </div>
  )
}

export default CSSModules(Paw, styles, {allowMultiple: true});
// module.exports.Paw = Paw;
