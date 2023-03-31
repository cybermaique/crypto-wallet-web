import { CoinDataTypes } from '../../../types/cryptoIdDataTypes';

const cryptoIdDataNormalization = (rawData: any): CoinDataTypes => {
  const { id, symbol, name, links, description } = rawData;

  return {
    id,
    symbol,
    name,
    description: description.en || null,
    links: {
      twitterScreenName: links.twitter_screen_name || null,
      facebookUsername: links.facebook_username || null,
      telegramChannelIdentifier: links.telegram_channel_identifier || null,
      reposUrl: {
        github: links.repos_url.github || [],
      },
    },
  };
};

export default cryptoIdDataNormalization;
