import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime'; // load on demand

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);
export default dayjs;
