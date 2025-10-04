import React from 'react';
import Card, { CardBody, CardHeader, CardTitle } from '../../../../components/bootstrap/Card';

const CommonDashboardPaymentSummary = () => {
	const paymentStats = [
		{
			title: 'Total Revenue',
			value: '$124,500',
			change: '+15.2%',
			changeType: 'positive',
			color: 'success'
		},
		{
			title: 'Monthly Revenue',
			value: '$62,000',
			change: '+8.5%',
			changeType: 'positive',
			color: 'primary'
		},
		{
			title: 'Pending Payments',
			value: '$3,200',
			change: '+2.1%',
			changeType: 'warning',
			color: 'warning'
		},
		{
			title: 'Failed Payments',
			value: '$850',
			change: '-1.2%',
			changeType: 'positive',
			color: 'danger'
		}
	];

	const recentPayments = [
		{
			id: 'PAY-001',
			user: 'John Doe',
			amount: '$29.99',
			method: 'Credit Card',
			status: 'completed',
			date: '2 hours ago',
			plan: 'Premium'
		},
		{
			id: 'PAY-002',
			user: 'Jane Smith',
			amount: '$19.99',
			method: 'PayPal',
			status: 'completed',
			date: '4 hours ago',
			plan: 'Basic'
		},
		{
			id: 'PAY-003',
			user: 'Mike Johnson',
			amount: '$49.99',
			method: 'Stripe',
			status: 'pending',
			date: '6 hours ago',
			plan: 'Enterprise'
		},
		{
			id: 'PAY-004',
			user: 'Sarah Wilson',
			amount: '$29.99',
			method: 'Credit Card',
			status: 'failed',
			date: '8 hours ago',
			plan: 'Premium'
		},
		{
			id: 'PAY-005',
			user: 'David Brown',
			amount: '$19.99',
			method: 'PayPal',
			status: 'completed',
			date: '1 day ago',
			plan: 'Basic'
		}
	];

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'completed': return 'success';
			case 'pending': return 'warning';
			case 'failed': return 'danger';
			default: return 'secondary';
		}
	};

	const paymentMethods = [
		{ method: 'Credit Card', percentage: 45, amount: '$56,025' },
		{ method: 'PayPal', percentage: 30, amount: '$37,350' },
		{ method: 'Stripe', percentage: 20, amount: '$24,900' },
		{ method: 'Bank Transfer', percentage: 5, amount: '$6,225' }
	];

	return (
		<div className='row'>
			<div className='col-12 mb-4'>
				<div className='row'>
					{paymentStats.map((stat, index) => (
						<div key={index} className='col-lg-3 col-md-6 mb-3'>
							<Card>
								<CardBody>
									<div className='d-flex align-items-center'>
										<div className='flex-shrink-0'>
											<div className={`ratio ratio-1x1 rounded-2 bg-l25-${stat.color} text-${stat.color}`}
												style={{ width: 50 }}>
												<div className='d-flex align-items-center justify-content-center'>
													<span className='fw-bold'>💰</span>
												</div>
											</div>
										</div>
										<div className='flex-grow-1 ms-3'>
											<div className='fw-bold fs-5'>{stat.value}</div>
											<div className='text-muted small mb-1'>{stat.title}</div>
											<span className={`badge bg-${stat.changeType === 'positive' ? 'success' : stat.changeType === 'warning' ? 'warning' : 'danger'}-subtle text-${stat.changeType === 'positive' ? 'success' : stat.changeType === 'warning' ? 'warning' : 'danger'}`}>
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
						<CardTitle>Recent Payments</CardTitle>
					</CardHeader>
					<CardBody>
						<div className='table-responsive'>
							<table className='table table-modern table-hover'>
								<thead>
									<tr>
										<th>Payment ID</th>
										<th>User</th>
										<th>Amount</th>
										<th>Method</th>
										<th>Plan</th>
										<th>Status</th>
										<th>Date</th>
									</tr>
								</thead>
								<tbody>
									{recentPayments.map((payment) => (
										<tr key={payment.id}>
											<td>
												<span className='badge bg-secondary-subtle text-secondary'>
													{payment.id}
												</span>
											</td>
											<td>{payment.user}</td>
											<td>
												<span className='fw-bold text-success'>
													{payment.amount}
												</span>
											</td>
											<td>{payment.method}</td>
											<td>
												<span className='badge bg-info-subtle text-info'>
													{payment.plan}
												</span>
											</td>
											<td>
												<span className={`badge bg-${getStatusColor(payment.status)}-subtle text-${getStatusColor(payment.status)}`}>
													{payment.status}
												</span>
											</td>
											<td>
												<span className='text-muted'>{payment.date}</span>
											</td>
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
						<CardTitle>Payment Methods</CardTitle>
					</CardHeader>
					<CardBody>
						<div className='d-flex flex-column gap-3'>
							{paymentMethods.map((method, index) => (
								<div key={index} className='d-flex justify-content-between align-items-center'>
									<div>
										<div className='fw-bold'>{method.method}</div>
										<div className='text-muted small'>{method.amount}</div>
									</div>
									<div className='text-end'>
										<div className='fw-bold text-primary'>{method.percentage}%</div>
										<div className='progress' style={{ width: '60px', height: '4px' }}>
											<div 
												className='progress-bar bg-primary' 
												style={{ width: `${method.percentage}%` }}
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

export default CommonDashboardPaymentSummary;