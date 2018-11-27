import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Icon from 'components/ui/icon';

import './styles.scss';

class CategoriesMenu extends PureComponent {
  render() {
    const { categories, onSelectCategory } = this.props;

    return (
      <ul className="c-categories-menu">
        {categories.map(c => (
          <li key={c.category}>
            <button
              className={cx({ active: c.active })}
              onClick={() => onSelectCategory({ datasetCategory: c.category })}
            >
              <div className="category-button">
                {!!c.layerCount && (
                  <span className="btn-layer-count">{c.layerCount}</span>
                )}
                <Icon icon={c.icon} />
              </div>
              {c.label}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

CategoriesMenu.propTypes = {
  categories: PropTypes.array,
  onSelectCategory: PropTypes.func
};

export default CategoriesMenu;
