import React from 'react';
import ReviewEntry from '../client/src/components/ReviewEntry.jsx';
import { shallow, mount, render } from 'enzyme';

const review = {
  _date: "2015-07-26T05:20:44.000Z", 
  content: "Such comfort. lol. blep. best pupdate. 10/10. Did me a concern. Much classy. Would fluff again. Host is good boy. So pad. slept on tha sofa. Remain calm!. Listen frien. Wow",
  is_reported: null,
  name: "Mustang",
  photo: "https://s3-us-west-1.amazonaws.com/adamdogpics/n02106382_2417.jpg"
}

const wrapper = shallow(<ReviewEntry review={review} />);

describe('avatar tests', () => {

  test('avatars should render as images', () => {
    expect(wrapper.find('.avatar').type()).toEqual('img');
  });

  test('avatars should recieve correct urls', () => {
    expect(wrapper.find('.avatar').prop('src')).toEqual(review.photo);
  });

});

describe('content tests', () => {
  test('review entries should render correct text', ()=> {
    expect(wrapper.find('.content').text()).toEqual(review.content);
  });
});

