import { createAction, createThunkAction } from 'redux-tools';
import wriAPISerializer from 'wri-json-api-serializer';
import flatten from 'lodash/flatten';
import sortBy from 'lodash/sortBy';

import { getDatasetsProvider } from 'services/datasets';
import thresholdOptions from 'data/thresholds.json';

import { reduceParams, reduceSqlParams } from './datasets-utils';
import decodeLayersConfig from './datasets-decode-config';
import decodeLayersClusters from './datasets-decode-clusters';

export const setDatasetsLoading = createAction('setDatasetsLoading');
export const setDatasets = createAction('setDatasets');

export const getDatasets = createThunkAction('getDatasets', () => dispatch => {
  getDatasetsProvider()
    .then(allDatasets => {
      const parsedDatasets = wriAPISerializer(allDatasets.data)
        .filter(
          d =>
            d.published &&
            d.layer.length &&
            (d.env === 'production' || d.env === process.env.FEATURE_ENV)
        )
        .map(d => {
          const { layer, metadata } = d;
          const appMeta =
            (metadata && metadata.find(m => m.application === 'gfw')) || {};
          const { info } = appMeta || {};
          const defaultLayer =
            (layer &&
              layer.find(
                l =>
                  (l.env === 'production' ||
                    l.env === process.env.FEATURE_ENV) &&
                  l.applicationConfig &&
                  l.applicationConfig.default
              )) ||
            layer[0];

          // we need a default layer so we can set it when toggled onto the map
          if (!defaultLayer) return null;

          const { isSelectorLayer, isMultiSelectorLayer, isLossLayer } =
            info || {};
          const { id, iso, applicationConfig } = defaultLayer || {};
          const { global, selectorConfig } = applicationConfig || {};

          // build statement config
          let statementConfig = null;
          if (isLossLayer) {
            statementConfig = {
              type: 'lossLayer'
            };
          } else if (global && !!iso.length && iso[0]) {
            statementConfig = {
              type: 'isoLayer',
              isos: iso
            };
          }

          return {
            id: d.id,
            dataset: d.id,
            name: d.name,
            layer: id,
            ...applicationConfig,
            ...info,
            iso,
            tags: flatten(d.vocabulary.map(v => v.tags)),
            // dropdown selector config
            ...((isSelectorLayer || isMultiSelectorLayer) && {
              selectorLayerConfig: {
                options: layer.map(l => ({
                  ...l.applicationConfig.selectorConfig,
                  value: l.id
                })),
                ...selectorConfig
              }
            }),
            // disclaimer statement config
            statementConfig,
            // layers config
            layers:
              layer &&
              sortBy(
                layer
                  .filter(
                    l =>
                      (l.env === 'production' ||
                        l.env === process.env.FEATURE_ENV) &&
                      l.published
                  )
                  .map((l, i) => {
                    const { layerConfig } = l;
                    const { position, confirmedOnly, multiConfig } =
                      l.applicationConfig || {};
                    const {
                      params_config,
                      decode_config,
                      sql_config,
                      timeline_config,
                      body,
                      url
                    } = layerConfig;
                    const decodeFunction = decodeLayersConfig[l.id];
                    const decodeClusters = decodeLayersClusters[l.id];

                    // check if has a timeline
                    const hasParamsTimeline =
                      params_config &&
                      params_config.map(p => p.key).includes('startDate');
                    const hasDecodeTimeline =
                      decode_config &&
                      decode_config.map(p => p.key).includes('startDate');
                    const timelineConfig = timeline_config && {
                      ...timeline_config
                    };

                    // get params
                    const params = params_config && reduceParams(params_config);
                    const decodeParams =
                      decode_config && reduceParams(decode_config);
                    const sqlParams = sql_config && reduceSqlParams(sql_config);

                    return {
                      ...info,
                      ...l,
                      ...(d.tableName && { tableName: d.tableName }),
                      ...l.applicationConfig,
                      // sorting position
                      position: l.applicationConfig.default
                        ? 0
                        : position ||
                          (multiConfig && multiConfig.position) ||
                          i + 1,
                      // check if needs timeline
                      timelineConfig,
                      hasParamsTimeline,
                      hasDecodeTimeline,
                      // params for tile url
                      ...(params && {
                        params: {
                          url: body.url || url,
                          ...params,
                          ...(hasParamsTimeline && {
                            minDate: params && params.startDate,
                            maxDate: params && params.endDate,
                            trimEndDate: params && params.endDate
                          })
                        }
                      }),
                      // params selector config
                      ...(params_config && {
                        paramsSelectorConfig: params_config.map(p => ({
                          ...p,
                          ...(p.key.includes('thresh') && {
                            sentence:
                              'Displaying {name} with {selector} canopy density',
                            options: thresholdOptions
                          }),
                          ...(p.min &&
                            p.max && {
                              options: Array.from(
                                Array(p.max - p.min + 1).keys()
                              ).map(o => ({
                                label: o + p.min,
                                value: o + p.min
                              }))
                            })
                        }))
                      }),
                      // params for sql query
                      ...(sqlParams && {
                        sqlParams
                      }),
                      // decode func and params for canvas layers
                      decodeFunction,
                      decodeClusters,
                      ...(decodeFunction && {
                        decodeParams: {
                          // timeline config
                          ...decodeParams,
                          ...(hasDecodeTimeline && {
                            minDate: decodeParams && decodeParams.startDate,
                            maxDate: decodeParams && decodeParams.endDate,
                            trimEndDate: decodeParams && decodeParams.endDate,
                            canPlay: true
                          })
                        }
                      }),
                      // special key for GLAD alerts
                      ...(confirmedOnly && {
                        id: 'confirmedOnly'
                      })
                    };
                  }),
                'position'
              )
          };
        });
      dispatch(setDatasets(sortBy(parsedDatasets, 'menuPosition')));
    })
    .catch(err => {
      dispatch(setDatasetsLoading({ loading: false, error: true }));
      console.warn(err);
    });
});
