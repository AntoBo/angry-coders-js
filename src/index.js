import './sass/styles.scss';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

import * as TUI from './js/pagination';

//TUI pagination for markup and styles
const pagination = new Pagination('pagination', TUI.getOptions(500));
