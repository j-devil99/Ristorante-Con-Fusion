import React, { Component } from "react";
import {
	Card,
	CardImg,
	CardImgOverlay,
	CardText,
	CardBody,
	CardTitle,
} from "reactstrap";

class Dishdetail extends Component {
	constructor(props) {
		super(props);
	}

	renderDish(dish) {
		if (dish != null) {
			return (
				<Card>
					<CardImg top src={dish.image} alt={dish.name} />
					<CardBody>
						<CardTitle>{dish.name}</CardTitle>
						<CardText>{dish.description}</CardText>
					</CardBody>
				</Card>
			);
		} else return <div></div>;
	}

	renderComments(comments) {
		if (comments != null) {
            const options = { month: 'long', day: 'numeric', year: 'numeric' };
			return (
				<div>
					<h4>Comments</h4>
					<ul className="list-unstyled">
						{comments.map((comment) => {
                            let date = new Date(comment.date);
							return (
								<li key={comment.id}>
									<p>{comment.comment}</p>
									<p>
										-- {comment.author}, {date.toLocaleDateString('en-IN', options)}
									</p>
								</li>
							);
						})}
					</ul>
				</div>
			);
		} else return <div></div>;
	}
	render() {
		return (
			<div className="row">
				<div className="col-12 col-md-5 m-1">
					{this.renderDish(this.props.dish)}
				</div>
				<div className="col-12 col-md-5 m-1">
					{this.props.dish && this.renderComments(this.props.dish.comments)}
				</div>
			</div>
		);
	}
}

export default Dishdetail;
