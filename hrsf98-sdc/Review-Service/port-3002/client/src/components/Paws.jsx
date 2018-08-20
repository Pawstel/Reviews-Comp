import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './pawsStyles.css';
import Paw from './Paw.jsx';

class Paws extends React.Component {
  constructor(props) {
    super(props);

    this.rating = this.props.rating;
    this.size = this.props.size
  }

  componentWillReceiveProps(nextProps) {
    this.rating = nextProps.rating;
  }

  getPaws() {
    const arr = [];
    let addHalf = !(this.rating === Math.floor(this.rating));
    let fullPaws = Math.floor(this.rating);
    let emptyPaws = 4 - fullPaws;

    if (addHalf) {
      emptyPaws--;
    }

    for (let i = 0; i < fullPaws; i++) {
      arr.push(`paw full ${this.size}`);
    }

    if (addHalf) {
      arr.push(`paw half ${this.size}`);
    }

    for (let i = 0; i < emptyPaws; i++) {
      arr.push(`paw empty ${this.size}`);
    }


    return arr;
  }

  render() {
    return (
      <div styleName='paws-container'>
        {this.getPaws().map(
          (style, index) => <Paw key={index} style={style}/>
        )}
      </div>
    )
  }
} 

export default CSSModules(Paws, styles);
// module.exports.Paws = Paws;
