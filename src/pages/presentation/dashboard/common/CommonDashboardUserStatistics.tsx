import React from 'react';
import Card, { CardBody } from '../../../../components/bootstrap/Card';
import Icon from '../../../../components/icon/Icon';

const CommonDashboardUserStatistics = () => {
	const userStats = [
		{
			title: 'Total Users',
			value: '12,543',
			change: '+12.5%',
			changeType: 'positive',
			icon: 'Person',
			color: 'primary'
		},
		{
			title: 'Active Users',
			value: '8,234',
			change: '+8.2%',
			changeType: 'positive',
			icon: 'CheckCircle',
			color: 'success'
		},
		{
			title: 'New Registrations',
			value: '1,234',
			change: '+15.3%',
			changeType: 'positive',
			icon: 'PersonAdd',
			color: 'info'
		},
		{
			title: 'Premium Users',
			value: '3,456',
			change: '+5.7%',
			changeType: 'positive',
			icon: 'Stars',
			color: 'warning'
		}
	];

	return (
		<div className='row'>
			{userStats.map((stat, index) => (
				<div key={index} className='col-lg-3 col-md-6 mb-4'>
					<Card stretch>
						<CardBody>
							<div className='d-flex align-items-center'>
								<div className='flex-shrink-0'>
									<div className={`ratio ratio-1x1 rounded-2 bg-l${stat.color === 'primary' ? '25' : stat.color === 'success' ? '25' : stat.color === 'info' ? '25' : '25'}-${stat.color} text-${stat.color}`}
										style={{ width: 60 }}>
										<div className='d-flex align-items-center justify-content-center'>
											<Icon icon={stat.icon} size='2x' />
										</div>
									</div>
								</div>
								<div className='flex-grow-1 ms-3'>
									<div className='fw-bold fs-6 mb-1'>{stat.value}</div>
									<div className='text-muted small mb-1'>{stat.title}</div>
									<span className={`badge bg-${stat.changeType === 'positive' ? 'success' : 'danger'}-subtle text-${stat.changeType === 'positive' ? 'success' : 'danger'}`}>
										{stat.change}
									</span>
								</div>
							</div>
						</CardBody>
					</Card>
				</div>
			))}
		</div>
	);
};

export default CommonDashboardUserStatistics;
