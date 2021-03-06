import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import styles from './FormDashboard.module.css';
import { FaEdit } from 'react-icons/fa';
import ReactApexChart from 'react-apexcharts';
import * as services from '../../../services/services';
import style from './FormDashboard.module.css';

class FormDashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			series1: [ 69 ],
			editId: '',
			formName: '',
			formType: '',
			status: '',
			series2: [ 33 ],
			series3: [ 52 ],
			userName: 'admin123',
			data: [],

			options1: {
				chart: {
					height: 150,
					type: 'radialBar'
				},
				plotOptions: {
					radialBar: {
						hollow: {
							size: '55%'
						},
						dataLabels: {
							name: {
								offsetY: -10,
								show: true,
								color: 'Black',
								fontSize: '14px'
							}
						}
					}
				},

				fill: {
					background: 'red',
					type: 'gradient',
					gradient: {
						shade: 'dark',
						type: 'vertical',
						gradientToColors: [ '', '', '', '' ],

						stops: [ 0, 100 ]
					}
				},
				padding: {
					top: '0px',
					right: '0px',
					bottom: '0px',
					left: '0px'
				},
				colors: [ 'red' ],
				labels: [ 'Pending Form' ]
			},

			options2: {
				chart: {
					height: 150,
					type: 'radialBar'
				},
				plotOptions: {
					radialBar: {
						hollow: {
							size: '55%'
						},
						dataLabels: {
							name: {
								offsetY: -10,
								show: true,
								color: 'Black',
								fontSize: '15px'
							}
						}
					}
				},
				fill: {
					background: 'yellow',
					type: 'gradient',
					gradient: {
						shade: 'dark',
						type: 'vertical',
						gradientToColors: [ '', '', '', '' ],

						stops: [ 0, 100 ]
					}
				},
				padding: {
					top: '0px',
					right: '0px',
					bottom: '0px',
					left: '0px'
				},

				colors: [ '#F2872C' ],
				labels: [ 'Approved' ]
			},
			options3: {
				chart: {
					height: 150,
					type: 'radialBar'
				},
				plotOptions: {
					radialBar: {
						hollow: {
							size: '55%'
						},
						dataLabels: {
							name: {
								offsetY: -10,
								show: true,
								color: 'Black',
								fontSize: '15px'
							}
						}
					}
				},
				fill: {
					background: 'green',
					type: 'gradient',
					gradient: {
						shade: 'dark',
						type: 'vertical',
						gradientToColors: [ '', '', '', '' ],

						stops: [ 0, 100 ]
					}
				},
				padding: {
					top: '0px',
					right: '0px',
					bottom: '0px',
					left: '0px'
				},

				colors: [ '#64E986' ],
				labels: [ 'Rejected' ]
			}
		};
	}
	componentDidMount() {
		this.onGetUserData();
	}
	onGetUserData = async () => {
		await services.getService('forms').then((res) => {
			this.setState({ data: res.data.Forms });
		});
	};
	onEditData = (id, e) => {
		const newData = this.state.data.filter((obj) => obj._id === id)[0];
		this.setState({
			formName: newData.formName,
			formType: newData.formType,
			status: newData.status,
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
	render() {
		return (
			<div className="jumbotron jumbo-form">
				<h5 className="page-heading">Forms</h5>
				<hr className="hr-line" />
				<div className="text-center">
					<div className={styles.circle} id="chart">
						<div className="row">
							<div className={styles['card-body']}>
								<div className="col-sm">
									<ReactApexChart
										className={styles.apex_chart}
										options={this.state.options1}
										series={this.state.series1}
										type="radialBar"
										height={250}
									/>
								</div>
							</div>

							<div className={styles['card-body']}>
								<div className="col-sm">
									<ReactApexChart
										className={styles.apex_chart}
										options={this.state.options2}
										series={this.state.series2}
										type="radialBar"
										height={250}
									/>
								</div>
							</div>

							<div className={styles['card-body']}>
								<div className="col-sm">
									<ReactApexChart
										className={styles.apex_chart}
										options={this.state.options3}
										series={this.state.series3}
										type="radialBar"
										height={250}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<hr className="hr-line" />
				<div className="form-container" />
				<div className="table-responsive">
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Form Name</th>
								<th>Form Type</th>
								<th>Status</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{this.state.data.map((data) => (
								<tr key={data}>
									<td>{data.formName}</td>
									<td>{data.formType}</td>
									<td>{data.status}</td>
									<td>
										<button className={style.edit} onClick={this.onEditData.bind(this, data._id)}>
											<FaEdit
												className="svgedit"
												onClick={() => this.setState({ onHideForm: true })}
											/>
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			</div>
		);
	}
}
export default FormDashboard;
