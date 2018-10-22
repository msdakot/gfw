import { connect } from 'react-redux';

import * as mapActions from 'components/map-v2/actions';
import { getRecentImageryProps } from 'components/map-v2/components/recent-imagery/recent-imagery-selectors';
import * as recentImageryActions from 'components/map-v2/components/recent-imagery/recent-imagery-actions';

import Component from './recent-imagery-settings-component';

const actions = { ...mapActions, ...recentImageryActions };

export default connect(getRecentImageryProps, actions)(Component);
