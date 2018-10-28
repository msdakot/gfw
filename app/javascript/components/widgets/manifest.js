// forest change
import * as gladAlerts from './widgets/forest-change/glad-alerts';
import * as treeLoss from './widgets/forest-change/tree-loss';
import * as treeLossGlobal from './widgets/forest-change/tree-loss-global';
import * as treeLossRanked from './widgets/forest-change/tree-loss-ranked';
import * as faoDeforest from './widgets/forest-change/fao-deforest';
import * as faoReforest from './widgets/forest-change/fao-reforest';
import * as firesAlerts from './widgets/forest-change/fires-alerts';
import * as gladRanked from './widgets/forest-change/glad-ranked';
import * as treeCoverGain from './widgets/forest-change/tree-cover-gain';
import * as treeGainLocated from './widgets/forest-change/tree-gain-located';
import * as treeLossLocated from './widgets/forest-change/tree-loss-located';
import * as treeLossPlantations from './widgets/forest-change/tree-loss-plantations';
import * as treeLossTsc from './widgets/forest-change/tree-loss-tsc';

// land cover
import * as treeCover from './widgets/land-cover/tree-cover';
import * as treeCoverRanked from './widgets/land-cover/tree-cover-ranked';
import * as treeCoverPlantations from './widgets/land-cover/tree-cover-plantations';
import * as rankedPlantations from './widgets/land-cover/ranked-plantations';
import * as faoCover from './widgets/land-cover/fao-cover';
import * as globalLandCover from './widgets/land-cover/global-land-cover';
import * as intactTreeCover from './widgets/land-cover/intact-tree-cover';
import * as primaryForest from './widgets/land-cover/primary-forest';
import * as treeCoverLocated from './widgets/land-cover/tree-cover-located';

// Climate
import * as emissions from './widgets/climate/emissions';
import * as emissionsDeforestation from './widgets/climate/emissions-deforestation';

// Biodiversity
import * as gladBiodiversity from './widgets/biodiversity/glad-biodiversity';

// Land Use
import * as economicImpact from './widgets/land-use/economic-impact';
import * as forestryEmployment from './widgets/land-use/forestry-employment';

export default {
  // forest change
  gladAlerts,
  treeLoss,
  treeLossGlobal,
  treeLossRanked,
  firesAlerts,
  faoDeforest,
  faoReforest,
  gladRanked,
  treeCoverGain,
  treeGainLocated,
  treeLossLocated,
  treeLossPlantations,
  treeLossTsc,
  // land cover
  treeCover,
  treeCoverRanked,
  rankedPlantations,
  treeCoverPlantations,
  faoCover,
  globalLandCover,
  intactTreeCover,
  primaryForest,
  treeCoverLocated,
  // climate
  emissions,
  emissionsDeforestation,
  // biodiversity
  gladBiodiversity,
  // land use
  economicImpact,
  forestryEmployment
};
