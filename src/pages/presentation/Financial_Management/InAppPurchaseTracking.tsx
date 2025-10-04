import React, { FC, useState, useEffect } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { dashboardPagesMenu } from '../../../menu';
import Card, { CardBody, CardHeader, CardTitle } from '../../../components/bootstrap/Card';
import Badge from '../../../components/bootstrap/Badge';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Label from '../../../components/bootstrap/forms/Label';
import Select from '../../../components/bootstrap/forms/Select';
import useDarkMode from '../../../hooks/useDarkMode';
import { getColorNameWithIndex } from '../../../helpers/helpers';
import Avatar from '../../../components/Avatar';

interface PurchaseData {
	id: string;
	userId: string;
	userName: string;
	userAvatar: string;
	itemName: string;
	itemType: string;
	amount: number;
	currency: string;
	status: 'completed' | 'pending' | 'failed' | 'refunded';
	platform: 'ios' | 'android' | 'web';
	date: string;
	transactionId: string;
	productId: string;
	quantity: number;
	originalTransactionId: string;
}

const InAppPurchaseTracking: FC = () => {
	const { darkModeStatus } = useDarkMode();
	const [purchases, setPurchases] = useState<PurchaseData[]>([]);
	const [filteredPurchases, setFilteredPurchases] = useState<PurchaseData[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [filterStatus, setFilterStatus] = useState('');
	const [filterPlatform, setFilterPlatform] = useState('');
	const [filterDateRange, setFilterDateRange] = useState('');
	const [selectedPurchases, setSelectedPurchases] = useState<string[]>([]);
	const [selectAll, setSelectAll] = useState(false);

	// Sample data
	useEffect(() => {
		const samplePurchases: PurchaseData[] = [
			{
				id: '1',
				userId: 'user1',
				userName: 'John Doe',
				userAvatar: '',
				itemName: 'Premium Subscription',
				itemType: 'subscription',
				amount: 9.99,
				currency: 'USD',
				status: 'completed',
				platform: 'ios',
				date: '2024-01-15T10:30:00Z',
				transactionId: 'TXN_001',
				productId: 'premium_monthly',
				quantity: 1,
				originalTransactionId: 'OTXN_001'
			},
			{
				id: '2',
				userId: 'user2',
				userName: 'Jane Smith',
				userAvatar: '',
				itemName: 'Super Likes Pack',
				itemType: 'consumable',
				amount: 4.99,
				currency: 'USD',
				status: 'completed',
				platform: 'android',
				date: '2024-01-14T15:45:00Z',
				transactionId: 'TXN_002',
				productId: 'super_likes_10',
				quantity: 10,
				originalTransactionId: 'OTXN_002'
			},
			{
				id: '3',
				userId: 'user3',
				userName: 'Mike Johnson',
				userAvatar: '',
				itemName: 'Boost Profile',
				itemType: 'consumable',
				amount: 2.99,
				currency: 'USD',
				status: 'pending',
				platform: 'web',
				date: '2024-01-13T09:20:00Z',
				transactionId: 'TXN_003',
				productId: 'profile_boost',
				quantity: 1,
				originalTransactionId: 'OTXN_003'
			},
			{
				id: '4',
				userId: 'user4',
				userName: 'Sarah Wilson',
				userAvatar: '',
				itemName: 'Premium Subscription',
				itemType: 'subscription',
				amount: 19.99,
				currency: 'USD',
				status: 'refunded',
				platform: 'ios',
				date: '2024-01-12T14:15:00Z',
				transactionId: 'TXN_004',
				productId: 'premium_yearly',
				quantity: 1,
				originalTransactionId: 'OTXN_004'
			},
			{
				id: '5',
				userId: 'user5',
				userName: 'David Brown',
				userAvatar: '',
				itemName: 'Extra Swipes',
				itemType: 'consumable',
				amount: 1.99,
				currency: 'USD',
				status: 'failed',
				platform: 'android',
				date: '2024-01-11T11:30:00Z',
				transactionId: 'TXN_005',
				productId: 'extra_swipes_50',
				quantity: 50,
				originalTransactionId: 'OTXN_005'
			}
		];
		setPurchases(samplePurchases);
		setFilteredPurchases(samplePurchases);
	}, []);

	// Filter and search logic
	useEffect(() => {
		let filtered = purchases;

		// Search filter
		if (searchTerm) {
			filtered = filtered.filter(purchase =>
				purchase.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
				purchase.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
				purchase.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		// Status filter
		if (filterStatus) {
			filtered = filtered.filter(purchase => purchase.status === filterStatus);
		}

		// Platform filter
		if (filterPlatform) {
			filtered = filtered.filter(purchase => purchase.platform === filterPlatform);
		}

		setFilteredPurchases(filtered);
	}, [purchases, searchTerm, filterStatus, filterPlatform]);

	// Statistics calculations
	const totalRevenue = purchases
		.filter(p => p.status === 'completed')
		.reduce((sum, p) => sum + p.amount, 0);

	const totalPurchases = purchases.length;
	const completedPurchases = purchases.filter(p => p.status === 'completed').length;
	const pendingPurchases = purchases.filter(p => p.status === 'pending').length;
	const refundedPurchases = purchases.filter(p => p.status === 'refunded').length;

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'completed': return 'success';
			case 'pending': return 'warning';
			case 'failed': return 'danger';
			case 'refunded': return 'info';
			default: return 'secondary';
		}
	};

	const getPlatformIcon = (platform: string) => {
		switch (platform) {
			case 'ios': return 'PhoneIphone';
			case 'android': return 'Android';
			case 'web': return 'Web';
			default: return 'Devices';
		}
	};

	const handleSelectPurchase = (purchaseId: string) => {
		if (selectedPurchases.includes(purchaseId)) {
			setSelectedPurchases(selectedPurchases.filter(id => id !== purchaseId));
		} else {
			setSelectedPurchases([...selectedPurchases, purchaseId]);
		}
	};

	const handleSelectAll = () => {
		if (selectAll) {
			setSelectedPurchases([]);
		} else {
			setSelectedPurchases(filteredPurchases.map(p => p.id));
		}
		setSelectAll(!selectAll);
	};

	const handleBulkAction = (action: string) => {
		console.log(`Bulk ${action} for purchases:`, selectedPurchases);
		setSelectedPurchases([]);
		setSelectAll(false);
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	const formatCurrency = (amount: number, currency: string) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: currency
		}).format(amount);
	};

	return (
		<PageWrapper title={dashboardPagesMenu.financial_management.subMenu.in_app_purchase_tracking.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Icon icon='Money' size='2x' className='me-2' />
					<span className='h4 mb-0'>In-App Purchase Tracking</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Button
						color='primary'
						icon='Download'
						isLight
					>
						Export Data
					</Button>
					<SubheaderSeparator />
					<Button
						color='info'
						icon='Refresh'
						isLight
					>
						Refresh
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				{/* Statistics Cards */}
				<div className='row mb-4'>
					<div className='col-xl-3 col-md-6'>
						<Card>
							<CardBody>
								<div className='d-flex align-items-center'>
									<div className='flex-shrink-0'>
										<div className={`ratio ratio-1x1 rounded-2 bg-l25-${getColorNameWithIndex(0)} text-${getColorNameWithIndex(0)}`}
											style={{ width: '60px' }}>
											<div className='d-flex align-items-center justify-content-center'>
												<Icon icon='AttachMoney' size='lg' />
											</div>
										</div>
									</div>
									<div className='flex-grow-1 ms-3'>
										<div className='fw-bold fs-6'>Total Revenue</div>
										<div className='text-muted'>
											{formatCurrency(totalRevenue, 'USD')}
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-xl-3 col-md-6'>
						<Card>
							<CardBody>
								<div className='d-flex align-items-center'>
									<div className='flex-shrink-0'>
										<div className={`ratio ratio-1x1 rounded-2 bg-l25-${getColorNameWithIndex(1)} text-${getColorNameWithIndex(1)}`}
											style={{ width: '60px' }}>
											<div className='d-flex align-items-center justify-content-center'>
												<Icon icon='ShoppingCart' size='lg' />
											</div>
										</div>
									</div>
									<div className='flex-grow-1 ms-3'>
										<div className='fw-bold fs-6'>Total Purchases</div>
										<div className='text-muted'>{totalPurchases}</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-xl-3 col-md-6'>
						<Card>
							<CardBody>
								<div className='d-flex align-items-center'>
									<div className='flex-shrink-0'>
										<div className={`ratio ratio-1x1 rounded-2 bg-l25-${getColorNameWithIndex(2)} text-${getColorNameWithIndex(2)}`}
											style={{ width: '60px' }}>
											<div className='d-flex align-items-center justify-content-center'>
												<Icon icon='CheckCircle' size='lg' />
											</div>
										</div>
									</div>
									<div className='flex-grow-1 ms-3'>
										<div className='fw-bold fs-6'>Completed</div>
										<div className='text-muted'>{completedPurchases}</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-xl-3 col-md-6'>
						<Card>
							<CardBody>
								<div className='d-flex align-items-center'>
									<div className='flex-shrink-0'>
										<div className={`ratio ratio-1x1 rounded-2 bg-l25-${getColorNameWithIndex(3)} text-${getColorNameWithIndex(3)}`}
											style={{ width: '60px' }}>
											<div className='d-flex align-items-center justify-content-center'>
												<Icon icon='Pending' size='lg' />
											</div>
										</div>
									</div>
									<div className='flex-grow-1 ms-3'>
										<div className='fw-bold fs-6'>Pending</div>
										<div className='text-muted'>{pendingPurchases}</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>

				{/* Filters and Search */}
				<Card className='mb-4'>
					<CardHeader>
						<CardTitle>
							<Icon icon='FilterList' className='me-2' />
							Filters & Search
						</CardTitle>
					</CardHeader>
					<CardBody>
						<div className='row g-3'>
							<div className='col-md-4'>
								<FormGroup>
									<Label htmlFor='search'>Search</Label>
									<Input
										id='search'
										placeholder='Search by user, item, or transaction ID...'
										value={searchTerm}
										onChange={(e: any) => setSearchTerm(e.target.value)}
									/>
								</FormGroup>
							</div>
							<div className='col-md-2'>
								<FormGroup>
									<Label htmlFor='status'>Status</Label>
									<Select
										id='status'
										ariaLabel='Status'
										value={filterStatus}
										onChange={(e: any) => setFilterStatus(e.target.value)}
									>
										<option value=''>All Status</option>
										<option value='completed'>Completed</option>
										<option value='pending'>Pending</option>
										<option value='failed'>Failed</option>
										<option value='refunded'>Refunded</option>
									</Select>
								</FormGroup>
							</div>
							<div className='col-md-2'>
								<FormGroup>
									<Label htmlFor='platform'>Platform</Label>
									<Select
										id='platform'
										ariaLabel='Platform'
										value={filterPlatform}
										onChange={(e: any) => setFilterPlatform(e.target.value)}
									>
										<option value=''>All Platforms</option>
										<option value='ios'>iOS</option>
										<option value='android'>Android</option>
										<option value='web'>Web</option>
									</Select>
								</FormGroup>
							</div>
							<div className='col-md-2'>
								<FormGroup>
									<Label htmlFor='dateRange'>Date Range</Label>
									<Select
										id='dateRange'
										ariaLabel='Date Range'
										value={filterDateRange}
										onChange={(e: any) => setFilterDateRange(e.target.value)}
									>
										<option value=''>All Time</option>
										<option value='today'>Today</option>
										<option value='week'>This Week</option>
										<option value='month'>This Month</option>
										<option value='quarter'>This Quarter</option>
									</Select>
								</FormGroup>
							</div>
							<div className='col-md-2'>
								<FormGroup>
									<Label>&nbsp;</Label>
									<Button
										color='primary'
										className='w-100'
										onClick={() => {
											setSearchTerm('');
											setFilterStatus('');
											setFilterPlatform('');
											setFilterDateRange('');
										}}
									>
										Clear Filters
									</Button>
								</FormGroup>
							</div>
						</div>
					</CardBody>
				</Card>

				{/* Bulk Actions */}
				{selectedPurchases.length > 0 && (
					<Card className='mb-4'>
						<CardBody>
							<div className='d-flex align-items-center justify-content-between'>
								<div>
									<Badge color='primary' isLight>
										{selectedPurchases.length} purchases selected
									</Badge>
								</div>
								<div>
									<Dropdown>
										<DropdownToggle hasIcon={false}>
											<Button color='primary' isLight>
												Bulk Actions ({selectedPurchases.length})
											</Button>
										</DropdownToggle>
										<DropdownMenu isAlignmentEnd>
											<DropdownItem>
												<Button
													icon='Download'
													color='info'
													isLight
													onClick={() => handleBulkAction('export')}
												>
													Export Selected
												</Button>
											</DropdownItem>
											<DropdownItem>
												<Button
													icon='Refresh'
													color='warning'
													isLight
													onClick={() => handleBulkAction('refresh')}
												>
													Refresh Status
												</Button>
											</DropdownItem>
											<DropdownItem>
												<Button
													icon='Report'
													color='danger'
													isLight
													onClick={() => handleBulkAction('flag')}
												>
													Flag for Review
												</Button>
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>
								</div>
							</div>
						</CardBody>
					</Card>
				)}

				{/* Purchases Table */}
				<Card>
					<CardHeader>
						<CardTitle>
							<Icon icon='ShoppingCart' className='me-2' />
							Purchase History ({filteredPurchases.length} purchases)
						</CardTitle>
					</CardHeader>
					<CardBody>
						<div className='table-responsive'>
							<table className='table table-hover'>
								<thead>
									<tr>
										<th>
											<input
												type='checkbox'
												checked={selectAll}
												onChange={handleSelectAll}
												className='form-check-input'
											/>
										</th>
										<th>User</th>
										<th>Item</th>
										<th>Amount</th>
										<th>Status</th>
										<th>Platform</th>
										<th>Date</th>
										<th>Transaction ID</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{filteredPurchases.map((purchase) => (
										<tr key={purchase.id}>
											<td>
												<input
													type='checkbox'
													checked={selectedPurchases.includes(purchase.id)}
													onChange={() => handleSelectPurchase(purchase.id)}
													className='form-check-input'
												/>
											</td>
											<td>
												<div className='d-flex align-items-center'>
													<Avatar
														src={purchase.userAvatar}
														size={40}
														color={getColorNameWithIndex(0) as any}
													/>
													<div className='ms-2'>
														<div className='fw-bold'>{purchase.userName}</div>
														<small className='text-muted'>{purchase.userId}</small>
													</div>
												</div>
											</td>
											<td>
												<div>
													<div className='fw-bold'>{purchase.itemName}</div>
													<small className='text-muted'>
														{purchase.itemType} • Qty: {purchase.quantity}
													</small>
												</div>
											</td>
											<td>
												<div className='fw-bold'>
													{formatCurrency(purchase.amount, purchase.currency)}
												</div>
											</td>
											<td>
												<Badge color={getStatusColor(purchase.status) as any} isLight>
													{purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
												</Badge>
											</td>
											<td>
												<div className='d-flex align-items-center'>
													<Icon icon={getPlatformIcon(purchase.platform)} className='me-1' />
													<span className='text-capitalize'>{purchase.platform}</span>
												</div>
											</td>
											<td>
												<small>{formatDate(purchase.date)}</small>
											</td>
											<td>
												<code className='text-muted'>{purchase.transactionId}</code>
											</td>
											<td>
												<Dropdown>
													<DropdownToggle hasIcon={false}>
														<Button
															color='light'
															size='sm'
															icon='MoreVert'
															aria-label='More actions'
														/>
													</DropdownToggle>
													<DropdownMenu isAlignmentEnd>
														<DropdownItem>
															<Button
																icon='Visibility'
																color='info'
																isLight
																size='sm'
															>
																View Details
															</Button>
														</DropdownItem>
														<DropdownItem>
															<Button
																icon='Refresh'
																color='warning'
																isLight
																size='sm'
															>
																Refresh Status
															</Button>
														</DropdownItem>
														<DropdownItem>
															<Button
																icon='Report'
																color='danger'
																isLight
																size='sm'
															>
																Flag Issue
															</Button>
														</DropdownItem>
													</DropdownMenu>
												</Dropdown>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						
						{filteredPurchases.length === 0 && (
							<div className='text-center py-5'>
								<Icon icon='ShoppingCart' size='3x' className='text-muted mb-3' />
								<h5 className='text-muted'>No purchases found</h5>
								<p className='text-muted'>Try adjusting your search criteria or filters.</p>
							</div>
						)}
					</CardBody>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default InAppPurchaseTracking;
