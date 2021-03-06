import React, { Component } from 'react';
import { Col, Row, Table, Modal, Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import * as services from '../../../services/services';

class UserBankDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			onHideForm: false,
			editId: '',
			dyanamicBtnName: 'Submit',
			update: false,
			id: '',
			showHide: '',
			branchName: '',
			bankName: '',
			accountNum: '',
			ifscCode: '',
			userName: 'admin123',
			errors: {},
			data: []
		};
	}
	componentDidMount() {
		this.onGetUserData();
	}
	handleValidation() {
		let bankName = this.state.bankName;
		let branchName = this.state.branchName;
		let ifscCode = this.state.ifscCode;
		let accountNum = this.state.accountNum;
		let errors = {};
		let formIsValid = true;

		//==================branchAddress======================
		if (!branchName) {
			formIsValid = false;
			errors['inputBranchAddress'] = 'Cannot be empty';
		} else if (typeof branchName !== 'undefined') {
			if (!branchName.match(/[\D][a-zA-Z\Da-zA-Z][\D]+$/g)) {
				formIsValid = false;
				errors['inputBranchAddress'] = 'Only letters & also check for any Space';
			}
		}
		//===================bankName=====================
		if (!bankName) {
			formIsValid = false;
			errors['inputBankName'] = 'Cannot be empty';
		} else if (typeof bankName !== 'undefined') {
			if (!bankName.match(/[a-zA-Z]+$/i)) {
				formIsValid = false;
				errors['inputBankName'] = 'Only letters';
			}
		}
		//=================accountNumber=======================
		if (!accountNum) {
			formIsValid = false;
			errors['inputAccountNumber'] = 'Cannot be empty';
		} else if (typeof accountNum !== 'undefined') {
			if (!String(accountNum).match(/^\d{9,18}\S$/)) {
				formIsValid = false;
				errors['inputAccountNumber'] = 'Only numbers & also check Account Number';
			}
		}
		//===================ifscCode=====================
		if (!ifscCode) {
			formIsValid = false;
			errors['inputIfscCode'] = 'Cannot be empty';
		} else if (typeof ifscCode !== 'undefined') {
			if (!ifscCode.match(/^[A-Z]{4}[0-9]{6}$/)) {
				formIsValid = false;
				errors['inputIfscCode'] = 'Check IFSC Code Invalid Input';
			}
		}
		this.setState({
			errors: errors
		});
		return formIsValid;
	}
	onGetUserData = async () => {
		services.getService('bankdetails').then((res) => {
			this.setState({ data: res.data.Details });
		});
	};
	onSubmitHandler = async () => {
		this.state.showHide = false;
		const data = {
			branchName: this.state.branchName,
			bankName: this.state.bankName,
			accountNum: this.state.accountNum,
			ifscCode: this.state.ifscCode
		};
		if (this.state.editId === '') {
			if (this.handleValidation()) {
				await services.postService('bankdetails', data).then((res) => {
					this.onGetUserData();
					this.handleReset();
					this.setState({ onHideForm: !this.state.onHideForm });
				});
			} else {
				console.log('fill the form ');
			}
		} else {
			if (this.handleValidation()) {
				await services.patchService('bankdetails', this.state.editId, data).then((res) => {
					this.onGetUserData();
					this.setState({ onHideForm: !this.state.onHideForm, editId: '' });
					this.handleReset();
				});
			} else {
				console.log('form is Not Updated');
			}
		}
	};
	onRemoveData = async (id) => {
		await services.deleteService('bankdetails', this.state.editId).then((res) => {
			const newData = this.state.data.filter((obj) => obj._id !== this.state.editId);
			this.setState({ data: newData, showHide: false, editId: '' });
		});
	};
	onEditData = async (id) => {
		const newData = this.state.data.filter((obj) => obj._id === id)[0];
		this.setState({
			branchName: newData.branchName,
			bankName: newData.bankName,
			accountNum: newData.accountNum,
			ifscCode: newData.ifscCode,
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
			branchName: '',
			bankName: '',
			accountNum: '',
			ifscCode: '',
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
							<label for="inputBankName" className="col-form-label">
								Name of Bank
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="inputBankName"
								placeholder="Enter Bank Name"
								onChange={(e) => {
									this.setState({ bankName: e.target.value });
								}}
								value={this.state.bankName}
								ref="inputBankName"
								required
							/>
							<div className="error-msg">{this.state.errors['inputBankName']}</div>
						</div>
						<div className="form-group col-12 col-md-6">
							<label for="inputIfscCode" className="col-form-label">
								IFSC Code
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="inputIfscCode"
								placeholder="Enter IFSC code"
								onChange={(e) => {
									this.setState({ ifscCode: e.target.value });
								}}
								value={this.state.ifscCode}
								ref="inputIfscCode"
								required
							/>
							<div className="error-msg">{this.state.errors['inputIfscCode']}</div>
						</div>
					</Row>
					<Row>
						<div className="form-group col-12 col-md-6">
							<label for="inputBranchAddress" className="col-form-label">
								Branch Address
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="inputBranchAddress"
								placeholder="Enter Branch Address"
								onChange={(e) => {
									this.setState({ branchName: e.target.value });
								}}
								value={this.state.branchName}
								ref="inputBranchAddress"
								required
							/>
							<div className="error-msg">{this.state.errors['inputBranchAddress']}</div>
						</div>
						<div className="form-group col-12 col-md-6">
							<label for="inputAccountNumber" className="col-form-label">
								Account Number
							</label>
							<input
								type="number"
								className="form-control form-input"
								id="inputAccountNumber"
								placeholder="Enter Account Number"
								onChange={(e) => {
									this.setState({ accountNum: e.target.value });
								}}
								value={this.state.accountNum}
								ref="inputAccountNumber"
								required
							/>
							<div className="error-msg">{this.state.errors['inputAccountNumber']}</div>
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
							default
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
						<h5 className="page-heading align-middle">Bank Details</h5>
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
										<th>Name Of Bank</th>
										<th>IFSC Code</th>
										<th>Branch Address</th>
										<th>Account Number</th>
										<th>Edit / Delete</th>
									</tr>
								</thead>
								<tbody>
									{this.state.data.map((data) => (
										<tr key={data}>
											<td>{data.bankName}</td>
											<td>{data.ifscCode}</td>
											<td>{data.branchName}</td>
											<td>{data.accountNum}</td>
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
export default UserBankDetails;
