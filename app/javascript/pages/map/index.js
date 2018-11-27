import { connect } from 'react-redux';

import { setMenuSettings } from 'components/map-v2/components/menu/menu-actions';
import PageComponent from './component';

export default connect(null, { setMenuSettings })(PageComponent);
