import React from 'react';
import Paws from '../client/src/components/Paws.jsx';
import { shallow, mount, render } from 'enzyme';

const rating = Math.round((Math.random() * (4 - 1) + 1) * 2)/2;
const full = Math.floor(rating);
const half = full !== rating;
const halfCount = half ? 1 : 0;
const empty = 4 - full - halfCount;

const wrapper = mount(<Paws rating={rating} />);

describe('Paws tests', () => {

  test('Paws should render correct # of full paw icons', () => {
    expect(wrapper.find('.full').length).toEqual(full);
  });

  test('Paws should render correct # of half paw icons', () => {
    expect(wrapper.find('.half').length).toEqual(halfCount);    
  });

  test('Paws should render correct # of empty paw icons', () => {
    expect(wrapper.find('.empty').length).toEqual(empty);
  });

});
