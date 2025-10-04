import React from 'react';
import Card, { CardBody, CardHeader, CardTitle } from '../../../../components/bootstrap/Card';

const CommonDashboardSubscriptionInsights = () => {
	const subscriptionStats = [
		{
			title: 'Total Subscribers',
			value: '4,200',
			change: '+12.5%',
			changeType: 'positive',
			color: 'primary'
		},
		{
			title: 'Monthly Revenue',
			value: '$62,000',
			change: '+8.2%',
			changeType: 'positive',
			color: 'success'
		},
		{
			title: 'Churn Rate',
			value: '3.2%',
			change: '-0.5%',
			changeType: 'positive',
			color: 'info'
		},
		{
			title: 'ARPU',
			value: '$14.76',
			change: '+2.1%',
			changeType: 'positive',
			color: 'warning'
		}
	];

	const planBreakdown = [
		{ plan: 'Basic Plan', users: 2100, revenue: 31500, color: 'primary' },
		{ plan: 'Premium Plan', users: 1500, revenue: 22500, color: 'success' },
		{ plan: 'Enterprise', users: 600, revenue: 18000, color: 'warning' }
	];

	const monthlyData = [
		{ month: 'Jan', free: 12000, premium: 3000 },
		{ month: 'Feb', free: 12500, premium: 3200 },
		{ month: 'Mar', free: 13000, premium: 3500 },
		{ month: 'Apr', free: 12800, premium: 3800 },
		{ month: 'May', free: 13500, premium: 4000 },
		{ month: 'Jun', free: 13800, premium: 4200 }
	];

	return (
		<div className='row'>
			<div className='col-12 mb-4'>
				<div className='row'>
					{subscriptionStats.map((stat, index) => (
						<div key={index} className='col-lg-3 col-md-6 mb-3'>
							<Card>
								<CardBody>
									<div className='d-flex align-items-center'>
										<div className='flex-shrink-0'>
											<div className={`ratio ratio-1x1 rounded-2 bg-l25-${stat.color} text-${stat.color}`}
												style={{ width: 50 }}>
												<div className='d-flex align-items-center justify-content-center'>
													<span className='fw-bold'>📊</span>
												</div>
											</div>
										</div>
										<div className='flex-grow-1 ms-3'>
											<div className='fw-bold fs-5'>{stat.value}</div>
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
			</div>

			<div className='col-lg-8 mb-4'>
				<Card stretch>
					<CardHeader>
						<CardTitle>Subscription Growth</CardTitle>
					</CardHeader>
					<CardBody>
						<div className='table-responsive'>
							<table className='table table-modern table-hover'>
								<thead>
									<tr>
										<th>Month</th>
										<th>Free Users</th>
										<th>Premium Users</th>
										<th>Total</th>
									</tr>
								</thead>
								<tbody>
									{monthlyData.map((data, index) => (
										<tr key={index}>
											<td className='fw-bold'>{data.month}</td>
											<td className='text-info'>{data.free.toLocaleString()}</td>
											<td className='text-success'>{data.premium.toLocaleString()}</td>
											<td className='text-primary fw-bold'>{(data.free + data.premium).toLocaleString()}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</CardBody>
				</Card>
			</div>

			<div className='col-lg-4 mb-4'>
				<Card stretch>
					<CardHeader>
						<CardTitle>Plan Breakdown</CardTitle>
					</CardHeader>
					<CardBody>
						<div className='d-flex flex-column gap-3'>
							{planBreakdown.map((plan, index) => (
								<div key={index} className='text-center p-3 border rounded'>
									<div className={`display-6 fw-bold text-${plan.color}`}>
										{plan.users.toLocaleString()}
									</div>
									<div className='text-muted mb-2'>{plan.plan}</div>
									<div className='fw-bold text-success'>
										${plan.revenue.toLocaleString()}
									</div>
									<div className='text-muted small'>Monthly Revenue</div>
								</div>
							))}
						</div>
					</CardBody>
				</Card>
			</div>
		</div>
	);
};

export default CommonDashboardSubscriptionInsights;