import { getExtent, getPlantationsExtent } from 'services/forest-data';
import axios from 'axios';

export default ({ params }) =>
  axios
    .all([
      getExtent({ ...params, forestType: '' }),
      getPlantationsExtent(params)
    ])
    .then(
      axios.spread((gadmResponse, plantationsResponse) => {
        const gadmExtent = gadmResponse.data && gadmResponse.data.data;
        const plantationsExtent =
          plantationsResponse.data && plantationsResponse.data.data;
        let data = {};
        if (gadmExtent.length && plantationsExtent.length) {
          const totalArea = gadmExtent[0].total_area;
          const totalExtent = gadmExtent[0].value;
          data = {
            totalArea,
            totalExtent,
            plantations: plantationsExtent
          };
        }
        return data;
      })
    );
