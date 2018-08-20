import React from 'react';
import Pagination from '../client/src/components/Pagination.jsx';
import { shallow, mount, render } from 'enzyme';

const totalReviewsMax = 95;
const totalReviewsMin = 20;

const maxWrapper = mount(<Pagination totalRecords={totalReviewsMax} pageNeighbours={1} revListRef={null}  />);
const minWrapper = mount(<Pagination totalRecords={totalReviewsMin} pageNeighbours={1} revListRef={null}  />);

describe('Paginations tests', () => {

  test('it should render the correct number of pages/swtiches/elipsis when initiated with more pages than can be shown', () => {
    expect(maxWrapper.find('.pagination-main').children().length).toEqual(6);
  });

  test('it should render the correct number of pages when initiated less than 6 pages', () => {
    expect(minWrapper.find('.pagination-main').children().length).toEqual(3);
  });
});
