import moment from 'moment';

const formatTime = (datestamp: number) => {
  return moment(new Date(datestamp * 1000)).format('HH:mm'); // unit testing
};

export{formatTime};