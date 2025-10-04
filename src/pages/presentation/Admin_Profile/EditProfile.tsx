import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal, { ModalBody, ModalHeader, ModalFooter, ModalTitle } from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Label from '../../../components/bootstrap/forms/Label';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';

interface EditProfileProps {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	adminData: any;
	setAdminData: (data: any) => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ isOpen, setIsOpen, adminData, setAdminData }) => {
	const validationSchema = Yup.object({
		name: Yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
		email: Yup.string().email('Invalid email').required('Email is required'),
		phone: Yup.string().required('Phone is required'),
		department: Yup.string().required('Department is required'),
		timezone: Yup.string().required('Timezone is required'),
		language: Yup.string().required('Language is required')
	});

	const formik = useFormik({
		initialValues: {
			name: adminData.name,
			email: adminData.email,
			phone: adminData.phone,
			department: adminData.department,
			timezone: adminData.timezone,
			language: adminData.language
		},
		validationSchema,
		enableReinitialize: true,
		onSubmit: (values, { resetForm }) => {
			setAdminData((prev: any) => ({
				...prev,
				...values
			}));
			setIsOpen(false);
			resetForm();
		}
	});

	const timezones = [
		'UTC-12', 'UTC-11', 'UTC-10', 'UTC-9', 'UTC-8', 'UTC-7', 'UTC-6', 'UTC-5', 
		'UTC-4', 'UTC-3', 'UTC-2', 'UTC-1', 'UTC+0', 'UTC+1', 'UTC+2', 'UTC+3', 
		'UTC+4', 'UTC+5', 'UTC+6', 'UTC+7', 'UTC+8', 'UTC+9', 'UTC+10', 'UTC+11', 'UTC+12'
	];

	const languages = [
		'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 
		'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi'
	];

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg'>
			<ModalHeader>
				<ModalTitle id='edit-profile-modal'>Edit Profile</ModalTitle>
			</ModalHeader>
			<form onSubmit={formik.handleSubmit}>
				<ModalBody>
					<div className='row'>
						<div className='col-md-6'>
							<FormGroup>
								<Label htmlFor='name'>Full Name</Label>
								<Input
									id='name'
									name='name'
									value={formik.values.name}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</FormGroup>
						</div>
						<div className='col-md-6'>
							<FormGroup>
								<Label htmlFor='email'>Email Address</Label>
								<Input
									id='email'
									name='email'
									type='email'
									value={formik.values.email}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</FormGroup>
						</div>
					</div>
					<div className='row'>
						<div className='col-md-6'>
							<FormGroup>
								<Label htmlFor='phone'>Phone Number</Label>
								<Input
									id='phone'
									name='phone'
									value={formik.values.phone}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</FormGroup>
						</div>
						<div className='col-md-6'>
							<FormGroup>
								<Label htmlFor='department'>Department</Label>
								<Input
									id='department'
									name='department'
									value={formik.values.department}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</FormGroup>
						</div>
					</div>
					<div className='row'>
						<div className='col-md-6'>
							<FormGroup>
								<Label htmlFor='timezone'>Timezone</Label>
								<select
									id='timezone'
									name='timezone'
									className='form-select'
									value={formik.values.timezone}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								>
									{timezones.map((tz) => (
										<option key={tz} value={tz}>{tz}</option>
									))}
								</select>
							</FormGroup>
						</div>
						<div className='col-md-6'>
							<FormGroup>
								<Label htmlFor='language'>Language</Label>
								<select
									id='language'
									name='language'
									className='form-select'
									value={formik.values.language}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								>
									{languages.map((lang) => (
										<option key={lang} value={lang}>{lang}</option>
									))}
								</select>
							</FormGroup>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button color='secondary' onClick={() => setIsOpen(false)}>
						Cancel
					</Button>
					<Button color='primary' type='submit'>
						Update Profile
					</Button>
				</ModalFooter>
			</form>
		</Modal>
	);
};

export default EditProfile;
