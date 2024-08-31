import { userTransformer } from '../transformers';
import { URL } from '../../config';

export const getUser = async (loginToFind) =>
  fetch(`${URL}/users?login=${loginToFind}`)
    .then((response) => response.json())
    .then(([user]) => {
      return user && userTransformer(user);
    });
