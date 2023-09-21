import PropTypes from "prop-types";
import Card from "../UI/Card";
const DisplayData = (props) => {
  return (
    <div>
      <h2 className="text-primary font-bold pb-2">Search Results</h2>
      <ul className="text-primary">
        {props.data.map((item, index) => (
          <li key={index}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <Card className="bg-gray-950 p-5 mb-4 shadow-custom">
                <span className="text-primary font-bold">Source: </span>
                {item.source}
                {index === 0 && (
                  <p className="text-primary font-extralight">
                    <br />
                    <span className="text-primary font-bold">Context: </span>
                    {item.context}
                  </p>
                )}
              </Card>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
DisplayData.propTypes = {
  data: PropTypes.array.isRequired,
};
export default DisplayData;
