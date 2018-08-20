import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './subBreakdownStyles.css';
import Paws from './Paws.jsx'

const SubBreakdownRight = (props) => {
  
  return (
    <div styleName='sub-container right right-box'>

      <div styleName='row clearfix'>
        <div styleName='sub-row left'>
          <span styleName='title'>Location</span>
        </div>
        <div styleName='sub-row left clearfix'>
          <div styleName='right paws-container'>
            <Paws size='small' rating={props.ratings.Location}/>
          </div>
        </div>
      </div>

      <div styleName='row clearfix'>
        <div styleName='sub-row left'>
          <span styleName='title'>Check-in</span>
        </div>
        <div styleName='sub-row left clearfix'>
          <div styleName='right paws-container'>
            <Paws size='small' rating={props.ratings['Check-in']}/>
          </div>
        </div>
      </div>

      <div styleName='row clearfix'>
        <div styleName='sub-row left'>
          <span styleName='title'>Value</span>
        </div>
        <div styleName='sub-row left clearfix'>
          <div styleName='right paws-container'>
            <Paws size='small' rating={props.ratings.Value}/>
          </div>
        </div>
      </div>

    </div>
  ) 
} 



export default CSSModules(SubBreakdownRight, styles, {allowMultiple: true});
module.exports.SubBreakdownRight = SubBreakdownRight;
