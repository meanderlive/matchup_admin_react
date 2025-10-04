import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal, { ModalBody, ModalHeader, ModalFooter, ModalTitle } from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Label from '../../../components/bootstrap/forms/Label';
import Button from '../../../components/bootstrap/Button';
import Badge from '../../../components/bootstrap/Badge';
import Icon from '../../../components/icon/Icon';
import Card, { CardBody } from '../../../components/bootstrap/Card';

interface SecuritySettingsProps {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	adminData: any;
	setAdminData: (data: any) => void;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ isOpen, setIsOpen, adminData, setAdminData }) => {
	const [twoFactorCode, setTwoFactorCode] = React.useState('');

	const validationSchema = Yup.object({
		twoFactorCode: Yup.string(),
		sessionTimeout: Yup.string(),
		loginNotifications: Yup.boolean(),
		suspiciousActivity: Yup.boolean()
	});

	const formik = useFormik({
		initialValues: {
			twoFactorCode: '',
			sessionTimeout: '30',
			loginNotifications: true,
			suspiciousActivity: true
		},
		validationSchema,
		onSubmit: (values, { resetForm }) => {
			setAdminData((prev: any) => ({
				...prev,
				twoFactorEnabled: !prev.twoFactorEnabled
			}));
			alert(`Two-Factor Authentication ${adminData.twoFactorEnabled ? 'disabled' : 'enabled'} successfully!`);
			setIsOpen(false);
			resetForm();
		}
	});

	const toggleTwoFactor = () => {
		if (!adminData.twoFactorEnabled) {
			// Enable 2FA
			setAdminData((prev: any) => ({
				...prev,
				twoFactorEnabled: true
			}));
			alert('Two-Factor Authentication enabled successfully!');
		} else {
			// Disable 2FA - show confirmation
			if (confirm('Are you sure you want to disable Two-Factor Authentication? This will reduce your account security.')) {
				setAdminData((prev: any) => ({
					...prev,
					twoFactorEnabled: false
				}));
				alert('Two-Factor Authentication disabled successfully!');
			}
		}
		setIsOpen(false);
	};

	const recentLogins = [
		{
			id: 1,
			location: 'New York, USA',
			device: 'Chrome on Windows',
			ip: '192.168.1.100',
			time: '2024-01-15 14:30:00',
			status: 'success'
		},
		{
			id: 2,
			location: 'Los Angeles, USA',
			device: 'Safari on iPhone',
			ip: '192.168.1.101',
			time: '2024-01-14 09:15:00',
			status: 'success'
		},
		{
			id: 3,
			location: 'Unknown Location',
			device: 'Firefox on Linux',
			ip: '203.0.113.42',
			time: '2024-01-13 22:45:00',
			status: 'failed'
		}
	];

	const securityFeatures = [
		{
			name: 'Two-Factor Authentication',
			description: 'Add an extra layer of security to your account',
			enabled: adminData.twoFactorEnabled,
			onToggle: toggleTwoFactor,
			icon: 'Security',
			color: 'primary'
		},
		{
			name: 'Login Notifications',
			description: 'Get notified when someone logs into your account',
			enabled: formik.values.loginNotifications,
			onToggle: () => formik.setFieldValue('loginNotifications', !formik.values.loginNotifications),
			icon: 'Notifications',
			color: 'info'
		},
		{
			name: 'Suspicious Activity Alerts',
			description: 'Receive alerts for unusual account activity',
			enabled: formik.values.suspiciousActivity,
			onToggle: () => formik.setFieldValue('suspiciousActivity', !formik.values.suspiciousActivity),
			icon: 'Warning',
			color: 'warning'
		}
	];

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg'>
			<ModalHeader>
				<ModalTitle id='security-settings-modal'>Security Settings</ModalTitle>
			</ModalHeader>
			<ModalBody>
				{/* Security Features */}
				<div className='mb-4'>
					<h5 className='mb-3'>Security Features</h5>
					<div className='row'>
						{securityFeatures.map((feature, index) => (
							<div key={index} className='col-md-4 mb-3'>
								<Card>
									<CardBody className='text-center'>
										<div className={`ratio ratio-1x1 rounded-2 bg-l25-${feature.color} text-${feature.color} mx-auto mb-3`}
											style={{ width: '60px' }}>
											<div className='d-flex align-items-center justify-content-center'>
												<Icon icon={feature.icon} />
											</div>
										</div>
										<h6 className='fw-bold'>{feature.name}</h6>
										<p className='text-muted small mb-3'>{feature.description}</p>
										<Badge color={feature.enabled ? 'success' : 'secondary'} isLight>
											{feature.enabled ? 'Enabled' : 'Disabled'}
										</Badge>
										<div className='mt-3'>
											<Button
												color={feature.enabled ? 'warning' : 'success'}
												size='sm'
												onClick={feature.onToggle}>
												{feature.enabled ? 'Disable' : 'Enable'}
											</Button>
										</div>
									</CardBody>
								</Card>
							</div>
						))}
					</div>
				</div>

				{/* Session Management */}
				<div className='mb-4'>
					<h5 className='mb-3'>Session Management</h5>
					<FormGroup>
						<Label htmlFor='sessionTimeout'>Session Timeout (minutes)</Label>
						<select
							id='sessionTimeout'
							name='sessionTimeout'
							className='form-select'
							value={formik.values.sessionTimeout}
							onChange={formik.handleChange}
						>
							<option value='15'>15 minutes</option>
							<option value='30'>30 minutes</option>
							<option value='60'>1 hour</option>
							<option value='120'>2 hours</option>
							<option value='480'>8 hours</option>
						</select>
					</FormGroup>
					<Button color='danger' size='sm' icon='ExitToApp'>
						End All Sessions
					</Button>
				</div>

				{/* Recent Logins */}
				<div className='mb-4'>
					<h5 className='mb-3'>Recent Login Activity</h5>
					<div className='table-responsive'>
						<table className='table table-modern table-hover'>
							<thead>
								<tr>
									<th>Location</th>
									<th>Device</th>
									<th>IP Address</th>
									<th>Time</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								{recentLogins.map((login) => (
									<tr key={login.id}>
										<td>{login.location}</td>
										<td>{login.device}</td>
										<td>
											<code>{login.ip}</code>
										</td>
										<td>{login.time}</td>
										<td>
											<Badge color={login.status === 'success' ? 'success' : 'danger'} isLight>
												{login.status === 'success' ? 'Success' : 'Failed'}
											</Badge>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* Security Tips */}
				<div className='alert alert-warning'>
					<h6 className='alert-heading'>
						<Icon icon='Security' className='me-2' />
						Security Tips
					</h6>
					<ul className='mb-0'>
						<li>Use a strong, unique password</li>
						<li>Enable Two-Factor Authentication</li>
						<li>Log out from shared devices</li>
						<li>Review login activity regularly</li>
						<li>Keep your browser updated</li>
					</ul>
				</div>
			</ModalBody>
			<ModalFooter>
				<Button color='secondary' onClick={() => setIsOpen(false)}>
					Close
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default SecuritySettings;
