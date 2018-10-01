import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { range, noop } from 'lodash';
import classnames from 'classnames';
import { lighten, rgba } from 'polished';

const styles = theme => ({
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: [[0, -1]],
  },
  cell: {
    flexGrow: 1,
    flexBasis: 60,
    textAlign: 'center',
    lineHeight: '60px',
    border: [[theme.picker.borderColor, 'solid']],
    borderWidth: [[0, 1, 1, 0]],
    cursor: 'pointer',

    '&:hover': {
      background: lighten(0.98, 'black'),
    },
  },
  readOnly: {
    position: 'relative',

    '&:after': {
      content: `""`,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: rgba('white', 0.7),
    },
  },
  label: {},
  active: {
    '& $label': {
      color: 'white',
      background: theme.palette.primary[500],
      borderRadius: '100%',
      display: 'inline-block',
      width: 34,
      height: 34,
      lineHeight: '34px',
      margin: [[13, 0]],
    },
  },
  cellGhost: {
    height: 0,
    border: 0,
  },
});

const GridPicker = ({ items, current, readOnly, classes, onChange }) => (
  <div className={classnames(classes.grid, { [classes.readOnly]: readOnly })}>
    {items.map(item => (
      <div
        key={item.key}
        className={classnames(classes.cell, {
          [classes.active]: current === item.key,
        })}
        onClick={() =>
          !readOnly && onChange(current === item.key ? undefined : item.key)
        }
      >
        <span className={classes.label}>{item.label}</span>
      </div>
    ))}

    {range(0, 20).map(value => (
      <div key={value} className={`${classes.cell} ${classes.cellGhost}`} />
    ))}
  </div>
);

GridPicker.propTypes = {
  classes: PropTypes.shape().isRequired,
  current: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
};

GridPicker.defaultProps = {
  items: [],
  onChange: noop,
  readOnly: false,
};

export default withStyles(styles)(GridPicker);
