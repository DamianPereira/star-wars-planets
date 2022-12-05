import '@testing-library/jest-dom';
import { server } from './mocks/server.js';

// For debugging
jest.setTimeout(5 * 60 * 1000);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
