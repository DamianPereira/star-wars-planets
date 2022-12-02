import { rest } from 'msw';
import { TatooineMock } from './TatooineMock';
import { EdgePlanetMock } from './EdgePlanetMock';
import { LukeSkywalker } from './LukeSkywalker';
import { swapiEndpoint } from '../services/PlanetService';

export const handlers = [
  rest.get(`${swapiEndpoint}/api/planets`, (req, res, ctx) => {
    const page1Planets = [TatooineMock];
    const page2Planets = [EdgePlanetMock];
    return res(
      ctx.status(200),
      ctx.json(
        req.url.searchParams.get('page') === '1'
          ? {
              next: `${swapiEndpoint}/api/planets?page=2`,
              results: page1Planets,
            }
          : {
              next: null,
              results: page2Planets,
            }
      )
    );
  }),
  rest.get(`${swapiEndpoint}/api/planets/1`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(TatooineMock));
  }),
  rest.get(`${swapiEndpoint}/api/planets/80`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(EdgePlanetMock));
  }),
  rest.get(`${swapiEndpoint}/api/people/:person_id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(LukeSkywalker));
  }),
  rest.get('/static/*', (req, res, ctx) => {
    return req.passthrough();
  }),
];
