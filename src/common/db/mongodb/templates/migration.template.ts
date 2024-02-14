import { getDb } from '../utils/get-db.util';

export const up = async (): Promise<void> => {
  const db = await getDb();
  /*
    Code your update script here!
  */
};

export const down = async (): Promise<void> => {
  const db = await getDb();
  /*
    Code you downgrade script here!
  */
};
