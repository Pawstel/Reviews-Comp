import React from 'react';
import App from '../client/src/components/App.jsx';
import { shallow, mount, render } from 'enzyme';

//try testing if getReviews and getRatings were called instead

let spy

afterEach(() => {
  spy.mockClear()
})

describe('state should be set on initialization', () => {

  test('getRatings should be called on instantiation of app', async () => {
    // const appInstance = mount(<App listing_id={2} />);

    // await appInstance.instance().componentDidMount();
    // await sleep(DELAY_MS + 2500);
    // console.log(appInstance.state().ratings);
    // expect(appInstance.state().ratings).toHaveProperty('accuracy');

    spy = jest.spyOn(App.prototype, 'getRatings');
    const wrapper = shallow(<App listing_id={2} />);
    expect(spy).toHaveBeenCalled();
  });

  test('getReviews should be called on instantiation of app', async () => {
 
    spy = jest.spyOn(App.prototype, 'getReviews');
    const wrapper = shallow(<App listing_id={2} />);
    expect(spy).toHaveBeenCalled();
  });


});