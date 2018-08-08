import React from 'react';
import ReviewList from '../client/src/components/ReviewList.jsx';
import { shallow, mount, render } from 'enzyme';

const reviews = [
  {name: "Boss", photo: "https://s3-us-west-1.amazonaws.com/adamdogpics/n02101556_8039.jpg", _date: "2018-03-29T04:38:39.000Z", content: "mlem. Much opulent. Heckin big shower. Would bork … sofa. Listen frien. lol. So decor. OMG. Many pad", is_reported: null},
{name: "Buzz", photo: "https://s3-us-west-1.amazonaws.com/adamdogpics/n02111277_1177.jpg", _date: "2017-11-24T14:54:01.000Z", content: "Host is good boy. mlem. Remain calm!. Would bork a…id me a frighten. best pupdate. slept on tha sofa", is_reported: null},
{name: "Viva", photo: "https://s3-us-west-1.amazonaws.com/adamdogpics/n02111500_1050.jpg", _date: "2017-11-16T11:23:29.000Z", content: "lol. v happy. Much decor. Did me a concern. best p…. Would fluff again. Many classy. Such pad. 10/10", is_reported: null},
{name: "Butterball", photo: "https://s3-us-west-1.amazonaws.com/adamdogpics/n02109961_3817.jpg", _date: "2017-10-26T00:40:03.000Z", content: "Amaze. Would sploot again. v happy. Remain calm!. …on. Wow. Host is good boy. Heckin awesome opulent", is_reported: null},
{name: "Chester", photo: "https://s3-us-west-1.amazonaws.com/adamdogpics/n02110958_12025.jpg", _date: "2017-10-05T10:58:25.000Z", content: "Heckin awesome lighting. 10/10. Did me a frighten.…n. Wow. best pupdate. blep. Host is good boy. lol", is_reported: null},
{name: "Casanova", photo: "https://s3-us-west-1.amazonaws.com/adamdogpics/n02110063_8757.jpg", _date: "2017-09-07T10:49:55.000Z", content: "slept on tha sofa. Such location. Would bork again…concern. mlem. Amaze. best pupdate. Many lighting", is_reported: null},
{name: "Shrimp", photo: "https://s3-us-west-1.amazonaws.com/adamdogpics/n02109525_10792.jpg", _date: "2017-08-31T02:04:17.000Z", content: "Heckin big shower. Amaze. Would boop again. Heckin…frien. Much pad. Did me a frighten. Many location", is_reported: null}
]

const wrapper = mount(<ReviewList reviews={reviews}/>)

describe('ReviewList Tests', ()=> {
  test('Review List should make a review entry for every review', ()=> {
    expect(wrapper.find('.review-list').children().length).toEqual(reviews.length);
  })
});


