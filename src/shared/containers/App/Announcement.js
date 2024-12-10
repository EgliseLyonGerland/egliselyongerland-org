import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import useLocalStorage from 'react-use-localstorage';
import { isAfter, isBefore } from 'date-fns';

import {
  closeAnnouncement,
  openAnnouncement,
} from 'store/actions/announcement';
import Announcement from 'components/Announcement/Announcement';

const mapStateToProps = state => ({
  config: state.config.data,
  opened: state.announcement.opened,
  count: state.announcement.count,
});

const mapDispatchToProps = {
  open: openAnnouncement,
  close: closeAnnouncement,
};

function AnnouncementContainer({ config, opened, count, open, close }) {
  const { announcement: data } = config;

  if (data.enabled === false) {
    return null;
  }

  if (!__CLIENT__ || !data) {
    return null;
  }

  const [disableAnnouncement, setDisableAnnouncement] = useLocalStorage(
    'disableAnnouncement',
    0,
  );

  const now = new Date();
  const startAt = new Date(data.startAt);
  const endAt = new Date(data.endAt);

  useEffect(() => {
    if (
      disableAnnouncement === `${data.id}` ||
      count !== 0 ||
      isBefore(now, startAt) ||
      isAfter(now, endAt)
    ) {
      return;
    }

    setTimeout(() => {
      open();
    }, 5000);
  }, []);

  return (
    opened && (
      <Announcement
        title={data.title}
        content={data.content}
        onCloseButtonClicked={remind => {
          if (!remind) {
            setDisableAnnouncement(data.id);
          }
          close();
        }}
      />
    )
  );
}

AnnouncementContainer.propTypes = {
  config: PropTypes.shape().isRequired,
  opened: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  close: PropTypes.func.isRequired,
  open: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnnouncementContainer);
