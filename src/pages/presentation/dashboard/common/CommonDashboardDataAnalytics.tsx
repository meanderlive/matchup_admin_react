import React from 'react';
import Card, { CardBody, CardHeader, CardTitle } from '../../../../components/bootstrap/Card';

const CommonDashboardDataAnalytics = () => {
	const analyticsMetrics = [
		{
			title: 'Average Session Duration',
			value: '12.5 min',
			change: '+5.2%',
			changeType: 'positive',
			color: 'primary'
		},
		{
			title: 'Bounce Rate',
			value: '23.8%',
			change: '-2.1%',
			changeType: 'positive',
			color: 'success'
		},
		{
			title: 'Match Success Rate',
			value: '68.4%',
			change: '+3.5%',
			changeType: 'positive',
			color: 'info'
		},
		{
			title: 'User Retention',
			value: '84.2%',
			change: '+1.8%',
			changeType: 'positive',
			color: 'warning'
		}
	];

	const weeklyData = [
		{ day: 'Mon', active: 1200, new: 180 },
		{ day: 'Tue', active: 1350, new: 220 },
		{ day: 'Wed', active: 1180, new: 190 },
		{ day: 'Thu', active: 1420, new: 250 },
		{ day: 'Fri', active: 1680, new: 280 },
		{ day: 'Sat', active: 1450, new: 240 },
		{ day: 'Sun', active: 1320, new: 210 }
	];

	const topFeatures = [
		{ feature: 'Profile Views', usage: 8500, growth: '+12%' },
		{ feature: 'Messages Sent', usage: 6200, growth: '+8%' },
		{ feature: 'Matches Made', usage: 3400, growth: '+15%' },
		{ feature: 'Likes Given', usage: 2800, growth: '+6%' },
		{ feature: 'Premium Features', usage: 1200, growth: '+25%' }
	];

	const conversionData = [
		{ month: 'Jan', rate: 8.2 },
		{ month: 'Feb', rate: 9.1 },
		{ month: 'Mar', rate: 8.8 },
		{ month: 'Apr', rate: 10.5 },
		{ month: 'May', rate: 11.2 },
		{ month: 'Jun', rate: 12.1 }
	];

	return (
		<div className='row'>
			<div className='col-12 mb-4'>
				<div className='row'>
					{analyticsMetrics.map((metric, index) => (
						<div key={index} className='col-lg-3 col-md-6 mb-3'>
							<Card>
								<CardBody>
									<div className='d-flex align-items-center'>
										<div className='flex-shrink-0'>
											<div className={`ratio ratio-1x1 rounded-2 bg-l25-${metric.color} text-${metric.color}`}
												style={{ width: 50 }}>
												<div className='d-flex align-items-center justify-content-center'>
													<span className='fw-bold'>📊</span>
												</div>
											</div>
										</div>
										<div className='flex-grow-1 ms-3'>
											<div className='fw-bold fs-5'>{metric.value}</div>
											<div className='text-muted small mb-1'>{metric.title}</div>
											<span className={`badge bg-${metric.changeType === 'positive' ? 'success' : 'danger'}-subtle text-${metric.changeType === 'positive' ? 'success' : 'danger'}`}>
												{metric.change}
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
						<CardTitle>User Engagement Trends</CardTitle>
					</CardHeader>
					<CardBody>
						<div className='table-responsive'>
							<table className='table table-modern table-hover'>
								<thead>
									<tr>
										<th>Day</th>
										<th>Active Users</th>
										<th>New Users</th>
										<th>Total</th>
									</tr>
								</thead>
								<tbody>
									{weeklyData.map((data, index) => (
										<tr key={index}>
											<td className='fw-bold'>{data.day}</td>
											<td className='text-primary'>{data.active.toLocaleString()}</td>
											<td className='text-success'>{data.new.toLocaleString()}</td>
											<td className='text-info fw-bold'>{(data.active + data.new).toLocaleString()}</td>
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
						<CardTitle>Feature Usage</CardTitle>
					</CardHeader>
					<CardBody>
						<div className='d-flex flex-column gap-3'>
							{topFeatures.map((feature, index) => (
								<div key={index} className='d-flex justify-content-between align-items-center'>
									<div>
										<div className='fw-bold'>{feature.feature}</div>
										<div className='text-muted small'>{feature.usage.toLocaleString()} daily</div>
									</div>
									<div className='text-end'>
										<div className='fw-bold text-success'>{feature.growth}</div>
										<div className='progress' style={{ width: '60px', height: '4px' }}>
											<div 
												className='progress-bar bg-success' 
												style={{ width: `${Math.random() * 100}%` }}
											></div>
										</div>
									</div>
								</div>
							))}
						</div>
					</CardBody>
				</Card>
			</div>

			<div className='col-lg-6 mb-4'>
				<Card stretch>
					<CardHeader>
						<CardTitle>Conversion Rate</CardTitle>
					</CardHeader>
					<CardBody>
						<div className='table-responsive'>
							<table className='table table-modern table-hover'>
								<thead>
									<tr>
										<th>Month</th>
										<th>Free to Premium (%)</th>
									</tr>
								</thead>
								<tbody>
									{conversionData.map((data, index) => (
										<tr key={index}>
											<td className='fw-bold'>{data.month}</td>
											<td className='text-success fw-bold'>{data.rate}%</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</CardBody>
				</Card>
			</div>

			<div className='col-lg-6 mb-4'>
				<Card stretch>
					<CardHeader>
						<CardTitle>Top Features</CardTitle>
					</CardHeader>
					<CardBody>
						<div className='d-flex flex-column gap-3'>
							{topFeatures.map((feature, index) => (
								<div key={index} className='d-flex justify-content-between align-items-center'>
									<div>
										<div className='fw-bold'>{feature.feature}</div>
										<div className='text-muted small'>{feature.usage.toLocaleString()} daily</div>
									</div>
									<div className='text-end'>
										<div className='fw-bold text-success'>{feature.growth}</div>
										<div className='progress' style={{ width: '60px', height: '4px' }}>
											<div 
												className='progress-bar bg-success' 
												style={{ width: `${Math.random() * 100}%` }}
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

export default CommonDashboardDataAnalytics;