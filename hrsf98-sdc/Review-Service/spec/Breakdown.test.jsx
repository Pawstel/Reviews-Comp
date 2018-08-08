import React from 'react';
import Breakdown from '../client/src/components/Breakdown.jsx';
import { shallow, mount, render } from 'enzyme';

const ratings = {
  _value: 4,
accuracy: 1,
avg: 2.5,
check_in: 3,
cleanliness: 2,
communication: 1.5,
location: 3.5,
total: 53
}

const wrapper = mount(<Breakdown ratings={ratings} />);

describe('Breakdown tests', () => {

  test('it should render a set of paw icons for every ratings category', () => {
    expect(wrapper.find('.paw').length).toEqual(24);
  });

});
