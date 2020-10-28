/*
 * Copyright (c) 2020 Bowser65
 * Licensed under the Open Software License version 3.0
 */

const { get } = require('powercord/http');
const { React } = require('powercord/webpack');

const cache = {};
const DEFAULT_ACCOUNT_STATUS = {
  verified: false,
  stateAffiliation: null
};

const TWITTER_GQL_URL = (screen) => `https://twitter.com/i/api/graphql/jMaTS-_Ea8vh9rpKggJbCQ/UserByScreenName?variables=%7B%22screen_name%22%3A%22${screen}%22%2C%22withHighlightedLabel%22%3Atrue%7D`;
const TWITTER_BEARER = 'AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA';
const TWITTER_GUEST = '1321481778461368321';

function fetchBadges (screenName) {
  if (!cache[screenName]) {
    cache[screenName] = new Promise(async (resolve) => {
      try {
        // eslint-disable-next-line new-cap
        const { body: { data: { user } } } = await get(TWITTER_GQL_URL(screenName))
          .set('x-csrf-token', 'a')
          .set('x-guest-token', TWITTER_GUEST)
          .set('authorization', `Bearer ${TWITTER_BEARER}`);

        resolve({
          verified: user.legacy.verified,
          stateAffiliation: user.affiliates_highlighted_label.label
        });
      } catch (e) {
        resolve(DEFAULT_ACCOUNT_STATUS);
      }
    });
  }

  return cache[screenName];
}

const TwitterLogo = React.memo(
  () => (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' className='bte-twitter-logo'>
      <path fill='currentColor' d='M928 254.3c-30.6 13.2-63.9 22.7-98.2 26.4a170.1 170.1 0 0 0 75-94a336.64 336.64 0 0 1-108.2 41.2A170.1 170.1 0 0 0 672 174c-94.5 0-170.5 76.6-170.5 170.6c0 13.2 1.6 26.4 4.2 39.1c-141.5-7.4-267.7-75-351.6-178.5a169.32 169.32 0 0 0-23.2 86.1c0 59.2 30.1 111.4 76 142.1a172 172 0 0 1-77.1-21.7v2.1c0 82.9 58.6 151.6 136.7 167.4a180.6 180.6 0 0 1-44.9 5.8c-11.1 0-21.6-1.1-32.2-2.6C211 652 273.9 701.1 348.8 702.7c-58.6 45.9-132 72.9-211.7 72.9c-14.3 0-27.5-.5-41.2-2.1C171.5 822 261.2 850 357.8 850C671.4 850 843 590.2 843 364.7c0-7.4 0-14.8-.5-22.2c33.2-24.3 62.3-54.4 85.5-88.2z'/>
    </svg>
  )
);

const ReplyIcon = React.memo(
  () => (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='bte-twitter-reply-icon'>
      <path fill='currentColor' d='M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z'/>
    </svg>
  )
);

const RetweetIcon = React.memo(
  () => (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='bte-twitter-retweet-icon'>
      <path fill='currentColor' d='M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z'/>
    </svg>
  )
);

const LikeIcon = React.memo(
  () => (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='bte-twitter-like-icon'>
      <path fill='currentColor' d='M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z'/>
    </svg>
  )
);

const VerifiedIcon = React.memo(
  () => (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='bte-twitter-verified'>
      <path fill='currentColor' d='M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z'/>
    </svg>
  )
);

const Person = React.memo(
  (props) => {
    console.log(props);
    return 'Twitter Person';
  }
);

const Tweet = React.memo(
  (props) => {
    const [ status, setStatus ] = React.useState(DEFAULT_ACCOUNT_STATUS);
    React.useEffect(() => void fetchBadges(props.authorUsername).then(setStatus), []);

    return (
      <div className='bte-embed tweet'>
        <div className='bte-embed-header'>
          <img src={props.authorAvatar} alt={`${props.authorDisplayName}'s avatar`}/>
          <div className='bte-embed-user'>
            <div className='display'>
              <span>{props.authorDisplayName}</span>
              {status.verified && <VerifiedIcon/>}
            </div>
            <span className='screen'>@{props.authorUsername}</span>
          </div>
          <TwitterLogo/>
        </div>
        {status.stateAffiliation && <div className='bte-embed-affiliation'>
          <a href={status.stateAffiliation.url.url} target='_blank'>
            <img src={status.stateAffiliation.badge.url} alt=''/>
            <span>{status.stateAffiliation.description}</span>
          </a>
        </div>}
        <div className='bte-embed-content'>
          {props.content}
        </div>
        {props.childrenImages}
        <div className='bte-embed-footer'>
          <div className='bte-embed-buttons'>
            <a href={`https://twitter.com/intent/tweet?in_reply_to=${props.id}`} target='_blank' className='reply'>
              <ReplyIcon/>
            </a>
            <a href={`https://twitter.com/intent/retweet?tweet_id=${props.id}`} target='_blank' className='retweet'>
              <RetweetIcon/>
              {!!props.retweets && <span>{props.retweets}</span>}
            </a>
            <a href={`https://twitter.com/intent/like?tweet_id=${props.id}`} target='_blank' className='like'>
              <LikeIcon/>
              {!!props.likes && <span>{props.likes}</span>}
            </a>
          </div>
          <div className='bte-embed-date'>
            {props.date.toDateString()}
          </div>
        </div>
      </div>
    );
  }
);

module.exports = function ({ embed, childrenImages }) {
  if (embed.rawTitle) {
    return <Person/>;
  }

  const [ , authorDisplayName, authorUsername ] = embed.author.name.match(/^(.*) \(@(.*)\)$/);
  const [ , id ] = embed.url.match(/status\/(\d+)/);
  // eslint-disable-next-line no-undef
  const date = new Date(Number((BigInt(id) >> 22n) + 1288834974657n));

  return <Tweet
    childrenImages={childrenImages}
    authorUsername={authorUsername}
    authorDisplayName={authorDisplayName}
    authorAvatar={embed.author.iconProxyURL || embed.author.iconURL}
    content={embed.rawDescription}
    retweets={parseInt(embed.fields?.find(f => f.rawName === 'Retweets')?.rawValue || 0)}
    likes={parseInt(embed.fields?.find(f => f.rawName === 'Likes')?.rawValue || 0)}
    date={date}
    id={id}
    url={embed.url}
  />;
};
