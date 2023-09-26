import { redisClient } from './config/sessionConfig';
import db from './db/db';

afterAll((done) => {
  db.destroy();
  redisClient.quit();
  done();
});
