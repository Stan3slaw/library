import { getDb } from '../utils/get-db.util';

export const up = async (): Promise<void> => {
  const db = await getDb();
  await db.collection('users').updateMany({}, { $set: { activated: true } });
};

export const down = async (): Promise<void> => {
  const db = await getDb();
  await db.collection('users').updateMany({}, { $unset: { activated: '' } });
};
