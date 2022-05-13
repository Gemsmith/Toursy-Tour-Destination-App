import { Link } from 'react-router-dom';
import '../sass/components/Card.scss';
import { truncate } from '../utils/truncateString';
import { formattedDate } from '../utils/dateFormatter';

const heartIconFilled = (
  <svg
    version="1.1"
    id="Capa_1"
    x="0px"
    y="0px"
    className="svg-fill"
    viewBox="0 0 302.489 302.489"
    style={{ enableBackground: 'new 0 0 302.489 302.489' }}
  >
    <path
      d="M302.351,98.012c-1.116-20.846-9.942-40.422-24.855-55.122c-15.103-14.887-34.811-23.086-55.491-23.086
	c-30.776,0-53.082,24.334-65.065,37.408c-1.85,2.019-4.018,4.384-5.527,5.827c-1.208-1.25-2.845-3.114-4.351-4.828
	c-10.944-12.466-33.72-38.406-66.571-38.406c-20.68,0-40.387,8.199-55.49,23.086C10.087,57.59,1.259,77.165,0.143,98.012
	c-1.111,20.812,4.212,38.921,17.26,58.72c10.324,15.669,37.545,46.266,66.195,74.408c14.757,14.495,28.339,26.779,39.277,35.524
	c17.762,14.2,24.565,16.021,28.506,16.021c3.695,0,10.683-1.657,28.615-15.981c10.913-8.717,24.448-20.982,39.143-35.468
	c28.393-27.99,55.515-58.628,65.956-74.507C293.877,143.372,303.774,124.629,302.351,98.012z"
    />
  </svg>
);

const Card = ({
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
    <div className="card__container">
      {/* <p className="">{_id}</p> */}
      {/* <p className="">{creatorId}</p> */}
      <div className="image__container">
        <Link to={`/tour/${_id}`}>
          <img src={image} alt={title} className="image__container-heroImg" />
        </Link>

        <Link to={`/user/${creatorId}`}>
          <p className="creatorName">{creatorName}</p>
        </Link>

        <p className="createdAt">{formattedDate(createdAt)}</p>

        <div className="image__container-likesContainer">
          {/* <img src={heartIconFilled} className="image__container-likeBtn" alt="" /> */}
          {/* <p className="likeCount">{likeCount}</p> */}
        </div>
      </div>

      <div className="card__container-body">
        <div className="title-and-tags">
          <Link to={`/tour/${_id}`}>
            <p className="title">{truncate(title, 21)}</p>
          </Link>
          <p className="tags">
            {tags.map((tag) => {
              return `#${tag} `;
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
