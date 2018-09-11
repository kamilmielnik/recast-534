import PropTypes from 'prop-types';

const propTypes = {
  timeseries: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number,
    timestamp: PropTypes.number
  })),
  trendChangePercentage: PropTypes.number
};

export default Component;
