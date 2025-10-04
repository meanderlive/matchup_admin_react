import React from 'react';
import Card, { CardBody, CardHeader, CardTitle } from '../../../../components/bootstrap/Card';
import Button from '../../../../components/bootstrap/Button';

const CommonDashboardNewRegistrations = () => {
	const newUsers = [
		{
			id: 1,
			name: 'John Doe',
			email: 'john.doe@example.com',
			avatar: '',
			status: 'online',
			registrationDate: '2 hours ago',
			profileType: 'premium'
		},
		{
			id: 2,
			name: 'Jane Smith',
			email: 'jane.smith@example.com',
			avatar: '',
			status: 'offline',
			registrationDate: '4 hours ago',
			profileType: 'free'
		},
		{
			id: 3,
			name: 'Mike Johnson',
			email: 'mike.j@example.com',
			avatar: '',
			status: 'online',
			registrationDate: '6 hours ago',
			profileType: 'premium'
		},
		{
			id: 4,
			name: 'Sarah Wilson',
			email: 'sarah.w@example.com',
			avatar: '',
			status: 'online',
			registrationDate: '8 hours ago',
			profileType: 'free'
		},
		{
			id: 5,
			name: 'David Brown',
			email: 'david.b@example.com',
			avatar: '',
			status: 'offline',
			registrationDate: '1 day ago',
			profileType: 'premium'
		}
	];

	const getStatusColor = (status: string) => {
		return status === 'online' ? 'success' : 'secondary';
	};

	const getProfileTypeColor = (type: string) => {
		return type === 'premium' ? 'warning' : 'info';
	};

	return (
		<Card stretch>
			<CardHeader>
				<CardTitle>
					New User Registrations
				</CardTitle>
				<Button color='primary' size='sm'>
					View All
				</Button>
			</CardHeader>
			<CardBody>
				<div className='table-responsive'>
					<table className='table table-modern table-hover'>
						<thead>
							<tr>
								<th>User</th>
								<th>Status</th>
								<th>Profile Type</th>
								<th>Registered</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{newUsers.map((user) => (
								<tr key={user.id}>
									<td>
										<div className='d-flex align-items-center'>
											<div className={`ratio ratio-1x1 rounded-2 bg-l25-${user.status === 'online' ? 'success' : 'secondary'} me-3`}
												style={{ width: 40 }}>
												<div className='d-flex align-items-center justify-content-center'>
													<span className='text-white fw-bold'>{user.name.charAt(0)}</span>
												</div>
											</div>
											<div>
												<div className='fw-bold'>{user.name}</div>
												<div className='text-muted small'>{user.email}</div>
											</div>
										</div>
									</td>
									<td>
										<span className={`badge bg-${getStatusColor(user.status)}-subtle text-${getStatusColor(user.status)}`}>
											{user.status}
										</span>
									</td>
									<td>
										<span className={`badge bg-${getProfileTypeColor(user.profileType)}-subtle text-${getProfileTypeColor(user.profileType)}`}>
											{user.profileType}
										</span>
									</td>
									<td>
										<span className='text-muted'>{user.registrationDate}</span>
									</td>
									<td>
										<Button color='primary' size='sm' isLight>
											View Profile
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</CardBody>
		</Card>
	);
};

export default CommonDashboardNewRegistrations;
