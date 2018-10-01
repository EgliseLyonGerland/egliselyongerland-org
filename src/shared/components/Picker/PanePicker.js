import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Motion, spring } from 'react-motion';
import { findIndex, noop } from 'lodash';

import TabPicker from 'components/Picker/TabPicker';

const styles = {
  root: {
    width: '100%',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
  },
  pane: {
    width: '100%',
    whiteSpace: 'normal',
    display: 'inline-block',
    verticalAlign: 'top',
  },
};

const PanePicker = ({
  panes,
  current,
  height,
  tabBgColor,
  tabActiveBarColor,
  classes,
  onChange,
}) => {
  const currentPaneIndex = Math.max(0, findIndex(panes, ['key', current]));

  let paneStyles = {};

  if (height) {
    paneStyles = {
      height: `${height}px`,
      overflowY: 'auto',
    };
  }

  return (
    <div>
      <TabPicker
        activeBarColor={tabActiveBarColor}
        bgColor={tabBgColor}
        current={current}
        tabs={panes}
        onChange={tab => tab.active !== false && onChange(tab)}
      />

      <div className={classes.root}>
        <Motion
          defaultStyle={{ x: 0 }}
          style={{ x: spring(currentPaneIndex * 100) }}
        >
          {style => (
            <div style={{ transform: `translateX(${-style.x}%)` }}>
              {panes.map(pane => (
                <div key={pane.key} className={classes.pane} style={paneStyles}>
                  {pane.children}
                </div>
              ))}
            </div>
          )}
        </Motion>
      </div>
    </div>
  );
};

PanePicker.propTypes = {
  classes: PropTypes.shape().isRequired,
  current: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  height: PropTypes.number,
  onChange: PropTypes.func,
  panes: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool,
      children: PropTypes.any,
      key: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  tabActiveBarColor: PropTypes.string,
  tabBgColor: PropTypes.string,
};

PanePicker.defaultProps = {
  onChange: noop,
  tabBgColor: null,
  tabActiveBarColor: null,
  height: null,
};

export default withStyles(styles)(PanePicker);
