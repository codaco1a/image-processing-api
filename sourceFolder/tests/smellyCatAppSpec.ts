import smellyCat from '../smellyCatApp'; // importing the app from it source
import s from 'supertest'; // importing supertest packages
import transform from '../util/separateUtilities';
import p from 'path';

const baseWay: string = p.join(
  __dirname,
  '..',
  '..',
  'Assets',
  'full',
  'smelly-cat.jpg'
);
const way: string = p.join(
  __dirname,
  '..',
  '..',
  'Assets',
  'thumb',
  'smelly-cat-thumb-700x500.jpg'
);

// Test that the application object is truthy
describe('test application object', () => {
  it('isTruthy', () => {
    expect(smellyCat).toBeTruthy();
  });
});

// This is udacity demonstration code, though it doesn't work
// Help here
describe('test endpoints', () => {
  it('root path not to throw an error', async () => {
    const response = await s(smellyCat).get('/');
    expect(response).not.toThrowError();
  });
});

describe('test sharp AIP', () => {
  it('rezising works', () => {
    expect(transform.transform(baseWay, 700, 500, way)).toBeTruthy();
  });
});
