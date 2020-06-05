import React, { Component } from "react";
import {
	Card,
	CardImg,
	CardText,
	CardTitle,
	CardBody,
	Breadcrumb,
	BreadcrumbItem,
	Modal,
	ModalBody,
	ModalHeader,
	Button,
	Row,
	Col,
	Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false,
		};
		this.handleToggle = this.handleToggle.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleToggle() {
		this.setState({
			isModalOpen: !this.state.isModalOpen,
		});
	}

	handleSubmit(values) {
		alert("Current State is: " + JSON.stringify(values));
		this.handleToggle();
	}

	render() {
		return (
			<React.Fragment>
				<Button outline onClick={this.handleToggle}>
					<i className="fa fa-pencil fa-lg"></i> Submit Comment
				</Button>
				<Modal
					isOpen={this.state.isModalOpen}
					toggle={(values) => this.handleToggle(values)}
				>
					<ModalHeader toggle={this.handleToggle}>Submit Comment</ModalHeader>
					<ModalBody>
						<LocalForm onSubmit={(value) => this.handleSubmit(value)}>
							<Row className="form-group">
								<Label htmlFor="rating" md={4}>
									Rating
								</Label>
								<Col md={12}>
									<Control.select
										model=".rating"
										id="rating"
										name="rating"
										className="form-control"
									>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</Control.select>
								</Col>
							</Row>
							<Row className="form-group">
								<Label htmlFor="author" md={4}>
									Your Name
								</Label>
								<Col md={12}>
									<Control.text
										model=".author"
										id="author"
										name="author"
										placeholder="Your Name"
										className="form-control"
										validators={{
											minLength: minLength(3),
											maxLength: maxLength(15),
										}}
									/>
									<Errors
										className="text-danger"
										model=".author"
										show="touched"
										messages={{
											minLength: "Must be greater than 2 characters",
											maxLength: "Must be 15 characters or less",
										}}
									/>
								</Col>
							</Row>
							<Row className="form-group">
								<Label htmlFor="comment" md={4}>
									Comment
								</Label>
								<Col md={12}>
									<Control.textarea
										model=".comment"
										id="comment"
										name="comment"
										className="form-control"
										validators={{
											required,
										}}
										rows="6"
									/>
									<Errors
										className="text-danger"
										model=".comment"
										show="touched"
										messages={{
											required: "Comment Required",
										}}
									/>
								</Col>
							</Row>
							<Row className="form-group">
								<Col>
									<Button type="submit" color="primary">
										Submit
									</Button>
								</Col>
							</Row>
						</LocalForm>
					</ModalBody>
				</Modal>
			</React.Fragment>
		);
	}
}

function RenderDish({ dish }) {
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

function RenderComments({ comments }) {
	if (comments != null) {
		const options = { month: "long", day: "numeric", year: "numeric" };
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
									-- {comment.author},{" "}
									{date.toLocaleDateString("en-IN", options)}
								</p>
							</li>
						);
					})}
				</ul>
			</div>
		);
	} else return <div></div>;
}

const Dishdetail = (props) => {
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
			</div>
			<div className="row">
				<div className="col-12 col-md-5 m-1">
					<RenderDish dish={props.dish} />
				</div>
				<div className="col-12 col-md-5 m-1">
					{props.dish && <RenderComments comments={props.comments} />}
					<CommentForm></CommentForm>
				</div>
			</div>
		</div>
	);
};
export default Dishdetail;
