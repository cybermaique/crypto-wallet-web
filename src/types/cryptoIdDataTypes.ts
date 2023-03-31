export type CoinDataTypes = {
  id: string;
  symbol: string;
  name: string;
  description: string | null;
  links: {
    twitterScreenName: string | null;
    facebookUsername: string | null;
    telegramChannelIdentifier: string | null;
    reposUrl: {
      github: string[];
    };
  };
};
