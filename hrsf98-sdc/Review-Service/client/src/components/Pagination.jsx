import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './paginationStyles.css';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i++;
    
  }

  return range;
}

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    const {totalRecords = null, pageLimit = 7, pageNeighbours = 0} = this.props;

    //pageLimit = max # of reviews per page
    this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 7;
    //totalRecords = total # of reviews
    this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;
    //pageNeighbors = # of pages to show on either side of current page
    this.pageNeighbours = typeof pageNeighbours === 'number' ?
    //maybe need to change next line to limit pageNeighbours to 1
    Math.max(0, Math.min(pageNeighbours, 2)) : 0;
    //totalPages = total number of pages needed to display all the records
    this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);

    this.state = {
      currentPage: 1,
    };

    this.gotoPage = this.gotoPage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMoveLeft = this.handleMoveLeft.bind(this);
    this.handleMoveRight = this.handleMoveRight.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.totalRecords !== this.totalRecords) {
      this.totalRecords = nextProps.totalRecords;
      this.pageNeighbours = nextProps.pageNeighbours;
      this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);
      this.setState({currentPage: 1}, function() {
      this.gotoPage(this.state.currentPage);
      if (nextProps.revListref !== null) {
        this.revListRef = nextProps.revListRef;
      }
      });
    }
  }

  componentDidMount() {
    this.gotoPage(1);
  }

  gotoPage(page) {
    // this means? - maybe: onPageChanged = props.onPageChanged || a function that returns the value passed to it
    const { onPageChanged = f => f } = this.props;

    //this sets the currentPage to be 0, the passed in page, or the last page?
    const currentPage = Math.max(0, Math.min(page, this.totalPages));

    const paginationData = {
      currentPage,
      totalPages: this.totalPages,
      pageLimit: this.pageLimit,
      totalRecords: this.totalRecords
    }

    //this line uses a callback to update the component's state [theorectically because the callback does some other work as well]
    this.setState({ currentPage: currentPage }, () => onPageChanged(paginationData));
  }

  // ** ask about this syntax
  handleClick(evt, page) {
    evt.preventDefault();
    this.gotoPage(page);
    ReactDOM.findDOMNode(this.revListRef).scrollIntoView({block: 'start', inline: 'start', behavior: 'smooth'});
  }

  handleMoveLeft(evt) {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage - 1);
    ReactDOM.findDOMNode(this.revListRef).scrollIntoView({block: 'start', inline: 'start', behavior: 'smooth'});
  }

  handleMoveRight(evt) {
    evt. preventDefault();
    this.gotoPage(this.state.currentPage + 1);
    console.log(this.refs)
    ReactDOM.findDOMNode(this.revListRef).scrollIntoView({block: 'start', inline: 'start', behavior: 'smooth'});
  }

  fetchPageNumbers() {
    const totalPages = this.totalPages;
    const currentPage = this.state.currentPage;
    const pageNeighbours = this.pageNeighbours;
    let pagesToRender;
    //totalNumbers = amount of numbers (pages) to display [start, end, current, neighbors]
    //maybe need to change this next line [to account for ellipsis]
    let totalNumbers = (this.pageNeighbours * 2) + 3;

    if (currentPage <= 2 || currentPage >= totalPages - 1) {
      totalNumbers = (this.pageNeighbours * 2) + 1;
    } else if (currentPage === 3 || currentPage === totalPages - 2) {
      totalNumbers = (this.pageNeighbours * 2) + 2;
    } 
    //total block = # of pages to display + page switch buttons
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      //start page = lowest neighbour
      const startPage = Math.max(2, currentPage - pageNeighbours); //12
      //end page = highest neighbour
      const endPage = Math.min(totalPages -1, currentPage + pageNeighbours) //13
      // gives you a range from lowestNeighbor to highestNeighbor (this will be good for getting middle numbers)
      let pages = range(startPage, endPage);    

      //this should determine whether I need first elipsis
      const hasLeftSpill = startPage > 3;
      //this should determine whether I need last elipsis
      const hasRightSpill = (totalPages - endPage) > 1;
      //not sure what spillOffset refers to, need to figure that out [index of curPage?]
      const spillOffset = totalNumbers - (pages.length + 1); //5?

      // I maybe need an extra conditinal for determining whether I need left and/or right switch

      switch(true) {
        //so if curr page @ or close to pageNum
        case (currentPage === 4): {
          pages = [2, 3, 4, 5, '...'];
          break;
        }

        case(currentPage === totalPages - 3): {
          pages = [ '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1];
          break;
        }

        case(hasLeftSpill && !hasRightSpill): {
          const extraPages = range(startPage - spillOffset, startPage -1);
          pages = ['...', ...extraPages, ...pages];
          break;
        }

        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, '...'];
          break;
        }

        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [ '...', ...pages, '...'];
          break;
        }
      }
      pagesToRender = [1, ...pages, totalPages];

      if (currentPage > 1) {
        pagesToRender.unshift(LEFT_PAGE);
      }

      if (currentPage < totalPages) {
        pagesToRender.push(RIGHT_PAGE);
      }

      return pagesToRender;
    }

    return range(1, totalPages);
  }

  render() {
    if (!this.totalRecords || this.totalPages === 1) return null;

    const { currentPage } = this.state;
    const pages = this.fetchPageNumbers();

    return (
      <Fragment>
        <nav arial-label='Reviews Pagination'>
          <ul styleName='pagination-main'>
            {pages.map((page, index) => {

              if (page === LEFT_PAGE) return (
                <li key={index} className='page-item'>
                  <button arial-label="Previous" onClick={this.handleMoveLeft}>
                    <div styleName='switch'>
                      <span aria-hidden="true">&lt;</span>
                    </div>
                  </button>
                </li>
              );

              if (page === RIGHT_PAGE) return (
                <li key={index} className="page-item">
                  <button  aria-label="Next" onClick={this.handleMoveRight}>
                    <div styleName='switch'>
                      <span aria-hidden="true">&gt;</span>
                    </div>
                  </button>
                </li>
              );

              if (page === '...') return (
                <li key={index} className="page-item">
                  <span className='elipsis' aria-hidden="true">&hellip;</span>
                </li>
              )

              return (
                <li key={index} styleName={`page-item${ currentPage === page ? ' active' : ''}`}>
                  <button onClick={ (evt) => this.handleClick(evt, page) }>
                    <div>
                      { page }
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </Fragment>
    );
  }
}

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func
}

export default CSSModules(Pagination, styles, {allowMultiple: true});
