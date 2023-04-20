import { LoaderSvg } from '../assets/svgs'
import InfiniteScroll from 'react-infinite-scroll-component'
import Tweet from './Tweet'
import TweetLoader from './animations/TweetLoader'

const Tweets = ({ tweets, nextPage, hasNextPage, actualizarTweet, loading }) => {
  return (
    <section className='tweets'>
      {loading ? (
        <>
          <TweetLoader />
          <TweetLoader />
          <TweetLoader />
          <TweetLoader />
        </>
      ) : tweets.length > 0 ? (
        <InfiniteScroll
          dataLength={tweets.length}
          next={nextPage}
          hasMore={hasNextPage}
          loader={
            <div className='flex'>
              <LoaderSvg />
            </div>
          }
        >
          {tweets.map((tweet) => (
            <Tweet key={tweet._id} tweet={tweet} setTweet={actualizarTweet} />
          ))}
        </InfiniteScroll>
      ) : (
        <p>NO HAY TWEETS</p>
      )}
    </section>
  )
}

export default Tweets
