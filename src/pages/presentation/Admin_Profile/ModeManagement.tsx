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
import Checks from '../../../components/bootstrap/forms/Checks';
import Select from '../../../components/bootstrap/forms/Select';
import useDarkMode from '../../../hooks/useDarkMode';
import { getColorNameWithIndex } from '../../../helpers/helpers';

const ModeManagement = () => {
	const { darkModeStatus } = useDarkMode();
	const [modes, setModes] = useState([
		{
			id: 1,
			name: 'Dating Mode',
			description: 'Standard dating application mode',
			status: 'active',
			features: ['Profile Matching', 'Messaging', 'Video Calls', 'Photo Sharing'],
			userCount: 12500,
			lastModified: '2024-01-15',
			icon: 'Favorite',
			color: 'primary'
		},
		{
			id: 2,
			name: 'Pet Dating Mode',
			description: 'Pet-focused dating and social networking',
			status: 'active',
			features: ['Pet Profiles', 'Owner Matching', 'Pet Meetups', 'Vet Services'],
			userCount: 8500,
			lastModified: '2024-01-14',
			icon: 'Pets',
			color: 'success'
		},
		{
			id: 3,
			name: 'Friendship Mode',
			description: 'Find friends and social connections',
			status: 'inactive',
			features: ['Interest Matching', 'Group Activities', 'Event Planning', 'Social Groups'],
			userCount: 3200,
			lastModified: '2024-01-12',
			icon: 'Group',
			color: 'info'
		},
		{
			id: 4,
			name: 'Professional Mode',
			description: 'Business networking and professional connections',
			status: 'development',
			features: ['Career Networking', 'Mentorship', 'Job Matching', 'Skill Sharing'],
			userCount: 0,
			lastModified: '2024-01-10',
			icon: 'Business',
			color: 'warning'
		},
		{
			id: 5,
			name: 'Family Mode',
			description: 'Family-oriented social networking',
			status: 'planned',
			features: ['Family Groups', 'Child Safety', 'Event Coordination', 'Photo Albums'],
			userCount: 0,
			lastModified: '2024-01-08',
			icon: 'FamilyRestroom',
			color: 'secondary'
		}
	]);

	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [editingMode, setEditingMode] = useState<any>(null);
	const [deletingMode, setDeletingMode] = useState<any>(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [filterStatus, setFilterStatus] = useState('');

	const statusOptions = [
		{ value: 'active', label: 'Active', color: 'success' },
		{ value: 'inactive', label: 'Inactive', color: 'secondary' },
		{ value: 'development', label: 'Development', color: 'warning' },
		{ value: 'planned', label: 'Planned', color: 'info' }
	];

	const validationSchema = Yup.object({
		name: Yup.string().required('Mode name is required').min(2, 'Name must be at least 2 characters'),
		description: Yup.string().required('Description is required').min(3, 'Description must be at least 3 characters'),
		status: Yup.string().required('Status is required'),
		features: Yup.array().min(1, 'At least one feature is required')
	});

	const formik = useFormik({
		initialValues: {
			name: '',
			description: '',
			status: 'planned',
			features: [] as string[]
		},
		validationSchema,
		onSubmit: (values, { resetForm }) => {
			console.log('Form submitted with values:', values);
			console.log('Validation errors:', formik.errors);
			
			if (editingMode) {
				setModes(prev => prev.map(mode => 
					mode.id === editingMode.id 
						? { ...mode, ...values, lastModified: new Date().toISOString().split('T')[0] }
						: mode
				));
				setIsEditModalOpen(false);
				setEditingMode(null);
				alert('Mode updated successfully!');
			} else {
				const newMode = {
					id: Math.max(...modes.map(m => m.id)) + 1,
					...values,
					userCount: 0,
					lastModified: new Date().toISOString().split('T')[0],
					icon: 'Settings',
					color: 'primary'
				};
				console.log('Adding new mode:', newMode);
				setModes(prev => [newMode, ...prev]);
				setIsAddModalOpen(false);
				alert('Mode added successfully!');
			}
			resetForm();
		}
	});

	const handleEdit = (mode: any) => {
		setEditingMode(mode);
		formik.setValues({
			name: mode.name,
			description: mode.description,
			status: mode.status,
			features: mode.features
		});
		setIsEditModalOpen(true);
	};

	const handleDelete = (mode: any) => {
		setDeletingMode(mode);
		setIsDeleteModalOpen(true);
	};

	const toggleStatus = (mode: any) => {
		const newStatus = mode.status === 'active' ? 'inactive' : 'active';
		setModes(prev => prev.map(m => 
			m.id === mode.id 
				? { ...m, status: newStatus, lastModified: new Date().toISOString().split('T')[0] }
				: m
		));
	};

	const filteredModes = modes.filter(mode => {
		const matchesSearch = mode.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
							mode.description.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus = filterStatus === '' || mode.status === filterStatus;
		return matchesSearch && matchesStatus;
	});

	const getStatusColor = (status: string) => {
		const statusMap: { [key: string]: string } = {
			'active': 'success',
			'inactive': 'secondary',
			'development': 'warning',
			'planned': 'info'
		};
		return statusMap[status] || 'secondary';
	};

	const getStatusIcon = (status: string) => {
		const iconMap: { [key: string]: string } = {
			'active': 'CheckCircle',
			'inactive': 'Cancel',
			'development': 'Build',
			'planned': 'Schedule'
		};
		return iconMap[status] || 'Help';
	};

	const getTotalUsers = () => {
		return modes.reduce((total, mode) => total + mode.userCount, 0);
	};

	const getActiveModes = () => {
		return modes.filter(mode => mode.status === 'active').length;
	};

	return (
		<PageWrapper title='Mode Management'>
			<SubHeader>
				<SubHeaderLeft>
					<span className='h4 mb-0 fw-bold'>Mode Management</span>
					<SubheaderSeparator />
					<span className='text-muted'>Manage different application modes and configurations</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Input
						type='search'
						placeholder='Search modes...'
						value={searchTerm}
						onChange={(e: any) => setSearchTerm(e.target.value)}
						style={{ width: '250px' }}
					/>
					<SubheaderSeparator />
					<select
						className='form-select'
						value={filterStatus}
						onChange={(e: any) => setFilterStatus(e.target.value)}
						style={{ width: '150px' }}
					>
						<option value=''>All Status</option>
						{statusOptions.map((option) => (
							<option key={option.value} value={option.value}>{option.label}</option>
						))}
					</select>
					<SubheaderSeparator />
					<Button
						color='primary'
						icon='Add'
						onClick={() => {
							formik.resetForm();
							setEditingMode(null);
							setIsAddModalOpen(true);
						}}>
						Add Mode
					</Button>
				</SubHeaderRight>
			</SubHeader>

			<Page>
				{/* Statistics Cards */}
				<div className='row mb-4'>
					<div className='col-lg-3 col-md-6 mb-3'>
						<Card>
							<CardBody>
								<div className='d-flex align-items-center'>
									<div className='flex-shrink-0'>
										<div className={`ratio ratio-1x1 rounded-2 bg-l25-${getColorNameWithIndex(0)} text-${getColorNameWithIndex(0)}`}
											style={{ width: 50 }}>
											<div className='d-flex align-items-center justify-content-center'>
												<Icon icon='Settings' size='lg' />
											</div>
										</div>
									</div>
									<div className='flex-grow-1 ms-3'>
										<div className='fw-bold fs-5'>{modes.length}</div>
										<div className='text-muted small'>Total Modes</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-lg-3 col-md-6 mb-3'>
						<Card>
							<CardBody>
								<div className='d-flex align-items-center'>
									<div className='flex-shrink-0'>
										<div className={`ratio ratio-1x1 rounded-2 bg-l25-${getColorNameWithIndex(1)} text-${getColorNameWithIndex(1)}`}
											style={{ width: 50 }}>
											<div className='d-flex align-items-center justify-content-center'>
												<Icon icon='CheckCircle' size='lg' />
											</div>
										</div>
									</div>
									<div className='flex-grow-1 ms-3'>
										<div className='fw-bold fs-5'>{getActiveModes()}</div>
										<div className='text-muted small'>Active Modes</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-lg-3 col-md-6 mb-3'>
						<Card>
							<CardBody>
								<div className='d-flex align-items-center'>
									<div className='flex-shrink-0'>
										<div className={`ratio ratio-1x1 rounded-2 bg-l25-${getColorNameWithIndex(2)} text-${getColorNameWithIndex(2)}`}
											style={{ width: 50 }}>
											<div className='d-flex align-items-center justify-content-center'>
												<Icon icon='Group' size='lg' />
											</div>
										</div>
									</div>
									<div className='flex-grow-1 ms-3'>
										<div className='fw-bold fs-5'>{getTotalUsers().toLocaleString()}</div>
										<div className='text-muted small'>Total Users</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-lg-3 col-md-6 mb-3'>
						<Card>
							<CardBody>
								<div className='d-flex align-items-center'>
									<div className='flex-shrink-0'>
										<div className={`ratio ratio-1x1 rounded-2 bg-l25-${getColorNameWithIndex(3)} text-${getColorNameWithIndex(3)}`}
											style={{ width: 50 }}>
											<div className='d-flex align-items-center justify-content-center'>
												<Icon icon='TrendingUp' size='lg' />
											</div>
										</div>
									</div>
									<div className='flex-grow-1 ms-3'>
										<div className='fw-bold fs-5'>{Math.round(getTotalUsers() / modes.length)}</div>
										<div className='text-muted small'>Avg Users/Mode</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>

				{/* Modes Grid */}
				<div className='row'>
					{filteredModes.map((mode) => (
						<div key={mode.id} className='col-lg-4 col-md-6 mb-4'>
							<Card stretch className='h-100'>
								<CardHeader>
									<CardTitle className='d-flex align-items-center'>
										<div className={`ratio ratio-1x1 rounded-2 bg-l25-${mode.color} text-${mode.color} me-3`}
											style={{ width: 40 }}>
											<div className='d-flex align-items-center justify-content-center'>
												<Icon icon={mode.icon} />
											</div>
										</div>
										<div>
											<div className='fw-bold'>{mode.name}</div>
											<Badge color={getStatusColor(mode.status) as any} isLight className='mt-1'>
												<Icon icon={getStatusIcon(mode.status)} size='sm' className='me-1' />
												{statusOptions.find(s => s.value === mode.status)?.label}
											</Badge>
										</div>
									</CardTitle>
								</CardHeader>
								<CardBody>
									<p className='text-muted mb-3'>{mode.description}</p>
									
									<div className='mb-3'>
										<div className='fw-bold mb-2'>Features:</div>
										<div className='d-flex flex-wrap gap-1'>
											{mode.features.map((feature: string, index: number) => (
												<Badge key={index} color='light' className='text-dark'>
													{feature}
												</Badge>
											))}
										</div>
									</div>

									<div className='row text-center mb-3'>
										<div className='col-6'>
											<div className='fw-bold text-primary fs-5'>{mode.userCount.toLocaleString()}</div>
											<div className='text-muted small'>Users</div>
										</div>
										<div className='col-6'>
											<div className='fw-bold text-info fs-5'>{mode.features.length}</div>
											<div className='text-muted small'>Features</div>
										</div>
									</div>

									<div className='text-muted small mb-3'>
										Last Modified: {mode.lastModified}
									</div>

									<div className='d-flex gap-2'>
										<Button
											color={mode.status === 'active' ? 'warning' : 'success'}
											size='sm'
											icon={mode.status === 'active' ? 'Block' : 'CheckCircle'}
											onClick={() => toggleStatus(mode)}>
											{mode.status === 'active' ? 'Deactivate' : 'Activate'}
										</Button>
										<Button
											color='info'
											size='sm'
											icon='Edit'
											onClick={() => handleEdit(mode)}>
											Edit
										</Button>
										<Button
											color='danger'
											size='sm'
											icon='Delete'
											onClick={() => handleDelete(mode)}>
											Delete
										</Button>
									</div>
								</CardBody>
							</Card>
						</div>
					))}
				</div>
			</Page>

			{/* Add Mode Modal */}
			<Modal isOpen={isAddModalOpen} setIsOpen={setIsAddModalOpen} size='lg'>
				<ModalHeader>
					<ModalTitle id='add-mode-modal'>Add New Mode</ModalTitle>
				</ModalHeader>
				<form onSubmit={formik.handleSubmit}>
					<ModalBody>
						<div className='row'>
							<div className='col-md-6'>
								<FormGroup>
									<Label htmlFor='name'>Mode Name</Label>
									<Input
										id='name'
										name='name'
										value={formik.values.name}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
								</FormGroup>
								{formik.touched.name && formik.errors.name && (
									<div className='text-danger small mt-1'>{formik.errors.name}</div>
								)}
							</div>
							<div className='col-md-6'>
								<FormGroup>
									<Label htmlFor='status'>Status</Label>
									<select
										id='status'
										name='status'
										className='form-select'
										value={formik.values.status}
										onChange={formik.handleChange}
									>
										{statusOptions.map((option) => (
											<option key={option.value} value={option.value}>{option.label}</option>
										))}
									</select>
								</FormGroup>
							</div>
						</div>
						<FormGroup>
							<Label htmlFor='description'>Description</Label>
							<textarea
								id='description'
								name='description'
								className={`form-control ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
								rows={3}
								value={formik.values.description}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							></textarea>
						</FormGroup>
						{formik.touched.description && formik.errors.description && (
							<div className='invalid-feedback'>{formik.errors.description}</div>
						)}
						<FormGroup>
							<Label>Features</Label>
							<div className='row'>
								{['Profile Matching', 'Messaging', 'Video Calls', 'Photo Sharing', 'Group Activities', 'Event Planning', 'Job Matching', 'Skill Sharing'].map((feature, index) => (
									<div key={index} className='col-md-6 mb-2'>
										<Checks
											id={`feature-${index}`}
											name='features'
											value={feature}
											checked={formik.values.features.includes(feature)}
											onChange={(e: any) => {
												const isChecked = e.target.checked;
												const currentFeatures = formik.values.features;
												if (isChecked) {
													formik.setFieldValue('features', [...currentFeatures, feature]);
												} else {
													formik.setFieldValue('features', currentFeatures.filter((f: string) => f !== feature));
												}
											}}
											label={feature}
										/>
									</div>
								))}
							</div>
						</FormGroup>
						{formik.touched.features && formik.errors.features && (
							<div className='text-danger small mt-2'>{formik.errors.features}</div>
						)}
					</ModalBody>
					<ModalFooter>
						<Button color='secondary' onClick={() => setIsAddModalOpen(false)}>
							Cancel
						</Button>
						<Button color='primary' type='submit'>
							Add Mode
						</Button>
					</ModalFooter>
				</form>
			</Modal>

			{/* Edit Mode Modal */}
			<Modal isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpen} size='lg'>
				<ModalHeader>
					<ModalTitle id='edit-mode-modal'>Edit Mode</ModalTitle>
				</ModalHeader>
				<form onSubmit={formik.handleSubmit}>
					<ModalBody>
						<div className='row'>
							<div className='col-md-6'>
								<FormGroup>
									<Label htmlFor='edit-name'>Mode Name</Label>
									<Input
										id='edit-name'
										name='name'
										value={formik.values.name}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
								</FormGroup>
							</div>
							<div className='col-md-6'>
								<FormGroup>
									<Label htmlFor='edit-status'>Status</Label>
									<select
										id='edit-status'
										name='status'
										className='form-select'
										value={formik.values.status}
										onChange={formik.handleChange}
									>
										{statusOptions.map((option) => (
											<option key={option.value} value={option.value}>{option.label}</option>
										))}
									</select>
								</FormGroup>
							</div>
						</div>
						<FormGroup>
							<Label htmlFor='edit-description'>Description</Label>
							<textarea
								id='edit-description'
								name='description'
								className='form-control'
								rows={3}
								value={formik.values.description}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							></textarea>
						</FormGroup>
						<FormGroup>
							<Label>Features</Label>
							<div className='row'>
								{['Profile Matching', 'Messaging', 'Video Calls', 'Photo Sharing', 'Group Activities', 'Event Planning', 'Job Matching', 'Skill Sharing'].map((feature, index) => (
									<div key={index} className='col-md-6 mb-2'>
										<Checks
											id={`edit-feature-${index}`}
											name='features'
											value={feature}
											checked={formik.values.features.includes(feature)}
											onChange={(e: any) => {
												const isChecked = e.target.checked;
												const currentFeatures = formik.values.features;
												if (isChecked) {
													formik.setFieldValue('features', [...currentFeatures, feature]);
												} else {
													formik.setFieldValue('features', currentFeatures.filter((f: string) => f !== feature));
												}
											}}
											label={feature}
										/>
									</div>
								))}
							</div>
						</FormGroup>
					</ModalBody>
					<ModalFooter>
						<Button color='secondary' onClick={() => setIsEditModalOpen(false)}>
							Cancel
						</Button>
						<Button color='primary' type='submit'>
							Update Mode
						</Button>
					</ModalFooter>
				</form>
			</Modal>

			{/* Delete Confirmation Modal */}
			<Modal isOpen={isDeleteModalOpen} setIsOpen={setIsDeleteModalOpen}>
				<ModalHeader>
					<ModalTitle id='delete-mode-modal'>Delete Mode</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<p>Are you sure you want to delete the mode <strong>"{deletingMode?.name}"</strong>?</p>
					<p className='text-muted'>This action cannot be undone.</p>
				</ModalBody>
				<ModalFooter>
					<Button color='secondary' onClick={() => setIsDeleteModalOpen(false)}>
						Cancel
					</Button>
					<Button color='danger' onClick={() => {
						setModes(prev => prev.filter(mode => mode.id !== deletingMode?.id));
						setIsDeleteModalOpen(false);
						setDeletingMode(null);
					}}>
						Delete
					</Button>
				</ModalFooter>
			</Modal>
		</PageWrapper>
	);
};

export default ModeManagement;