import PropTypes from "prop-types";
const Card = (props) => {
  return <div className={`rounded-lg shadow-custome ${props.className}`}>{props.children}</div>;
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
export default Card;
