import React from 'react';
import Card, { CardBody, CardHeader, CardTitle } from '../../../../components/bootstrap/Card';
import Button from '../../../../components/bootstrap/Button';

const CommonDashboardReportedContent = () => {
	const reportedContent = [
		{
			id: 1,
			type: 'Profile',
			reason: 'Inappropriate Content',
			reportedBy: 'User123',
			reportedUser: 'John Doe',
			date: '2 hours ago',
			status: 'pending'
		},
		{
			id: 2,
			type: 'Message',
			reason: 'Harassment',
			reportedBy: 'User456',
			reportedUser: 'Jane Smith',
			date: '4 hours ago',
			status: 'reviewed'
		},
		{
			id: 3,
			type: 'Photo',
			reason: 'Spam',
			reportedBy: 'User789',
			reportedUser: 'Mike Johnson',
			date: '6 hours ago',
			status: 'resolved'
		},
		{
			id: 4,
			type: 'Profile',
			reason: 'Fake Profile',
			reportedBy: 'User101',
			reportedUser: 'Sarah Wilson',
			date: '1 day ago',
			status: 'pending'
		}
	];

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'pending': return 'warning';
			case 'reviewed': return 'info';
			case 'resolved': return 'success';
			default: return 'secondary';
		}
	};

	const stats = [
		{ label: 'Total Reports', value: '1,234', color: 'primary' },
		{ label: 'Pending', value: '89', color: 'warning' },
		{ label: 'Resolved', value: '1,145', color: 'success' },
		{ label: 'Resolved Today', value: '23', color: 'info' }
	];

	return (
		<div className='row'>
			<div className='col-12 mb-4'>
				<div className='row'>
					{stats.map((stat, index) => (
						<div key={index} className='col-lg-3 col-md-6 mb-3'>
							<Card>
								<CardBody className='text-center'>
									<div className={`display-6 fw-bold text-${stat.color}`}>
										{stat.value}
									</div>
									<div className='text-muted'>{stat.label}</div>
								</CardBody>
							</Card>
						</div>
					))}
				</div>
			</div>
			
			<div className='col-12'>
				<Card stretch>
					<CardHeader>
						<CardTitle>Recent Reported Content</CardTitle>
						<Button color='primary' size='sm'>
							View All Reports
						</Button>
					</CardHeader>
					<CardBody>
						<div className='table-responsive'>
							<table className='table table-modern table-hover'>
								<thead>
									<tr>
										<th>Type</th>
										<th>Reason</th>
										<th>Reported By</th>
										<th>Reported User</th>
										<th>Date</th>
										<th>Status</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{reportedContent.map((report) => (
										<tr key={report.id}>
											<td>{report.type}</td>
											<td>{report.reason}</td>
											<td>
												<span className='badge bg-secondary-subtle text-secondary'>
													{report.reportedBy}
												</span>
											</td>
											<td>{report.reportedUser}</td>
											<td>
												<span className='text-muted'>{report.date}</span>
											</td>
											<td>
												<span className={`badge bg-${getStatusColor(report.status)}-subtle text-${getStatusColor(report.status)}`}>
													{report.status}
												</span>
											</td>
											<td>
												<Button color='primary' size='sm' isLight>
													Review
												</Button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</CardBody>
				</Card>
			</div>
		</div>
	);
};

export default CommonDashboardReportedContent;