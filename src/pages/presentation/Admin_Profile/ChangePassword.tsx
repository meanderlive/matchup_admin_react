import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal, { ModalBody, ModalHeader, ModalFooter, ModalTitle } from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Label from '../../../components/bootstrap/forms/Label';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';

interface ChangePasswordProps {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ isOpen, setIsOpen }) => {
	const [showPasswords, setShowPasswords] = React.useState({
		current: false,
		new: false,
		confirm: false
	});

	const validationSchema = Yup.object({
		currentPassword: Yup.string().required('Current password is required'),
		newPassword: Yup.string()
			.min(8, 'Password must be at least 8 characters')
			.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
			.required('New password is required'),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref('newPassword')], 'Passwords must match')
			.required('Confirm password is required')
	});

	const formik = useFormik({
		initialValues: {
			currentPassword: '',
			newPassword: '',
			confirmPassword: ''
		},
		validationSchema,
		onSubmit: (values, { resetForm }) => {
			// Here you would typically call an API to change the password
			console.log('Password change request:', values);
			alert('Password changed successfully!');
			setIsOpen(false);
			resetForm();
		}
	});

	const togglePasswordVisibility = (field: string) => {
		setShowPasswords(prev => ({
			...prev,
			[field]: !prev[field as keyof typeof prev]
		}));
	};

	const getPasswordStrength = (password: string) => {
		let strength = 0;
		if (password.length >= 8) strength++;
		if (/[a-z]/.test(password)) strength++;
		if (/[A-Z]/.test(password)) strength++;
		if (/\d/.test(password)) strength++;
		if (/[^A-Za-z0-9]/.test(password)) strength++;
		return strength;
	};

	const passwordStrength = getPasswordStrength(formik.values.newPassword);
	const strengthColors = ['danger', 'danger', 'warning', 'info', 'success'];
	const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<ModalHeader>
				<ModalTitle id='change-password-modal'>Change Password</ModalTitle>
			</ModalHeader>
			<form onSubmit={formik.handleSubmit}>
				<ModalBody>
					<FormGroup>
						<Label htmlFor='currentPassword'>Current Password</Label>
						<div className='position-relative'>
							<Input
								id='currentPassword'
								name='currentPassword'
								type={showPasswords.current ? 'text' : 'password'}
								value={formik.values.currentPassword}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							<Button
								type='button'
								color='light'
								size='sm'
								className='position-absolute end-0 top-50 translate-middle-y me-2'
								onClick={() => togglePasswordVisibility('current')}>
								<Icon icon={showPasswords.current ? 'VisibilityOff' : 'Visibility'} />
							</Button>
						</div>
					</FormGroup>

					<FormGroup>
						<Label htmlFor='newPassword'>New Password</Label>
						<div className='position-relative'>
							<Input
								id='newPassword'
								name='newPassword'
								type={showPasswords.new ? 'text' : 'password'}
								value={formik.values.newPassword}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							<Button
								type='button'
								color='light'
								size='sm'
								className='position-absolute end-0 top-50 translate-middle-y me-2'
								onClick={() => togglePasswordVisibility('new')}>
								<Icon icon={showPasswords.new ? 'VisibilityOff' : 'Visibility'} />
							</Button>
						</div>
						{formik.values.newPassword ? (
							<div className='mt-2'>
								<div className='progress' style={{ height: '4px' }}>
									<div 
										className={`progress-bar bg-${strengthColors[passwordStrength - 1] || 'danger'}`}
										style={{ width: `${(passwordStrength / 5) * 100}%` }}
									></div>
								</div>
								<small className={`text-${strengthColors[passwordStrength - 1] || 'danger'}`}>
									{strengthLabels[passwordStrength - 1] || 'Very Weak'}
								</small>
							</div>
						) : (
							<div></div>
						)}
					</FormGroup>

					<FormGroup>
						<Label htmlFor='confirmPassword'>Confirm New Password</Label>
						<div className='position-relative'>
							<Input
								id='confirmPassword'
								name='confirmPassword'
								type={showPasswords.confirm ? 'text' : 'password'}
								value={formik.values.confirmPassword}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							<Button
								type='button'
								color='light'
								size='sm'
								className='position-absolute end-0 top-50 translate-middle-y me-2'
								onClick={() => togglePasswordVisibility('confirm')}>
								<Icon icon={showPasswords.confirm ? 'VisibilityOff' : 'Visibility'} />
							</Button>
						</div>
					</FormGroup>

					<div className='alert alert-info'>
						<h6 className='alert-heading'>Password Requirements:</h6>
						<ul className='mb-0'>
							<li>At least 8 characters long</li>
							<li>Contains at least one uppercase letter</li>
							<li>Contains at least one lowercase letter</li>
							<li>Contains at least one number</li>
							<li>Contains at least one special character</li>
						</ul>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button color='secondary' onClick={() => setIsOpen(false)}>
						Cancel
					</Button>
					<Button color='primary' type='submit'>
						Change Password
					</Button>
				</ModalFooter>
			</form>
		</Modal>
	);
};

export default ChangePassword;
