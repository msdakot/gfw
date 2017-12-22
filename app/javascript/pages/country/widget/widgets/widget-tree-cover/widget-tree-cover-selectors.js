import { createSelector } from 'reselect';
import COLORS from 'pages/country/data/colors.json';

// get list data
const getTotalCover = state => state.totalArea || null;
const getTotalArea = state => state.cover || null;
const getPlantationsCover = state => state.plantations || null;

// get lists selected
export const getTreeCoverData = createSelector(
  [getTotalCover, getTotalArea, getPlantationsCover],
  (total, cover, plantations) => {
    if (!total) return null;
    return [
      {
        name: plantations ? 'Natural forest' : 'Tree cover',
        value: cover - plantations,
        color: COLORS.darkGreen,
        percentage: (cover - plantations) / total * 100
      },
      {
        name: 'Tree plantations',
        value: plantations,
        color: COLORS.mediumGreen,
        percentage: plantations / total * 100
      },
      {
        name: 'Non-Forest',
        value: total - cover,
        color: COLORS.nonForest,
        percentage: (total - cover) / total * 100
      }
    ];
  }
);
