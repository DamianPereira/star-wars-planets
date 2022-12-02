import { rest } from 'msw';
import { TatooineMock } from './TatooineMock';
import { EdgePlanetMock } from './EdgePlanetMock';
import { PeopleGenerator } from './PeopleGenerator';
import { swapiEndpoint } from '../services/PlanetService';

export const handlers = [
  rest.get(`${swapiEndpoint}/planets`, (req, res, ctx) => {
    const page1Planets = [TatooineMock];
    const page2Planets = [EdgePlanetMock];
    return res(
      ctx.status(200),
      ctx.json(
        req.url.searchParams.get('page') === '1'
          ? {
              next: `${swapiEndpoint}/planets?page=2`,
              results: page1Planets,
            }
          : {
              next: null,
              results: page2Planets,
            }
      )
    );
  }),
  rest.get(`${swapiEndpoint}/planets/1`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(2000), ctx.json(TatooineMock));
  }),
  rest.get(`${swapiEndpoint}/planets/80`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(EdgePlanetMock));
  }),
  rest.get(`${swapiEndpoint}/people/:personId`, (req, res, ctx) => {
    const { personId } = req.params;
    return res(ctx.status(200), ctx.json(PeopleGenerator(personId)));
  }),
  rest.get('/static/*', (req, res, ctx) => {
    return req.passthrough();
  }),
];
