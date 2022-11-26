import classNames from 'classnames';

const Card = ({ className, ...props }) => (
  <div className={classNames('border-star-wars relative p-10', className)} {...props} />
);

export default Card;
