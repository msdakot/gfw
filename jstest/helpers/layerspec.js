var layerSpec = {
  "forest_clearing": {
    "umd_tree_loss_gain": {
      "id": 597,
      "slug": "umd_tree_loss_gain",
      "title": "UMD tree cover\nloss",
      "title_color": "#F69",
      "subtitle": "",
      "sublayer": "",
      "table_name": "",
      "source": "",
      "category_color": "#F69",
      "category_slug": "forest_clearing",
      "category_name": "Forest change",
      "external": "false",
      "zmin": "",
      "zmax": "",
      "mindate": "2001-01-01T12:00:00.000Z",
      "maxdate": "2013-12-31T12:00:00.000Z",
      "xmax": null,
      "xmin": null,
      "ymax": null,
      "ymin": null,
      "tileurl": "",
      "visible": true,
      "position": 1
    },
    "forestgain": {
      "id": 596,
      "slug": "forestgain",
      "title": "UMD tree cover gain",
      "title_color": "#6D6DE5",
      "subtitle": "(12 years, 30m, global)",
      "sublayer": "",
      "table_name": "forestgain",
      "source": "",
      "category_color": "#F69",
      "category_slug": "forest_clearing",
      "category_name": "Forest change",
      "external": "true",
      "zmin": "",
      "zmax": "",
      "mindate": null,
      "maxdate": null,
      "xmax": null,
      "xmin": null,
      "ymax": null,
      "ymin": null,
      "tileurl": "https://earthengine.google.org/static/hansen_2013/gain_alpha/{Z}/{X}/{Y}.png",
      "visible": true,
      "position": 0
    }
  },
  "forest_use": {
    "logging": {
      "id": 581,
      "slug": "logging",
      "title": "Logging",
      "title_color": "#fecc5c",
      "subtitle": "",
      "sublayer": "",
      "table_name": "logging_gcs_wgs84",
      "source": "",
      "category_color": "#c98e6c",
      "category_slug": "forest_use",
      "category_name": "Forest use",
      "external": "false",
      "zmin": "0",
      "zmax": "22",
      "mindate": null,
      "maxdate": null,
      "xmax": null,
      "xmin": null,
      "ymax": null,
      "ymin": null,
      "tileurl": "https://wri-01.carto.com/tiles/logging_gcs_wgs84/{Z}/{X}/{Y}.png",
      "visible": true
    },
    "mining": {
      "id": 573,
      "slug": "mining",
      "title": "Mining",
      "title_color": "#fbb685",
      "subtitle": "",
      "sublayer": "",
      "table_name": "mining_permits_merge",
      "source": "",
      "category_color": "#c98e6c",
      "category_slug": "forest_use",
      "category_name": "Forest use",
      "external": "false",
      "zmin": "0",
      "zmax": "22",
      "mindate": null,
      "maxdate": null,
      "xmax": 30.841667,
      "xmin": 12.275,
      "ymax": 5.166667,
      "ymin": -13.45,
      "tileurl": "https://wri-01.carto.com/tiles/cod_mc_4/{Z}/{X}/{Y}.png",
      "visible": true
    }
  },
  "conservation": {
    "protected_areas": {
      "id": 574,
      "slug": "protected_areas",
      "title": "Protected areas",
      "title_color": "#3182BD",
      "subtitle": "",
      "sublayer": "",
      "table_name": "protected_areas",
      "source": "",
      "category_color": "#3182BD",
      "category_slug": "conservation",
      "category_name": "Conservation",
      "external": "true",
      "zmin": "0",
      "zmax": "22",
      "mindate": null,
      "maxdate": null,
      "xmax": 141.15234375,
      "xmin": -156.26953125,
      "ymax": 71.13098771,
      "ymin": -55.07836723,
      "tileurl": "http://184.73.201.235/blue/{X}/{Y}/{Z}",
      "visible": true
    }
  }
};