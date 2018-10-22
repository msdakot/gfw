import axios from 'axios';

import gfwClimate from 'assets/logos/gfw-climate.png';
import gfwFires from 'assets/logos/gfw-fires.png';
import gfwCommodities from 'assets/logos/gfw-commodities.png';
import gfwWater from 'assets/logos/gfw-water.png';
import forestWatcher from 'assets/logos/gfw-watcher.png';

import developer from 'assets/icons/developer.svg';
import howto from 'assets/icons/howto.svg';
import sgf from 'assets/icons/sgf.svg';
import openData from 'assets/icons/open-data.svg';
import contribute from 'assets/icons/contribute.svg';
import blog from 'assets/icons/blog.svg';
import stories from 'assets/icons/stories.svg';
import forum from 'assets/icons/forum.svg';

export default {
  navMain: [
    {
      label: 'Map',
      path: '/map',
      navLink: true
    },
    {
      label: 'Dashboards',
      path: '/dashboards/global'
    },
    {
      label: 'Blog',
      path: 'http://blog.globalforestwatch.org',
      target: '_blank',
      rel: 'noopener nofollower'
    },
    {
      label: 'About',
      path: '/about'
    }
  ],
  myGfwLinks: [
    {
      label: 'My subscriptions',
      path: '/my_gfw/subscriptions'
    },
    {
      label: 'My stories',
      path: '/my_gfw/stories'
    },
    {
      label: 'My profile',
      path: '/my_gfw'
    },
    {
      label: 'Logout',
      path: '/auth/logout',
      onSelect: e => {
        e.preventDefault();
        axios
          .get(`${process.env.GFW_API}/auth/logout`, { withCredentials: true })
          .then(response => {
            if (response.status < 400) {
              window.location.reload();
            } else {
              console.warn('Failed to logout');
            }
          });
      }
    }
  ],
  apps: [
    {
      label: 'GFW Climate',
      path: 'http://climate.globalforestwatch.org',
      image: gfwClimate
    },
    {
      label: 'GFW Fires',
      path: 'http://fires.globalforestwatch.org',
      image: gfwFires
    },
    {
      label: 'GFW Comodities',
      path: 'http://commodities.globalforestwatch.org',
      image: gfwCommodities
    },
    {
      label: 'GFW Water',
      path: 'http://water.globalforestwatch.org',
      image: gfwWater
    },
    {
      label: 'Forest Watcher',
      path: 'http://forestwatcher.globalforestwatch.org',
      image: forestWatcher
    }
  ],
  moreLinks: [
    {
      label: 'Developer Tools',
      path: 'http://developers.globalforestwatch.org',
      icon: developer
    },
    {
      label: 'How to Portal',
      path: 'http://www.globalforestwatch.org/howto',
      icon: howto
    },
    {
      label: 'Small Grants Fund',
      path: '/small-grants-fund',
      icon: sgf
    },
    {
      label: 'Open data portal',
      path: 'http://data.globalforestwatch.org/',
      icon: openData
    },
    {
      label: 'Contribute data',
      path: '/contribute-data',
      icon: contribute
    },
    {
      label: 'Blog',
      path: 'https://blog.globalforestwatch.org',
      icon: blog
    },
    {
      label: 'Stories',
      path: '/stories',
      icon: stories
    },
    {
      label: 'Discussion Forum',
      path: 'https://groups.google.com/forum/#!forum/globalforestwatch',
      icon: forum
    }
  ]
};
