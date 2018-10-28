export default {
  widget: 'treeCoverLocated',
  title: {
    global: 'Global Location of forest',
    initial: 'Location of forest in {location}'
  },
  categories: ['summary', 'land-cover'],
  types: ['global', 'country'],
  admins: ['global', 'adm0', 'adm1'],
  options: {
    units: ['ha', '%'],
    forestTypes: true,
    landCategories: true,
    thresholds: true,
    extentYears: true
  },
  colors: 'extent',
  metaKey: 'widget_forest_location',
  layers: ['forest2000', 'forest2010'],
  sortOrder: {
    summary: 5,
    landCover: 2
  },
  sentences: {
    globalInitial:
      '{location} as of {year}, the top {count} countries represent {percentage} of all tree cover. {region} had the most tree cover at {value} compared to an average of {average}.',
    globalWithIndicator:
      '{location} as of {year}, the top {count} countries represent {percentage} of {indicator}. {region} had the most tree cover at {value} compared to an average of {average}.',
    globalLandCatOnly:
      '{location} as of {year}, the top {count} countries represent {percentage} of tree cover in {indicator}. {region} had the most tree cover at {value} compared to an average of {average}.',
    initial:
      'In {location} as of {year}, the top {count} regions represent {percentage} of all tree cover. {region} had the most tree cover at {value} compared to an average of {average}.',
    hasIndicator:
      'In {location} as of {year}, the top {count} regions represent {percentage} of {indicator}. {region} had the most tree cover at {value} compared to an average of {average}.',
    landCatOnly:
      '{location} as of {year}, the top {count} regions represent {percentage} of tree cover in {indicator}. {region} had the most tree cover at {value} compared to an average of {average}.',
    percGlobalInitial:
      '{location} as of {year}, the top {count} countries represent {percentage} of all tree cover. {region} had the most relative tree cover at {value} compared to an average of {average}.',
    percGlobalWithIndicator:
      '{location} as of {year}, the top {count} countries represent {percentage} of {indicator}. {region} had the most relative tree cover at {value} compared to an average of {average}.',
    percGlobalLandCatOnly:
      '{location} as of {year}, the top {count} countries represent {percentage} of tree cover in {indicator}. {region} had the most relative tree cover at {value} compared to an average of {average}..',
    percInitial:
      'In {location} as of {year}, the top {count} regions represent {percentage} of all tree cover. {region} had the most relative tree cover at {value} compared to an average of {average}.',
    percHasIndicator:
      'In {location} as of {year}, the top {count} regions represent {percentage} of {indicator}. {region} had the most relative tree cover at {value} compared to an average of {average}.',
    percLandCatOnly:
      'In {location} as of {year}, the top {count} regions represent {percentage} of tree cover in {indicator}. {region} had the most relative tree cover at {value} compared to an average of {average}.',
    noCover: 'No tree cover was identified in {location}.'
  },
  data: [
    {
      data: 'extent',
      threshold: 'current',
      indicator: 'gadm28'
    },
    {
      data: 'extent',
      threshold: 'current',
      indicator: 'current'
    }
  ]
};
