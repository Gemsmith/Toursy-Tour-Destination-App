import { Link } from 'react-router-dom';
import '../sass/components/Card.scss';
import { truncate } from '../utils/truncateString';
import { formattedDate } from '../utils/dateFormatter';
import '../sass/components/RelatedTourCard.scss';

const RelatedTourCard = ({
  _id,
  title,
  description,
  tags,
  image,
  creatorName,
  creatorId,
  likeCount,
  createdAt,
}) => {
  return (
    <div className="related__card__container">
      {/* <p className="">{_id}</p> */}
      {/* <p className="">{creatorId}</p> */}
      <Link to={`/tour/${_id}`}>
        <img src={image} alt={title} loading="lazy" className="heroImg" />
      </Link>

      <Link to={`/user/${creatorId}`}>
        <p className="creatorName">{creatorName}</p>
      </Link>

      <p className="createdAt">{formattedDate(createdAt)}</p>

      <div className="likesContainer">
        {/* <img src={heartIconFilled} className="image__container-likeBtn" alt="" loading="lazy"/> */}
        {/* <p className="likeCount">{likeCount}</p> */}
      </div>

      <div className="title-and-tags ">
        <p className="tags ">
          {tags.map((tag, index) => {
            return (
              <Link key={index} to={`/tour/tag/${tag} `}>
                #{tag}{' '}
              </Link>
            );
          })}
        </p>

        <Link to={`/tour/${_id}`}>
          <p className="title">{truncate(title, 21)}</p>
        </Link>
      </div>
    </div>
  );
};

export default RelatedTourCard;
