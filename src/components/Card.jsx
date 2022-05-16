import { Link } from 'react-router-dom';
import '../sass/components/Card.scss';
import { truncate } from '../utils/truncateString';
import { formattedDate } from '../utils/dateFormatter';
import { useDispatch, useSelector } from 'react-redux';
import heartIcon from '../assets/svg/heart.svg';
import { likeTourThunk } from '../redux/features/tourSlice';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
//
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
//

const Card = ({
  _id,
  title,
  description,
  tags,
  image,
  creatorName,
  creatorId,
  likes,
  createdAt,
}) => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.user);

  const handleLikeBtnClick = () => {
    dispatch(likeTourThunk(_id));
  };

  console.log('likes', likes.length);
  const RenderLikeButton = () => {
    let isLiked;

    if (likes && likes?.length > 0) {
      isLiked = likes.find((like) => like === loggedInUser?._id);
    }
    return (
      <>
        <Tippy content={likes?.length + ' ' + 'Likes'}>
          <p>{likes?.length}</p>
        </Tippy>

        <Tippy content={'You need to login to like a tour'}>
          <div
            className="image__container-likesContainer-SVG"
            data-tip
            data-for="login-needed-tooltip"
          >
            {isLiked ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="image__container-likeBtn svg-filled"
                viewBox="0 0 20 20"
                onClick={!loggedInUser ? null : handleLikeBtnClick}
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="image__container-likeBtn svg-line"
                viewBox="0 0 20 20"
                onClick={!loggedInUser ? null : handleLikeBtnClick}
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            )}

            {/* Need to work on this logic for the dynamic tooltip.
            Making it simple for now */}
            {/* {isLiked &&
              (likes.length > 2
                ? `You and ${likes.length - 1} other people like this`
                : likes.length > 0
                ? `You like this`
                : `Be the first one to like this`)}

            {!isLiked &&
              (likes.length > 2
                ? `${likes.length - 1} people like this`
                : likes.length > 0
                ? `1 person likes this`
                : `Be the first one to like this`)} */}
          </div>
        </Tippy>
      </>
    );
  };

  return (
    <div className="card__container">
      {/* <p className="">{_id}</p> */}
      {/* <p className="">{creatorId}</p> */}
      <div className="card__container-imageContainer">
        <Link to={`/tour/${_id}`}>
          <img src={image} alt={title} className="image__container-heroImg" />
        </Link>

        <Link to={`/user/${creatorId}`}>
          <p className="image__container-creatorName">{creatorName}</p>
        </Link>

        <p className="image__container-createdAt">{formattedDate(createdAt)}</p>

        <div className="image__container-likesContainer">
          <RenderLikeButton />
        </div>
      </div>

      <div className="card__container-body">
        <div className="title-and-tags">
          <Link to={`/tour/${_id}`}>
            <p className="title">{truncate(title, 21)}</p>
          </Link>
          <p className="tags">
            {tags.map((tag, index) => {
              return (
                <Link key={index} to={`/tour/tag/${tag} `}>
                  #{tag}{' '}
                </Link>
              );
            })}
          </p>
        </div>

        <span className="description">{truncate(description, 100)}</span>

        <Link to={`/tour/${_id}`} className="read-more-text">
          {' '}
          read more...
        </Link>
      </div>
    </div>
  );
};

export default Card;
