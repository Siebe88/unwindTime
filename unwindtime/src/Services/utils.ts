import moment from 'moment';
import {Timestamp} from 'firebase/firestore'

const formatTime = (datestamp: Timestamp) => {
  return moment(new Date(datestamp.seconds * 1000)).format('HH:mm'); // unit testing
};

export{formatTime};