export const CHECK_LIST = '/';
export const CHALLENGE = '/markets';

export type Route = {
  PATH: string;
  LABEL: string;
};

export const ROUTES = {
  CHECK_LIST: {
    PATH: CHECK_LIST,
    LABEL: 'Check List',
  },
  CHALLENGE: {
    PATH: CHALLENGE,
    LABEL: 'Challenge',
  },
} satisfies Record<string, Route>;
