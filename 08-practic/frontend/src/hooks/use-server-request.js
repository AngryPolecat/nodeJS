import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { server } from '../bff';
import { sessionSelector } from '../selectors';

export const useServerRequest = (operation, ...params) => {
  const session = useSelector(sessionSelector);
  return useCallback(
    (operation, ...params) => {
      const request = ['register', 'authorize', 'fetchPost', 'fetchPosts'].includes(operation) ? params : [session, ...params];

      return server[operation](...request);
    },
    [session]
  );
};
