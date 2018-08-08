import React from 'react';
import Summary from '../client/src/components/Summary.jsx';
import { shallow, mount, render } from 'enzyme';

const reviewCount = 96;
const wrapper = shallow(<Summary total={reviewCount} avg={2.5} />);

describe('Summary tests', () => {

  test('it should render the total number of reviews', () => {
    expect(wrapper.find('.total').text()).toEqual(`${reviewCount} Reviews`);
  });

});
