import React, { Component } from 'react';
import { Col, Row, Table, Modal, Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import * as services from '../../../services/services';

class Family extends Component {
	constructor(props) {
		super(props);
		this.state = {
			onHideForm: false,
			editId: '',
			dyanamicBtnName: 'Submit',
			update: false,
			id: '',
			showHide: '',
			name: '',
			occupation: '',
			relationship: '',
			address: '',
			phone: '',
			userName: 'admin123',
			errors: {},
			data: []
		};
	}
	componentDidMount() {
		this.onGetUserData();
	}
	handleValidation() {
		let name = this.state.name;
		let occupation = this.state.occupation;
		let relationship = this.state.relationship;
		let address = this.state.address;
		let phone = this.state.phone;
		let errors = {};
		let formIsValid = true;

		//==================branchAddress======================
		if (!name) {
			formIsValid = false;
			errors['inputName'] = 'Cannot be empty';
		} else if (typeof name !== 'undefined') {
			if (!name.match(/[\D][a-zA-Z\Da-zA-Z][\D]+$/g)) {
				formIsValid = false;
				errors['inputName'] = 'Only letters & also check for any Space';
			}
		}
		//===================bankName=====================
		if (!occupation) {
			formIsValid = false;
			errors['inputOccupation'] = 'Cannot be empty';
		} else if (typeof occupation !== 'undefined') {
			if (!occupation.match(/[\D][a-zA-Z\Da-zA-Z][\D]+$/g)) {
				formIsValid = false;
				errors['inputOccupation'] = 'Only characters are allowed';
			}
		}
		//=================accountNumber=======================
		if (!relationship) {
			formIsValid = false;
			errors['inputRelationship'] = 'Cannot be empty';
		} else if (typeof relationship !== 'undefined') {
			if (!relationship.match(/[\D][a-zA-Z\Da-zA-Z][\D]+$/g)) {
				formIsValid = false;
				errors['inputRelationship'] = 'Only characters are allowed';
			}
		}
		//===================ifscCode=====================
		if (!address) {
			formIsValid = false;
			errors['inputAddress'] = 'Cannot be empty';
		} else if (typeof address !== 'undefined') {
			if (!address.match(/[\D][a-zA-Z\Da-zA-Z][\D]+$/g)) {
				formIsValid = false;
				errors['inputAddress'] = 'Only characters are allowed';
			}
		}
		//=================================================
		if (!phone) {
			formIsValid = false;
			errors['inputPhone'] = 'Cannot be empty';
		} else if (typeof phone !== 'undefined') {
			if (!String(phone).match(/^[0-9]{10}$/)) {
				formIsValid = false;
				errors['inputPhone'] = 'Wrong Mobile Number ';
			}
		}
		this.setState({
			errors: errors
		});
		return formIsValid;
	}
	onGetUserData = async () => {
		services.getService('families').then((res) => {
			this.setState({ data: res.data.Family });
		});
	};
	onSubmitHandler = async () => {
		this.state.showHide = false;
		const data = {
			name: this.state.name,
			occupation: this.state.occupation,
			relationship: this.state.relationship,
			address: this.state.address,
			phone: this.state.phone
		};
		if (this.state.editId === '') {
			if (this.handleValidation()) {
				await services.postService('families', data).then((res) => {
					this.onGetUserData();
					this.handleReset();
					this.setState({ onHideForm: !this.state.onHideForm });
				});
			} else {
				console.log('fill the form ');
			}
		} else {
			if (this.handleValidation()) {
				await services.patchService('families', this.state.editId, data).then((res) => {
					this.onGetUserData();
					this.setState({ onHideForm: !this.state.onHideForm, editId: '' });
					this.handleReset();
				});
			} else {
				console.log('form is Not Updated');
			}
		}
	};
	onRemoveData = async () => {
		await services.deleteService('families', this.state.editId).then((res) => {
			const newData = this.state.data.filter((obj) => obj._id !== this.state.editId);
			this.setState({ data: newData, showHide: false, editId: '' });
		});
	};
	onEditData = async (id, e) => {
		const newData = this.state.data.filter((obj) => obj._id === id)[0];
		this.setState({
			name: newData.name,
			occupation: newData.occupation,
			relationship: newData.relationship,
			address: newData.address,
			phone: newData.phone,
			editId: newData._id,
			dyanamicBtnName: 'Update'
		});
	};
	handleModalShow = (id) => {
		this.setState({ showHide: !false, editId: id });
	};
	handleModalHide = () => {
		this.setState({ showHide: false, editId: '' });
	};
	handleReset = (form) => {
		this.setState({
			name: '',
			occupation: '',
			relationship: '',
			address: '',
			phone: '',
			errors: ''
		});
	};
	handleManualReset = () => {
		this.form.reset();
	};
	onHideForm = () => {
		return !this.state.onHideForm ? (
			this.onHideForm()
		) : (
			<div className="form-container">
				<form
					onSubmit={() => this.setState({ onHideForm: false, dyanamicBtnName: 'Submit' })}
					ref={(form) => (this.form = form)}
					onReset={this.handleReset}
				>
					<Row>
						<div className="form-group col-12 col-md-6">
							<label for="inputdegree" className="col-form-label">
								Name
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="inputdegree"
								placeholder="Name"
								onChange={(e) => {
									this.setState({
										name: e.target.value
									});
								}}
								ref="inputName"
								value={this.state.name}
								required
							/>
							<div className="error-msg">{this.state.errors['inputName']}</div>
						</div>

						<div className="form-group col-12 col-md-6">
							<label for="inputPassword" className="col-form-label">
								Accupation
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="inputPassword"
								placeholder="Accupation"
								ref="inputOccupation"
								onChange={(e) => {
									this.setState({
										occupation: e.target.value
									});
								}}
								value={this.state.occupation}
								required
							/>
							<div className="error-msg">{this.state.errors['inputOccupation']}</div>
						</div>
					</Row>
					<Row>
						<div className="form-group col-12 col-md-6">
							<label for="inputdegree" className="col-form-label">
								Relationship
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="inputdegree"
								placeholder="Relationship"
								ref="inputRelationship"
								onChange={(e) => {
									this.setState({
										relationship: e.target.value
									});
								}}
								value={this.state.relationship}
								required
							/>
							<div className="error-msg">{this.state.errors['inputRelationship']}</div>
						</div>
						<div className="form-group col-12 col-md-6">
							<label for="inputPassword" className="col-form-label">
								Address
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="inputPassword"
								placeholder="Address"
								ref="inputAddress"
								onChange={(e) => {
									this.setState({
										address: e.target.value
									});
								}}
								value={this.state.address}
								required
							/>
							<div className="error-msg">{this.state.errors['inputAddress']}</div>
						</div>
					</Row>
					<Row>
						<div className="form-group col-12 col-md-6">
							<label for="inputdegree" className="col-form-label">
								Phone
							</label>
							<input
								type="number"
								className="form-control form-input"
								id="inputdegree"
								placeholder="Phone"
								ref="inputPhone"
								onChange={(e) => {
									this.setState({
										phone: e.target.value
									});
								}}
								value={this.state.phone}
								required
							/>
							<div className="error-msg">{this.state.errors['inputPhone']}</div>
						</div>
					</Row>
					<div className="text-center">
						<button
							type="button"
							className="submit-button"
							onClick={() => {
								this.onSubmitHandler();
							}}
						>
							{this.state.dyanamicBtnName}
						</button>
						<button
							type="reset"
							className="cancel-button"
							onClick={() => {
								this.setState({ onHideForm: !this.state.onHideForm });
								this.handleManualReset();
							}}
							value="reset"
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		);
	};
	render() {
		return (
			<div className="jumbotron jumbo-form">
				<Row>
					<Col>
						<h5 className="page-heading align-middle">Family</h5>
					</Col>
					<Col className="d-flex flex-row-reverse">
						{this.state.onHideForm ? (
							!this.onHideForm()
						) : (
							<button
								className="submit-button"
								onClick={() => this.setState({ onHideForm: true, dyanamicBtnName: 'Submit' })}
							>
								ADD
							</button>
						)}
					</Col>
				</Row>
				<hr className="hr-line" />
				<div>
					{this.state.onHideForm ? (
						this.onHideForm()
					) : (
						<div className="table-responsive">
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>Name</th>
										<th>Relationship</th>
										<th>Phone</th>
										<th>Accupation</th>
										<th>Address</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{this.state.data.map((data) => (
										<tr key={data}>
											<td>{data.name}</td>
											<td>{data.relationship}</td>
											<td>{data.phone}</td>
											<td>{data.occupation}</td>
											<td>{data.address}</td>
											<td>
												<button
													className="editbutton"
													onClick={this.onEditData.bind(this, data._id)}
												>
													<FaEdit
														className="svgedit"
														onClick={() => this.setState({ onHideForm: true })}
													/>
												</button>
												<button
													className="deletebutton"
													onClick={this.handleModalShow.bind(this, data._id)}
												>
													<FaTrash className="svgdelete" />
												</button>

												<Modal show={this.state.showHide}>
													<Modal.Body>
														<h6>Are you sure ! Delete this Data ?</h6>
													</Modal.Body>
													<Modal.Footer>
														<Button onClick={this.onRemoveData}>Delete</Button>
														<Button onClick={this.handleModalHide}>Close</Button>
													</Modal.Footer>
												</Modal>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						</div>
					)}
				</div>
			</div>
		);
	}
}
export default Family;

// const family = () => {
//     return (
//         <div className="jumbotron jumbo-form">
//             <h5 className="page-heading">Family</h5>
//             <hr className="hr-line" />
//             <div className="form-container">
//                 <form>
//                     <Row>
//                         <div className="form-group col-12 col-md-6">
//                             <label for="inputdegree" className="col-form-label">Name</label>
//                             <input type="text" className="form-control form-input" id="inputdegree" placeholder="Name" required />
//                         </div>
//                         <div className="form-group col-12 col-md-6">
//                             <label for="inputPassword" className="col-form-label">Accupation</label>
//                             <input type="text" className="form-control form-input" id="inputPassword" placeholder="Accupation" required />
//                         </div>
//                     </Row>
//                     <Row>
//                         <div className="form-group col-12 col-md-6">
//                             <label for="inputdegree" className="col-form-label">Relationship</label>
//                             <input type="text" className="form-control form-input" id="inputdegree" placeholder="Relationship" required />
//                         </div>
//                         <div className="form-group col-12 col-md-6">
//                             <label for="inputPassword" className="col-form-label">Address</label>
//                             <input type="text" className="form-control form-input" id="inputPassword" placeholder="Address" required />
//                         </div>
//                     </Row>
//                     <Row>
//                         <div className="form-group col-12 col-md-6">
//                             <label for="inputdegree" className="col-form-label">Phone</label>
//                             <input type="text" className="form-control form-input" id="inputdegree" placeholder="Phone" required />
//                         </div>

//                     </Row>
//                     <div className="text-center">
//                         <input type="submit" value="submit" className="submit-button" />
//                     </div>
//                 </form>
//             </div>
//             <hr className="hr-line" />
//             <div className="table-responsive">
//                 <Table striped bordered hover>
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Relationship</th>
//                             <th>Phone</th>
//                             <th>Accupation</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td>Rahul</td>
//                             <td>Brother</td>
//                             <td>0000</td>
//                             <td>Student</td>
//                             <td><FaEdit className="svgedit" /><FaTrash className="svgdelete" /></td>
//                         </tr>
//                     </tbody>
//                 </Table>
//             </div>
//         </div>
//     )
// }

// export default family;
