import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

const Dishdetail = (props) => {
  const selectedDish = props.selectedDish;

  if (selectedDish != null) {
    const comments = selectedDish.comments.map((item) => {
      return (
        <div className="comments">
          <p>{item.comment}</p>
          <p>
            -- {item.author}, {item.date}
          </p>
        </div>
      );
    });
    return (
      <div>
        <div className="col-12 col-md-5">
          <Card>
            <CardImg
              width="100%"
              src={selectedDish.image}
              alt={selectedDish.name}
            />
            <CardBody>
              <CardTitle>{selectedDish.name}</CardTitle>
              <CardText>{selectedDish.description}</CardText>
            </CardBody>
          </Card>
        </div>
        <div className="col-12 col-md-5">
          <h2>Comments</h2>
          {comments}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Dishdetail;
