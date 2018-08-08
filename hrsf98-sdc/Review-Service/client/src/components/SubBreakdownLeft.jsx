import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './subBreakdownStyles.css';
import Paws from './Paws.jsx'

const SubBreakdownLeft = (props) => {
  
  return (
    <div styleName='sub-container left'>

      <div styleName='row clearfix'>
        <div styleName='sub-row left'>
          <span styleName='title'>Accuracy</span>
        </div>
        <div styleName='sub-row left clearfix'>
          <div styleName='right paws-container'>
            <Paws size='small' rating={props.ratings.Accuracy}/>
          </div>
        </div>
      </div>

      <div styleName='row clearfix'>
        <div styleName='sub-row left'>
          <span styleName='title'>Communication</span>
        </div>
        <div styleName='sub-row left clearfix'>
          <div styleName='right paws-container'>
            <Paws size='small' rating={props.ratings.Communication}/>
          </div>
        </div>
      </div>

      <div styleName='row clearfix'>
        <div styleName='sub-row left'>
          <span styleName='title'>Cleanliness</span>
        </div>
        <div styleName='sub-row left clearfix'>
          <div styleName='right paws-container'>
            <Paws size='small' rating={props.ratings.Cleanliness}/>
          </div>
        </div>
      </div>

    </div>
  ) 
} 



export default CSSModules(SubBreakdownLeft, styles, {allowMultiple: true});
module.exports.SubBreakdownLeft = SubBreakdownLeft;
