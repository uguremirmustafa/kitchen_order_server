import mockRedis from 'redis-mock';
jest.mock('redis', () => mockRedis);
