import classNames from 'classnames';

const Card = ({ className, ...props }) => (
  <div
    className={classNames(
      'flex p-8 bg-no-repeat',
      'flex-col bg-star-wars-vertical aspect-video-vertical',
      'md:flex-row md:bg-star-wars-horizontal md:aspect-video',
      className
    )}
    {...props}
  />
);

export default Card;
