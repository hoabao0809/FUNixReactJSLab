import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDish({ dish }) {
  return (
    <div className="col-12 col-md-5">
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments }) {

  if (comments != null) {
    return (
      <div className="col-12 col-md-5">
        <h2>Comments</h2>
        {comments.map((item) => {
          return (
            <div key={item.id} className="comments">
              <p>{item.comment}</p>
              <p>
                -- {item.author}, {item.date}
              </p>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div></div>;
  }
}

const Dishdetail = (props) => {
  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
          <div className="row mt-3">
            <RenderDish dish={props.dish} />
            <RenderComments comments={props.comments} />
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Dishdetail;
