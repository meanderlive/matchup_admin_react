import React, { FC, useState } from 'react';
import Card, { CardBody, CardHeader, CardTitle } from '../../../components/bootstrap/Card';
import Badge from '../../../components/bootstrap/Badge';
import Button from '../../../components/bootstrap/Button';
import Avatar from '../../../components/Avatar';
import Icon from '../../../components/icon/Icon';
import { getColorNameWithIndex } from '../../../helpers/helpers';

interface UserProfileOverviewProps {
	userData: any;
	onClose: () => void;
}

const UserProfileOverview: FC<UserProfileOverviewProps> = ({ userData, onClose }) => {
	const [activeTab, setActiveTab] = useState('personal');

	const renderPersonalInformation = () => (
		<div className='row'>
			<div className='col-md-6 mb-4'>
				<Card>
					<CardHeader>
						<CardTitle>
							<Icon icon='Person' className='me-2' />
							Basic Information
						</CardTitle>
					</CardHeader>
					<CardBody>
						<div className='d-flex align-items-center mb-3'>
							<Avatar
								src={userData?.mainAvatar || ''}
								size={80}
								color={getColorNameWithIndex(0) as any}
							/>
							<div className='ms-3'>
								<h5>{userData?.name}</h5>
								<Badge color='primary' isLight>
									{userData?.profileType || 'Free'}
								</Badge>
							</div>
						</div>
						<div className='row g-3'>
							<div className='col-6'>
								<small className='text-muted'>Username</small>
								<p className='mb-0'>{userData?.username || 'N/A'}</p>
							</div>
							<div className='col-6'>
								<small className='text-muted'>Gender</small>
								<p className='mb-0'>{userData?.iAm || 'N/A'}</p>
							</div>
							<div className='col-6'>
								<small className='text-muted'>Age</small>
								<p className='mb-0'>{userData?.age || 'N/A'}</p>
							</div>
							<div className='col-6'>
								<small className='text-muted'>Looking For</small>
								<p className='mb-0'>{userData?.looking || 'N/A'}</p>
							</div>
							<div className='col-6'>
								<small className='text-muted'>Sexual Orientation</small>
								<p className='mb-0'>{userData?.orientation || 'N/A'}</p>
							</div>
							<div className='col-6'>
								<small className='text-muted'>Marital Status</small>
								<p className='mb-0'>{userData?.marital || 'N/A'}</p>
							</div>
							<div className='col-12'>
								<small className='text-muted'>Email Address</small>
								<p className='mb-0'>{userData?.email || 'N/A'}</p>
							</div>
							<div className='col-12'>
								<small className='text-muted'>Contact Number</small>
								<p className='mb-0'>{userData?.phoneNumber || 'N/A'}</p>
							</div>
						</div>
					</CardBody>
				</Card>
			</div>
			<div className='col-md-6 mb-4'>
				<Card>
					<CardHeader>
						<CardTitle>
							<Icon icon='Pets' className='me-2' />
							Pet Information
						</CardTitle>
					</CardHeader>
					<CardBody>
						{userData?.petInfo ? (
							<div>
								<div className='row g-3'>
									<div className='col-6'>
										<small className='text-muted'>Pet Name</small>
										<p className='mb-0'>{userData.petInfo.name || 'N/A'}</p>
									</div>
									<div className='col-6'>
										<small className='text-muted'>Pet Type/Breed</small>
										<p className='mb-0'>{userData.petInfo.breed || 'N/A'}</p>
									</div>
									<div className='col-6'>
										<small className='text-muted'>Pet Age</small>
										<p className='mb-0'>{userData.petInfo.age || 'N/A'}</p>
									</div>
									<div className='col-6'>
										<small className='text-muted'>Pet Owner Info</small>
										<p className='mb-0'>{userData.petInfo.ownerName || 'N/A'}</p>
									</div>
								</div>
							</div>
						) : (
							<p className='text-muted'>No pet information available</p>
						)}
					</CardBody>
				</Card>
			</div>
		</div>
	);

	const renderProfileDetails = () => (
		<div className='row'>
			<div className='col-md-6 mb-4'>
				<Card>
					<CardHeader>
						<CardTitle>
							<Icon icon='PhotoCamera' className='me-2' />
							Profile Photos
						</CardTitle>
					</CardHeader>
					<CardBody>
						<div className='row g-2'>
							{userData?.photos?.map((photo: any, index: number) => (
								<div key={index} className='col-4'>
									<img
										src={photo}
										alt={`Photo ${index + 1}`}
										className='img-fluid rounded'
										style={{ height: '80px', objectFit: 'cover' }}
									/>
								</div>
							)) || <p className='text-muted'>No photos available</p>}
						</div>
					</CardBody>
				</Card>
			</div>
			<div className='col-md-6 mb-4'>
				<Card>
					<CardHeader>
						<CardTitle>
							<Icon icon='Description' className='me-2' />
							Bio & Interests
						</CardTitle>
					</CardHeader>
					<CardBody>
						<div className='mb-3'>
							<small className='text-muted'>Bio Description</small>
							<p className='mb-0'>{userData?.bio || 'No bio available'}</p>
						</div>
						<div className='mb-3'>
							<small className='text-muted'>Interests/Hobbies</small>
							<div className='d-flex flex-wrap gap-1'>
								{userData?.interests?.map((interest: string, index: number) => (
									<Badge key={index} color='primary' isLight>
										{interest}
									</Badge>
								)) || <span className='text-muted'>No interests listed</span>}
							</div>
						</div>
						<div className='mb-3'>
							<small className='text-muted'>Location</small>
							<p className='mb-0'>{userData?.address || 'N/A'}</p>
						</div>
						<div>
							<small className='text-muted'>Badges</small>
							<div className='d-flex flex-wrap gap-1'>
								{userData?.badges?.map((badge: string, index: number) => (
									<Badge key={index} color='success' isLight>
										{badge}
									</Badge>
								)) || <span className='text-muted'>No badges earned</span>}
							</div>
						</div>
					</CardBody>
				</Card>
			</div>
		</div>
	);

	const renderAccountInformation = () => (
		<div className='row'>
			<div className='col-md-6 mb-4'>
				<Card>
					<CardHeader>
						<CardTitle>
							<Icon icon='AccountCircle' className='me-2' />
							Account Details
						</CardTitle>
					</CardHeader>
					<CardBody>
						<div className='row g-3'>
							<div className='col-12'>
								<small className='text-muted'>User ID</small>
								<p className='mb-0'>{userData?._id || 'N/A'}</p>
							</div>
							<div className='col-12'>
								<small className='text-muted'>Account Creation Date</small>
								<p className='mb-0'>{userData?.createdAt || 'N/A'}</p>
							</div>
							<div className='col-12'>
								<small className='text-muted'>Account Status</small>
								<Badge 
									color={userData?.status === 'active' ? 'success' : 'danger'} 
									isLight
								>
									{userData?.status || 'N/A'}
								</Badge>
							</div>
							<div className='col-12'>
								<small className='text-muted'>Verification Status</small>
								<div className='d-flex gap-2'>
									<Badge color={userData?.emailVerified ? 'success' : 'warning'} isLight>
										Email {userData?.emailVerified ? 'Verified' : 'Not Verified'}
									</Badge>
									<Badge color={userData?.phoneVerified ? 'success' : 'warning'} isLight>
										Phone {userData?.phoneVerified ? 'Verified' : 'Not Verified'}
									</Badge>
									<Badge color={userData?.photoVerified ? 'success' : 'warning'} isLight>
										Photo {userData?.photoVerified ? 'Verified' : 'Not Verified'}
									</Badge>
								</div>
							</div>
							<div className='col-12'>
								<Button color='info' size='sm'>
									View Compatibility Quiz Details
								</Button>
							</div>
						</div>
					</CardBody>
				</Card>
			</div>
			<div className='col-md-6 mb-4'>
				<Card>
					<CardHeader>
						<CardTitle>
							<Icon icon='Timeline' className='me-2' />
							Activity & Engagement
						</CardTitle>
					</CardHeader>
					<CardBody>
						<div className='row g-3'>
							<div className='col-12'>
								<small className='text-muted'>Last Login Date</small>
								<p className='mb-0'>{userData?.lastLogin || 'N/A'}</p>
							</div>
							<div className='col-6'>
								<small className='text-muted'>Total Matches</small>
								<p className='mb-0'>{userData?.totalMatches || 0}</p>
							</div>
							<div className='col-6'>
								<small className='text-muted'>Messages Sent</small>
								<p className='mb-0'>{userData?.messagesSent || 0}</p>
							</div>
							<div className='col-6'>
								<small className='text-muted'>Messages Received</small>
								<p className='mb-0'>{userData?.messagesReceived || 0}</p>
							</div>
							<div className='col-6'>
								<small className='text-muted'>Profile Visits</small>
								<p className='mb-0'>{userData?.profileVisits || 0}</p>
							</div>
							<div className='col-6'>
								<small className='text-muted'>Likes Given</small>
								<p className='mb-0'>{userData?.likesGiven || 0}</p>
							</div>
							<div className='col-6'>
								<small className='text-muted'>Likes Received</small>
								<p className='mb-0'>{userData?.likesReceived || 0}</p>
							</div>
							<div className='col-6'>
								<small className='text-muted'>Rewind Actions</small>
								<p className='mb-0'>{userData?.rewindActions || 0}</p>
							</div>
							<div className='col-6'>
								<small className='text-muted'>Undo Actions</small>
								<p className='mb-0'>{userData?.undoActions || 0}</p>
							</div>
							<div className='col-6'>
								<small className='text-muted'>Booked Events</small>
								<p className='mb-0'>{userData?.bookedEvents || 0}</p>
							</div>
							<div className='col-6'>
								<small className='text-muted'>Connections</small>
								<p className='mb-0'>{userData?.connections || 0}</p>
							</div>
						</div>
					</CardBody>
				</Card>
			</div>
		</div>
	);

	const renderSubscriptionFinancials = () => (
		<div className='row'>
			<div className='col-md-6 mb-4'>
				<Card>
					<CardHeader>
						<CardTitle>
							<Icon icon='Star' className='me-2' />
							Subscription Details
						</CardTitle>
					</CardHeader>
					<CardBody>
						<div className='row g-3'>
							<div className='col-12'>
								<small className='text-muted'>Current Subscription Plan</small>
								<Badge color='warning' isLight>
									{userData?.subscriptionPlan || 'Free'}
								</Badge>
							</div>
							<div className='col-12'>
								<small className='text-muted'>Subscription Start Date</small>
								<p className='mb-0'>{userData?.subscriptionStartDate || 'N/A'}</p>
							</div>
							<div className='col-12'>
								<small className='text-muted'>Subscription End Date</small>
								<p className='mb-0'>{userData?.subscriptionEndDate || 'N/A'}</p>
							</div>
							<div className='col-12'>
								<small className='text-muted'>Auto Renewal</small>
								<Badge color={userData?.autoRenewal ? 'success' : 'danger'} isLight>
									{userData?.autoRenewal ? 'Enabled' : 'Disabled'}
								</Badge>
							</div>
						</div>
					</CardBody>
				</Card>
			</div>
			<div className='col-md-6 mb-4'>
				<Card>
					<CardHeader>
						<CardTitle>
							<Icon icon='Payment' className='me-2' />
							Payment & Billing
						</CardTitle>
					</CardHeader>
					<CardBody>
						<div className='row g-3'>
							<div className='col-12'>
								<small className='text-muted'>Total Spent</small>
								<p className='mb-0'>${userData?.totalSpent || 0}</p>
							</div>
							<div className='col-12'>
								<small className='text-muted'>Last Payment Date</small>
								<p className='mb-0'>{userData?.lastPaymentDate || 'N/A'}</p>
							</div>
							<div className='col-12'>
								<small className='text-muted'>Payment Method</small>
								<p className='mb-0'>{userData?.paymentMethod || 'N/A'}</p>
							</div>
							<div className='col-12'>
								<small className='text-muted'>In-App Purchases</small>
								<p className='mb-0'>{userData?.inAppPurchases || 0} purchases</p>
							</div>
							<div className='col-12'>
								<Button color='info' size='sm'>
									View Payment History
								</Button>
							</div>
						</div>
					</CardBody>
				</Card>
			</div>
		</div>
	);

	const renderUserInteraction = () => (
		<div className='row'>
			<div className='col-md-6 mb-4'>
				<Card>
					<CardHeader>
						<CardTitle>
							<Icon icon='Chat' className='me-2' />
							Matches & Chat Monitoring
						</CardTitle>
					</CardHeader>
					<CardBody>
						<div className='row g-3'>
							<div className='col-12'>
								<small className='text-muted'>Active Matches</small>
								<p className='mb-0'>{userData?.activeMatches || 0}</p>
							</div>
							<div className='col-12'>
								<small className='text-muted'>Total Chat Conversations</small>
								<p className='mb-0'>{userData?.chatConversations || 0}</p>
							</div>
							<div className='col-12'>
								<small className='text-muted'>Average Response Time</small>
								<p className='mb-0'>{userData?.avgResponseTime || 'N/A'}</p>
							</div>
							<div className='col-12'>
								<Button color='primary' size='sm'>
									View All Matches
								</Button>
							</div>
							<div className='col-12'>
								<Button color='info' size='sm'>
									Monitor Chat Logs
								</Button>
							</div>
						</div>
					</CardBody>
				</Card>
			</div>
			<div className='col-md-6 mb-4'>
				<Card>
					<CardHeader>
						<CardTitle>
							<Icon icon='Report' className='me-2' />
							Reports & Feedback
						</CardTitle>
					</CardHeader>
					<CardBody>
						<div className='row g-3'>
							<div className='col-12'>
								<small className='text-muted'>Reports Against User</small>
								<Badge color='danger' isLight>
									{userData?.reportsAgainst || 0}
								</Badge>
							</div>
							<div className='col-12'>
								<small className='text-muted'>Reports By User</small>
								<p className='mb-0'>{userData?.reportsByUser || 0}</p>
							</div>
							<div className='col-12'>
								<small className='text-muted'>Feedback Score</small>
								<p className='mb-0'>{userData?.feedbackScore || 'N/A'}</p>
							</div>
							<div className='col-12'>
								<Button color='warning' size='sm'>
									View All Reports
								</Button>
							</div>
							<div className='col-12'>
								<Button color='secondary' size='sm'>
									View Feedback
								</Button>
							</div>
						</div>
					</CardBody>
				</Card>
			</div>
		</div>
	);

	const renderSecuritySafety = () => (
		<div className='row'>
			<div className='col-md-6 mb-4'>
				<Card>
					<CardHeader>
						<CardTitle>
							<Icon icon='Security' className='me-2' />
							Privacy Settings
						</CardTitle>
					</CardHeader>
					<CardBody>
						<div className='row g-3'>
							<div className='col-12'>
								<small className='text-muted'>Profile Visibility</small>
								<Badge color='info' isLight>
									{userData?.profileVisibility || 'Public'}
								</Badge>
							</div>
							<div className='col-12'>
								<small className='text-muted'>Photo Sharing Permissions</small>
								<p className='mb-0'>{userData?.photoSharing || 'All Users'}</p>
							</div>
							<div className='col-12'>
								<small className='text-muted'>Blocked Users</small>
								<p className='mb-0'>{userData?.blockedUsers || 0} users blocked</p>
							</div>
							<div className='col-12'>
								<small className='text-muted'>Location Sharing</small>
								<Badge color={userData?.locationSharing ? 'success' : 'danger'} isLight>
									{userData?.locationSharing ? 'Enabled' : 'Disabled'}
								</Badge>
							</div>
						</div>
					</CardBody>
				</Card>
			</div>
			<div className='col-md-6 mb-4'>
				<Card>
					<CardHeader>
						<CardTitle>
							<Icon icon='Warning' className='me-2' />
							Safety & Security
						</CardTitle>
					</CardHeader>
					<CardBody>
						<div className='row g-3'>
							<div className='col-12'>
								<small className='text-muted'>Reported Issues</small>
								<Badge color='danger' isLight>
									{userData?.reportedIssues || 0}
								</Badge>
							</div>
							<div className='col-12'>
								<small className='text-muted'>Account Flags</small>
								<Badge color='warning' isLight>
									{userData?.accountFlags || 0}
								</Badge>
							</div>
							<div className='col-12'>
								<small className='text-muted'>Security Score</small>
								<p className='mb-0'>{userData?.securityScore || 'N/A'}</p>
							</div>
							<div className='col-12'>
								<Button color='primary' size='sm'>
									Connect with User
								</Button>
							</div>
							<div className='col-12'>
								<Button color='info' size='sm'>
									View Activity Overview
								</Button>
							</div>
						</div>
					</CardBody>
				</Card>
			</div>
		</div>
	);

	const tabs = [
		{ id: 'personal', label: 'Personal Information', icon: 'Person' },
		{ id: 'profile', label: 'Profile Details', icon: 'PhotoCamera' },
		{ id: 'account', label: 'Account Information', icon: 'AccountCircle' },
		{ id: 'subscription', label: 'Subscription & Financials', icon: 'Star' },
		{ id: 'interaction', label: 'User Interaction', icon: 'Chat' },
		{ id: 'security', label: 'Security & Safety', icon: 'Security' }
	];

	const renderTabContent = () => {
		switch (activeTab) {
			case 'personal':
				return renderPersonalInformation();
			case 'profile':
				return renderProfileDetails();
			case 'account':
				return renderAccountInformation();
			case 'subscription':
				return renderSubscriptionFinancials();
			case 'interaction':
				return renderUserInteraction();
			case 'security':
				return renderSecuritySafety();
			default:
				return renderPersonalInformation();
		}
	};

	return (
		<div className='modal show d-block' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
			<div className='modal-dialog modal-xl'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title'>
							<Icon icon='Person' className='me-2' />
							User Profile Overview - {userData?.name}
						</h5>
						<Button color='secondary' onClick={onClose}>
							<Icon icon='Close' />
						</Button>
					</div>
					<div className='modal-body'>
						{/* Tab Navigation */}
						<div className='nav nav-tabs mb-4' role='tablist'>
							{tabs.map((tab) => (
								<button
									key={tab.id}
									className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
									onClick={() => setActiveTab(tab.id)}
									type='button'
								>
									<Icon icon={tab.icon} className='me-2' />
									{tab.label}
								</button>
							))}
						</div>

						{/* Tab Content */}
						<div className='tab-content'>
							{renderTabContent()}
						</div>
					</div>
					<div className='modal-footer'>
						<Button color='secondary' onClick={onClose}>
							Close
						</Button>
						<Button color='primary'>
							Export User Data
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserProfileOverview;
