import { rest } from 'msw';
import { TatooineMock } from './TatooineMock';
import { EdgePlanetMock } from './EdgePlanetMock';

export const handlers = [
  rest.get('https://swapi.dev/api/planets', (req, res, ctx) => {
    const page1Planets = [TatooineMock];
    const page2Planets = [EdgePlanetMock];
    return res(
      ctx.status(200),
      ctx.json(
        req.url.searchParams.get('page') === '1'
          ? {
              next: 'https://swapi.dev/api/planets?page=2',
              results: page1Planets,
            }
          : {
              next: null,
              results: page2Planets,
            }
      )
    );
  }),
  rest.get('https://swapi.dev/api/planets/1', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(TatooineMock));
  }),
];
