import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Card, { CardBody, CardHeader, CardTitle } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Label from '../../../components/bootstrap/forms/Label';
import Modal, { ModalBody, ModalHeader, ModalFooter, ModalTitle } from '../../../components/bootstrap/Modal';
import Badge from '../../../components/bootstrap/Badge';
import Avatar from '../../../components/Avatar';
import useDarkMode from '../../../hooks/useDarkMode';
import { getColorNameWithIndex } from '../../../helpers/helpers';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import SecuritySettings from './SecuritySettings';

const AdminProfile = () => {
	const { darkModeStatus } = useDarkMode();
	const [adminData, setAdminData] = useState({
		id: 1,
		name: 'Admin User',
		email: 'admin@matchup.com',
		phone: '+1 234 567 8900',
		role: 'Super Admin',
		department: 'IT Management',
		joinDate: '2024-01-01',
		lastLogin: '2024-01-15 14:30:00',
		status: 'active',
		permissions: ['user_management', 'content_moderation', 'system_settings', 'reports'],
		avatar: null,
		timezone: 'UTC-5',
		language: 'English',
		twoFactorEnabled: true,
		notifications: {
			email: true,
			sms: false,
			push: true
		}
	});

	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
	const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
	const [avatarFile, setAvatarFile] = useState<File | null>(null);

	const roleColors = {
		'Super Admin': 'danger',
		'Admin': 'warning',
		'Moderator': 'info',
		'Support': 'success'
	};

	const getRoleColor = (role: string) => {
		return roleColors[role as keyof typeof roleColors] || 'secondary';
	};

	const handleAvatarChange = (e: any) => {
		const file = e.target.files[0];
		if (file) {
			setAvatarFile(file);
		}
	};

	const toggleNotification = (type: string) => {
		setAdminData(prev => ({
			...prev,
			notifications: {
				...prev.notifications,
				[type]: !prev.notifications[type as keyof typeof prev.notifications]
			}
		}));
	};

	const toggleTwoFactor = () => {
		setAdminData(prev => ({
			...prev,
			twoFactorEnabled: !prev.twoFactorEnabled
		}));
	};

	return (
		<PageWrapper title='Admin Profile'>
			<SubHeader>
				<SubHeaderLeft>
					<span className='h4 mb-0 fw-bold'>Admin Profile</span>
					<SubheaderSeparator />
					<span className='text-muted'>Manage your admin profile and account settings</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Button
						color='primary'
						icon='Edit'
						onClick={() => setIsEditModalOpen(true)}>
						Edit Profile
					</Button>
				</SubHeaderRight>
			</SubHeader>

			<Page>
				<div className='row'>
					{/* Profile Overview */}
					<div className='col-lg-4 mb-4'>
						<Card stretch>
							<CardHeader>
								<CardTitle>Profile Overview</CardTitle>
							</CardHeader>
							<CardBody>
								<div className='text-center mb-4'>
									<div className='position-relative d-inline-block'>
										{avatarFile ? (
											<img
												src={URL.createObjectURL(avatarFile)}
												alt='Admin Avatar'
												className='rounded-circle'
												style={{ width: '120px', height: '120px', objectFit: 'cover' }}
											/>
										) : (
											<Avatar
												src={adminData.avatar || ''}
												size={120}
												color={getColorNameWithIndex(0) as any}
											/>
										)}
										<Button
											color='primary'
											size='sm'
											className='position-absolute bottom-0 end-0 rounded-circle'
											style={{ width: '32px', height: '32px' }}
											onClick={() => document.getElementById('avatarInput')?.click()}>
											<Icon icon='CameraAlt' size='sm' />
										</Button>
										<input
											type='file'
											id='avatarInput'
											accept='image/*'
											style={{ display: 'none' }}
											onChange={handleAvatarChange}
										/>
									</div>
									<h4 className='mt-3 mb-1'>{adminData.name}</h4>
									<Badge color={getRoleColor(adminData.role) as any} isLight>
										{adminData.role}
									</Badge>
									<p className='text-muted mt-2'>{adminData.department}</p>
								</div>

								<div className='d-grid gap-2'>
									<Button
										color='primary'
										icon='Edit'
										onClick={() => setIsEditModalOpen(true)}>
										Edit Profile
									</Button>
									<Button
										color='warning'
										icon='Lock'
										onClick={() => setIsPasswordModalOpen(true)}>
										Change Password
									</Button>
									<Button
										color='info'
										icon='Security'
										onClick={() => setIsSecurityModalOpen(true)}>
										Security Settings
									</Button>
								</div>
							</CardBody>
						</Card>
					</div>

					{/* Profile Details */}
					<div className='col-lg-8 mb-4'>
						<div className='row'>
							<div className='col-md-6 mb-4'>
								<Card>
									<CardHeader>
										<CardTitle>Personal Information</CardTitle>
									</CardHeader>
									<CardBody>
										<div className='row g-3'>
											<div className='col-12'>
												<Label className='form-label'>Full Name</Label>
												<div className='fw-bold'>{adminData.name}</div>
											</div>
											<div className='col-12'>
												<Label className='form-label'>Email Address</Label>
												<div className='fw-bold'>{adminData.email}</div>
											</div>
											<div className='col-12'>
												<Label className='form-label'>Phone Number</Label>
												<div className='fw-bold'>{adminData.phone}</div>
											</div>
											<div className='col-12'>
												<Label className='form-label'>Timezone</Label>
												<div className='fw-bold'>{adminData.timezone}</div>
											</div>
											<div className='col-12'>
												<Label className='form-label'>Language</Label>
												<div className='fw-bold'>{adminData.language}</div>
											</div>
										</div>
									</CardBody>
								</Card>
							</div>

							<div className='col-md-6 mb-4'>
								<Card>
									<CardHeader>
										<CardTitle>Account Information</CardTitle>
									</CardHeader>
									<CardBody>
										<div className='row g-3'>
											<div className='col-12'>
												<Label className='form-label'>Role</Label>
												<div>
													<Badge color={getRoleColor(adminData.role) as any} isLight>
														{adminData.role}
													</Badge>
												</div>
											</div>
											<div className='col-12'>
												<Label className='form-label'>Join Date</Label>
												<div className='fw-bold'>{adminData.joinDate}</div>
											</div>
											<div className='col-12'>
												<Label className='form-label'>Last Login</Label>
												<div className='fw-bold'>{adminData.lastLogin}</div>
											</div>
											<div className='col-12'>
												<Label className='form-label'>Status</Label>
												<div>
													<Badge color={adminData.status === 'active' ? 'success' : 'secondary'} isLight>
														{adminData.status === 'active' ? 'Active' : 'Inactive'}
													</Badge>
												</div>
											</div>
											<div className='col-12'>
												<Label className='form-label'>Two-Factor Authentication</Label>
												<div>
													<Badge color={adminData.twoFactorEnabled ? 'success' : 'warning'} isLight>
														{adminData.twoFactorEnabled ? 'Enabled' : 'Disabled'}
													</Badge>
												</div>
											</div>
										</div>
									</CardBody>
								</Card>
							</div>
						</div>

						{/* Permissions */}
						<div className='row'>
							<div className='col-12 mb-4'>
								<Card>
									<CardHeader>
										<CardTitle>Permissions</CardTitle>
									</CardHeader>
									<CardBody>
										<div className='row'>
											{adminData.permissions.map((permission, index) => (
												<div key={index} className='col-md-6 mb-2'>
													<Badge color={getColorNameWithIndex(index) as any} isLight>
														<Icon icon='CheckCircle' size='sm' className='me-1' />
														{permission.replace('_', ' ').toUpperCase()}
													</Badge>
												</div>
											))}
										</div>
									</CardBody>
								</Card>
							</div>
						</div>

						{/* Notifications */}
						<div className='row'>
							<div className='col-12'>
								<Card>
									<CardHeader>
										<CardTitle>Notification Preferences</CardTitle>
									</CardHeader>
									<CardBody>
										<div className='row'>
											<div className='col-md-4 mb-3'>
												<div className='form-check form-switch'>
													<input
														className='form-check-input'
														type='checkbox'
														id='emailNotifications'
														checked={adminData.notifications.email}
														onChange={() => toggleNotification('email')}
													/>
													<Label className='form-check-label' htmlFor='emailNotifications'>
														Email Notifications
													</Label>
												</div>
											</div>
											<div className='col-md-4 mb-3'>
												<div className='form-check form-switch'>
													<input
														className='form-check-input'
														type='checkbox'
														id='smsNotifications'
														checked={adminData.notifications.sms}
														onChange={() => toggleNotification('sms')}
													/>
													<Label className='form-check-label' htmlFor='smsNotifications'>
														SMS Notifications
													</Label>
												</div>
											</div>
											<div className='col-md-4 mb-3'>
												<div className='form-check form-switch'>
													<input
														className='form-check-input'
														type='checkbox'
														id='pushNotifications'
														checked={adminData.notifications.push}
														onChange={() => toggleNotification('push')}
													/>
													<Label className='form-check-label' htmlFor='pushNotifications'>
														Push Notifications
													</Label>
												</div>
											</div>
										</div>
									</CardBody>
								</Card>
							</div>
						</div>
					</div>
				</div>
			</Page>

			{/* Edit Profile Modal */}
			<EditProfile 
				isOpen={isEditModalOpen}
				setIsOpen={setIsEditModalOpen}
				adminData={adminData}
				setAdminData={setAdminData}
			/>

			{/* Change Password Modal */}
			<ChangePassword 
				isOpen={isPasswordModalOpen}
				setIsOpen={setIsPasswordModalOpen}
			/>

			{/* Security Settings Modal */}
			<SecuritySettings 
				isOpen={isSecurityModalOpen}
				setIsOpen={setIsSecurityModalOpen}
				adminData={adminData}
				setAdminData={setAdminData}
			/>
		</PageWrapper>
	);
};

export default AdminProfile;