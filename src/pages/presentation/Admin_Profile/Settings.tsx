import React, { useState } from 'react';
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
import useDarkMode from '../../../hooks/useDarkMode';
import { getColorNameWithIndex } from '../../../helpers/helpers';

const AdminSettings = () => {
	const { darkModeStatus } = useDarkMode();
	const [settings, setSettings] = useState({
		general: {
			siteName: 'Matchup Admin',
			siteDescription: 'Pet Dating & Social Network Platform',
			siteUrl: 'https://matchup.com',
			adminEmail: 'admin@matchup.com',
			timezone: 'UTC-5',
			language: 'English',
			currency: 'USD'
		},
		security: {
			sessionTimeout: 30,
			maxLoginAttempts: 5,
			passwordMinLength: 8,
			twoFactorRequired: false,
			ipWhitelist: false,
			httpsOnly: true
		},
		notifications: {
			emailNotifications: true,
			smsNotifications: false,
			pushNotifications: true,
			adminAlerts: true,
			userAlerts: true,
			securityAlerts: true
		},
		features: {
			userRegistration: true,
			petProfiles: true,
			chatEnabled: true,
			videoCalls: true,
			premiumFeatures: true,
			analyticsEnabled: true,
			maintenanceMode: false
		},
		integrations: {
			emailService: 'SendGrid',
			paymentGateway: 'Stripe',
			smsService: 'Twilio',
			storageService: 'AWS S3',
			cdnEnabled: true,
			analyticsService: 'Google Analytics'
		}
	});

	const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
	const [activeTab, setActiveTab] = useState('general');

	const tabs = [
		{ id: 'general', label: 'General', icon: 'Settings' },
		{ id: 'security', label: 'Security', icon: 'Security' },
		{ id: 'notifications', label: 'Notifications', icon: 'Notifications' },
		{ id: 'features', label: 'Features', icon: 'Extension' },
		{ id: 'integrations', label: 'Integrations', icon: 'Api' }
	];

	const validationSchema = Yup.object({
		siteName: Yup.string().required('Site name is required').min(2, 'Site name must be at least 2 characters'),
		siteDescription: Yup.string().required('Site description is required').min(10, 'Description must be at least 10 characters'),
		siteUrl: Yup.string().url('Must be a valid URL').required('Site URL is required'),
		adminEmail: Yup.string().email('Invalid email').required('Admin email is required'),
		timezone: Yup.string().required('Timezone is required'),
		language: Yup.string().required('Language is required'),
		currency: Yup.string().required('Currency is required')
	});

	const formik = useFormik({
		initialValues: settings.general,
		validationSchema,
		onSubmit: (values) => {
			setSettings(prev => ({
				...prev,
				[activeTab]: values
			}));
			setIsSaveModalOpen(true);
		}
	});

	const handleSave = () => {
		setIsSaveModalOpen(false);
		alert('Settings saved successfully!');
	};

	const handleReset = () => {
		if (confirm('Are you sure you want to reset all settings to default values?')) {
			// Reset to default values
			setSettings({
				general: {
					siteName: 'Matchup Admin',
					siteDescription: 'Pet Dating & Social Network Platform',
					siteUrl: 'https://matchup.com',
					adminEmail: 'admin@matchup.com',
					timezone: 'UTC-5',
					language: 'English',
					currency: 'USD'
				},
				security: {
					sessionTimeout: 30,
					maxLoginAttempts: 5,
					passwordMinLength: 8,
					twoFactorRequired: false,
					ipWhitelist: false,
					httpsOnly: true
				},
				notifications: {
					emailNotifications: true,
					smsNotifications: false,
					pushNotifications: true,
					adminAlerts: true,
					userAlerts: true,
					securityAlerts: true
				},
				features: {
					userRegistration: true,
					petProfiles: true,
					chatEnabled: true,
					videoCalls: true,
					premiumFeatures: true,
					analyticsEnabled: true,
					maintenanceMode: false
				},
				integrations: {
					emailService: 'SendGrid',
					paymentGateway: 'Stripe',
					smsService: 'Twilio',
					storageService: 'AWS S3',
					cdnEnabled: true,
					analyticsService: 'Google Analytics'
				}
			});
			alert('Settings reset to default values!');
		}
	};

	const renderGeneralSettings = () => (
		<div className='row'>
			<div className='col-md-6 mb-3'>
				<FormGroup>
					<Label htmlFor='siteName'>Site Name</Label>
					<Input
						id='siteName'
						name='siteName'
						value={settings.general.siteName}
						onChange={(e: any) => setSettings(prev => ({
							...prev,
							general: { ...prev.general, siteName: e.target.value }
						}))}
					/>
				</FormGroup>
			</div>
			<div className='col-md-6 mb-3'>
				<FormGroup>
					<Label htmlFor='siteUrl'>Site URL</Label>
					<Input
						id='siteUrl'
						name='siteUrl'
						value={settings.general.siteUrl}
						onChange={(e: any) => setSettings(prev => ({
							...prev,
							general: { ...prev.general, siteUrl: e.target.value }
						}))}
					/>
				</FormGroup>
			</div>
			<div className='col-12 mb-3'>
				<FormGroup>
					<Label htmlFor='siteDescription'>Site Description</Label>
					<textarea
						id='siteDescription'
						name='siteDescription'
						className='form-control'
						rows={3}
						value={settings.general.siteDescription}
						onChange={(e: any) => setSettings(prev => ({
							...prev,
							general: { ...prev.general, siteDescription: e.target.value }
						}))}
					/>
				</FormGroup>
			</div>
			<div className='col-md-4 mb-3'>
				<FormGroup>
					<Label htmlFor='adminEmail'>Admin Email</Label>
					<Input
						id='adminEmail'
						name='adminEmail'
						type='email'
						value={settings.general.adminEmail}
						onChange={(e: any) => setSettings(prev => ({
							...prev,
							general: { ...prev.general, adminEmail: e.target.value }
						}))}
					/>
				</FormGroup>
			</div>
			<div className='col-md-4 mb-3'>
				<FormGroup>
					<Label htmlFor='timezone'>Timezone</Label>
					<select
						id='timezone'
						name='timezone'
						className='form-select'
						value={settings.general.timezone}
						onChange={(e: any) => setSettings(prev => ({
							...prev,
							general: { ...prev.general, timezone: e.target.value }
						}))}
					>
						<option value='UTC-5'>UTC-5 (EST)</option>
						<option value='UTC-4'>UTC-4 (EDT)</option>
						<option value='UTC+0'>UTC+0 (GMT)</option>
						<option value='UTC+5:30'>UTC+5:30 (IST)</option>
					</select>
				</FormGroup>
			</div>
			<div className='col-md-4 mb-3'>
				<FormGroup>
					<Label htmlFor='currency'>Currency</Label>
					<select
						id='currency'
						name='currency'
						className='form-select'
						value={settings.general.currency}
						onChange={(e: any) => setSettings(prev => ({
							...prev,
							general: { ...prev.general, currency: e.target.value }
						}))}
					>
						<option value='USD'>USD ($)</option>
						<option value='EUR'>EUR (€)</option>
						<option value='GBP'>GBP (£)</option>
						<option value='INR'>INR (₹)</option>
					</select>
				</FormGroup>
			</div>
		</div>
	);

	const renderSecuritySettings = () => (
		<div className='row'>
			<div className='col-md-6 mb-3'>
				<FormGroup>
					<Label htmlFor='sessionTimeout'>Session Timeout (minutes)</Label>
					<Input
						id='sessionTimeout'
						name='sessionTimeout'
						type='number'
						value={settings.security.sessionTimeout}
						onChange={(e: any) => setSettings(prev => ({
							...prev,
							security: { ...prev.security, sessionTimeout: parseInt(e.target.value) }
						}))}
					/>
				</FormGroup>
			</div>
			<div className='col-md-6 mb-3'>
				<FormGroup>
					<Label htmlFor='maxLoginAttempts'>Max Login Attempts</Label>
					<Input
						id='maxLoginAttempts'
						name='maxLoginAttempts'
						type='number'
						value={settings.security.maxLoginAttempts}
						onChange={(e: any) => setSettings(prev => ({
							...prev,
							security: { ...prev.security, maxLoginAttempts: parseInt(e.target.value) }
						}))}
					/>
				</FormGroup>
			</div>
			<div className='col-md-6 mb-3'>
				<FormGroup>
					<Label htmlFor='passwordMinLength'>Password Min Length</Label>
					<Input
						id='passwordMinLength'
						name='passwordMinLength'
						type='number'
						value={settings.security.passwordMinLength}
						onChange={(e: any) => setSettings(prev => ({
							...prev,
							security: { ...prev.security, passwordMinLength: parseInt(e.target.value) }
						}))}
					/>
				</FormGroup>
			</div>
			<div className='col-12'>
				<div className='row'>
					<div className='col-md-4 mb-3'>
						<div className='form-check form-switch'>
							<input
								className='form-check-input'
								type='checkbox'
								id='twoFactorRequired'
								checked={settings.security.twoFactorRequired}
								onChange={(e: any) => setSettings(prev => ({
									...prev,
									security: { ...prev.security, twoFactorRequired: e.target.checked }
								}))}
							/>
							<Label className='form-check-label' htmlFor='twoFactorRequired'>
								Two-Factor Required
							</Label>
						</div>
					</div>
					<div className='col-md-4 mb-3'>
						<div className='form-check form-switch'>
							<input
								className='form-check-input'
								type='checkbox'
								id='ipWhitelist'
								checked={settings.security.ipWhitelist}
								onChange={(e: any) => setSettings(prev => ({
									...prev,
									security: { ...prev.security, ipWhitelist: e.target.checked }
								}))}
							/>
							<Label className='form-check-label' htmlFor='ipWhitelist'>
								IP Whitelist
							</Label>
						</div>
					</div>
					<div className='col-md-4 mb-3'>
						<div className='form-check form-switch'>
							<input
								className='form-check-input'
								type='checkbox'
								id='httpsOnly'
								checked={settings.security.httpsOnly}
								onChange={(e: any) => setSettings(prev => ({
									...prev,
									security: { ...prev.security, httpsOnly: e.target.checked }
								}))}
							/>
							<Label className='form-check-label' htmlFor='httpsOnly'>
								HTTPS Only
							</Label>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	const renderNotificationSettings = () => (
		<div className='row'>
			{Object.entries(settings.notifications).map(([key, value]) => (
				<div key={key} className='col-md-6 mb-3'>
					<div className='form-check form-switch'>
						<input
							className='form-check-input'
							type='checkbox'
							id={key}
							checked={value}
							onChange={(e: any) => setSettings(prev => ({
								...prev,
								notifications: { ...prev.notifications, [key]: e.target.checked }
							}))}
						/>
						<Label className='form-check-label' htmlFor={key}>
							{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
						</Label>
					</div>
				</div>
			))}
		</div>
	);

	const renderFeatureSettings = () => (
		<div className='row'>
			{Object.entries(settings.features).map(([key, value]) => (
				<div key={key} className='col-md-6 mb-3'>
					<div className='form-check form-switch'>
						<input
							className='form-check-input'
							type='checkbox'
							id={key}
							checked={value}
							onChange={(e: any) => setSettings(prev => ({
								...prev,
								features: { ...prev.features, [key]: e.target.checked }
							}))}
						/>
						<Label className='form-check-label' htmlFor={key}>
							{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
						</Label>
					</div>
				</div>
			))}
		</div>
	);

	const renderIntegrationSettings = () => (
		<div className='row'>
			<div className='col-md-6 mb-3'>
				<FormGroup>
					<Label htmlFor='emailService'>Email Service</Label>
					<select
						id='emailService'
						name='emailService'
						className='form-select'
						value={settings.integrations.emailService}
						onChange={(e: any) => setSettings(prev => ({
							...prev,
							integrations: { ...prev.integrations, emailService: e.target.value }
						}))}
					>
						<option value='SendGrid'>SendGrid</option>
						<option value='Mailgun'>Mailgun</option>
						<option value='AWS SES'>AWS SES</option>
					</select>
				</FormGroup>
			</div>
			<div className='col-md-6 mb-3'>
				<FormGroup>
					<Label htmlFor='paymentGateway'>Payment Gateway</Label>
					<select
						id='paymentGateway'
						name='paymentGateway'
						className='form-select'
						value={settings.integrations.paymentGateway}
						onChange={(e: any) => setSettings(prev => ({
							...prev,
							integrations: { ...prev.integrations, paymentGateway: e.target.value }
						}))}
					>
						<option value='Stripe'>Stripe</option>
						<option value='PayPal'>PayPal</option>
						<option value='Razorpay'>Razorpay</option>
					</select>
				</FormGroup>
			</div>
			<div className='col-md-6 mb-3'>
				<FormGroup>
					<Label htmlFor='smsService'>SMS Service</Label>
					<select
						id='smsService'
						name='smsService'
						className='form-select'
						value={settings.integrations.smsService}
						onChange={(e: any) => setSettings(prev => ({
							...prev,
							integrations: { ...prev.integrations, smsService: e.target.value }
						}))}
					>
						<option value='Twilio'>Twilio</option>
						<option value='AWS SNS'>AWS SNS</option>
						<option value='TextLocal'>TextLocal</option>
					</select>
				</FormGroup>
			</div>
			<div className='col-md-6 mb-3'>
				<FormGroup>
					<Label htmlFor='storageService'>Storage Service</Label>
					<select
						id='storageService'
						name='storageService'
						className='form-select'
						value={settings.integrations.storageService}
						onChange={(e: any) => setSettings(prev => ({
							...prev,
							integrations: { ...prev.integrations, storageService: e.target.value }
						}))}
					>
						<option value='AWS S3'>AWS S3</option>
						<option value='Google Cloud'>Google Cloud</option>
						<option value='Azure Blob'>Azure Blob</option>
					</select>
				</FormGroup>
			</div>
			<div className='col-12'>
				<div className='row'>
					<div className='col-md-6 mb-3'>
						<div className='form-check form-switch'>
							<input
								className='form-check-input'
								type='checkbox'
								id='cdnEnabled'
								checked={settings.integrations.cdnEnabled}
								onChange={(e: any) => setSettings(prev => ({
									...prev,
									integrations: { ...prev.integrations, cdnEnabled: e.target.checked }
								}))}
							/>
							<Label className='form-check-label' htmlFor='cdnEnabled'>
								CDN Enabled
							</Label>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	const renderActiveTab = () => {
		switch (activeTab) {
			case 'general':
				return renderGeneralSettings();
			case 'security':
				return renderSecuritySettings();
			case 'notifications':
				return renderNotificationSettings();
			case 'features':
				return renderFeatureSettings();
			case 'integrations':
				return renderIntegrationSettings();
			default:
				return renderGeneralSettings();
		}
	};

	return (
		<PageWrapper title='Settings / Configuration'>
			<SubHeader>
				<SubHeaderLeft>
					<span className='h4 mb-0 fw-bold'>Settings / Configuration</span>
					<SubheaderSeparator />
					<span className='text-muted'>Configure system settings and application preferences</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Button
						color='warning'
						icon='Restore'
						onClick={handleReset}>
						Reset to Default
					</Button>
					<SubheaderSeparator />
					<Button
						color='primary'
						icon='Save'
						onClick={() => setIsSaveModalOpen(true)}>
						Save Settings
					</Button>
				</SubHeaderRight>
			</SubHeader>

			<Page>
				<div className='row'>
					<div className='col-lg-3 mb-4'>
						<Card>
							<CardHeader>
								<CardTitle>Settings Categories</CardTitle>
							</CardHeader>
							<CardBody>
								<div className='list-group list-group-flush'>
									{tabs.map((tab) => (
										<button
											key={tab.id}
											className={`list-group-item list-group-item-action d-flex align-items-center ${
												activeTab === tab.id ? 'active' : ''
											}`}
											onClick={() => setActiveTab(tab.id)}
										>
											<Icon icon={tab.icon} className='me-2' />
											{tab.label}
										</button>
									))}
								</div>
							</CardBody>
						</Card>
					</div>

					<div className='col-lg-9 mb-4'>
						<Card>
							<CardHeader>
								<CardTitle className='d-flex align-items-center'>
									<Icon icon={tabs.find(t => t.id === activeTab)?.icon} className='me-2' />
									{tabs.find(t => t.id === activeTab)?.label} Settings
								</CardTitle>
							</CardHeader>
							<CardBody>
								{renderActiveTab()}
							</CardBody>
						</Card>
					</div>
				</div>

				{/* Settings Overview */}
				<div className='row'>
					<div className='col-12'>
						<Card>
							<CardHeader>
								<CardTitle>Current Settings Overview</CardTitle>
							</CardHeader>
							<CardBody>
								<div className='row'>
									<div className='col-md-3 mb-3'>
										<div className='text-center'>
											<div className={`ratio ratio-1x1 rounded-2 bg-l25-${getColorNameWithIndex(0)} text-${getColorNameWithIndex(0)} mx-auto mb-3`}
												style={{ width: '60px' }}>
												<div className='d-flex align-items-center justify-content-center'>
													<Icon icon='Security' />
												</div>
											</div>
											<h6>Security Level</h6>
											<Badge color='success' isLight>High</Badge>
										</div>
									</div>
									<div className='col-md-3 mb-3'>
										<div className='text-center'>
											<div className={`ratio ratio-1x1 rounded-2 bg-l25-${getColorNameWithIndex(1)} text-${getColorNameWithIndex(1)} mx-auto mb-3`}
												style={{ width: '60px' }}>
												<div className='d-flex align-items-center justify-content-center'>
													<Icon icon='Notifications' />
												</div>
											</div>
											<h6>Notifications</h6>
											<Badge color='info' isLight>Active</Badge>
										</div>
									</div>
									<div className='col-md-3 mb-3'>
										<div className='text-center'>
											<div className={`ratio ratio-1x1 rounded-2 bg-l25-${getColorNameWithIndex(2)} text-${getColorNameWithIndex(2)} mx-auto mb-3`}
												style={{ width: '60px' }}>
												<div className='d-flex align-items-center justify-content-center'>
													<Icon icon='Extension' />
												</div>
											</div>
											<h6>Features</h6>
											<Badge color='warning' isLight>Enabled</Badge>
										</div>
									</div>
									<div className='col-md-3 mb-3'>
										<div className='text-center'>
											<div className={`ratio ratio-1x1 rounded-2 bg-l25-${getColorNameWithIndex(3)} text-${getColorNameWithIndex(3)} mx-auto mb-3`}
												style={{ width: '60px' }}>
												<div className='d-flex align-items-center justify-content-center'>
													<Icon icon='Api' />
												</div>
											</div>
											<h6>Integrations</h6>
											<Badge color='primary' isLight>Connected</Badge>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>

			{/* Save Confirmation Modal */}
			<Modal isOpen={isSaveModalOpen} setIsOpen={setIsSaveModalOpen}>
				<ModalHeader>
					<ModalTitle id='save-settings-modal'>Save Settings</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<p>Are you sure you want to save these settings?</p>
					<p className='text-muted'>This will update the system configuration.</p>
				</ModalBody>
				<ModalFooter>
					<Button color='secondary' onClick={() => setIsSaveModalOpen(false)}>
						Cancel
					</Button>
					<Button color='primary' onClick={handleSave}>
						Save Settings
					</Button>
				</ModalFooter>
			</Modal>
		</PageWrapper>
	);
};

export default AdminSettings;