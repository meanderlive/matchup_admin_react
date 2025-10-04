import React from 'react';
import Card, { CardBody, CardHeader, CardTitle } from '../../../../components/bootstrap/Card';

const CommonDashboardUserDemographics = () => {
	const genderData = [
		{ label: 'Male', percentage: 65, color: 'primary' },
		{ label: 'Female', percentage: 30, color: 'info' },
		{ label: 'Other', percentage: 5, color: 'warning' }
	];

	const ageData = [
		{ label: '18-25', percentage: 25, color: 'danger' },
		{ label: '26-35', percentage: 35, color: 'primary' },
		{ label: '36-45', percentage: 20, color: 'warning' },
		{ label: '46-55', percentage: 15, color: 'info' },
		{ label: '55+', percentage: 5, color: 'success' }
	];

	const locationStats = [
		{ location: 'United States', users: 3245, percentage: 25.8 },
		{ location: 'United Kingdom', users: 2134, percentage: 17.0 },
		{ location: 'Canada', users: 1876, percentage: 14.9 },
		{ location: 'Australia', users: 1456, percentage: 11.6 },
		{ location: 'Germany', users: 1234, percentage: 9.8 }
	];

	return (
		<div className='row'>
			<div className='col-lg-4 mb-4'>
				<Card stretch>
					<CardHeader>
						<CardTitle>Gender Distribution</CardTitle>
					</CardHeader>
					<CardBody>
						<div className='d-flex flex-column gap-3'>
							{genderData.map((item, index) => (
								<div key={index} className='d-flex justify-content-between align-items-center'>
									<div>
										<div className='fw-bold'>{item.label}</div>
										<div className='text-muted small'>{item.percentage}%</div>
									</div>
									<div className='text-end'>
										<div className='progress' style={{ width: '80px', height: '8px' }}>
											<div 
												className={`progress-bar bg-${item.color}`}
												style={{ width: `${item.percentage}%` }}
											></div>
										</div>
									</div>
								</div>
							))}
						</div>
					</CardBody>
				</Card>
			</div>
			
			<div className='col-lg-4 mb-4'>
				<Card stretch>
					<CardHeader>
						<CardTitle>Age Distribution</CardTitle>
					</CardHeader>
					<CardBody>
						<div className='d-flex flex-column gap-3'>
							{ageData.map((item, index) => (
								<div key={index} className='d-flex justify-content-between align-items-center'>
									<div>
										<div className='fw-bold'>{item.label}</div>
										<div className='text-muted small'>{item.percentage}%</div>
									</div>
									<div className='text-end'>
										<div className='progress' style={{ width: '80px', height: '8px' }}>
											<div 
												className={`progress-bar bg-${item.color}`}
												style={{ width: `${item.percentage}%` }}
											></div>
										</div>
									</div>
								</div>
							))}
						</div>
					</CardBody>
				</Card>
			</div>
			
			<div className='col-lg-4 mb-4'>
				<Card stretch>
					<CardHeader>
						<CardTitle>Top Locations</CardTitle>
					</CardHeader>
					<CardBody>
						<div className='d-flex flex-column gap-3'>
							{locationStats.map((stat, index) => (
								<div key={index} className='d-flex justify-content-between align-items-center'>
									<div>
										<div className='fw-bold'>{stat.location}</div>
										<div className='text-muted small'>{stat.users.toLocaleString()} users</div>
									</div>
									<div className='text-end'>
										<div className='fw-bold text-primary'>{stat.percentage}%</div>
										<div className='progress' style={{ width: '60px', height: '4px' }}>
											<div 
												className='progress-bar bg-primary' 
												style={{ width: `${stat.percentage}%` }}
											></div>
										</div>
									</div>
								</div>
							))}
						</div>
					</CardBody>
				</Card>
			</div>
		</div>
	);
};

export default CommonDashboardUserDemographics;