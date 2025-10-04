import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal, { ModalBody, ModalHeader, ModalFooter, ModalTitle } from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Label from '../../../components/bootstrap/forms/Label';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';

interface AddInterestProps {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	interests: any[];
	setInterests: (interests: any[]) => void;
}

const AddInterest: React.FC<AddInterestProps> = ({ isOpen, setIsOpen, interests, setInterests }) => {
	const categories = ['Physical', 'Entertainment', 'Lifestyle', 'Creative', 'Educational', 'Technology'];

	const validationSchema = Yup.object({
		name: Yup.string().required('Interest name is required').min(2, 'Name must be at least 2 characters'),
		description: Yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
		category: Yup.string().required('Category is required'),
		isActive: Yup.boolean()
	});

	const formik = useFormik({
		initialValues: {
			name: '',
			description: '',
			category: '',
			isActive: true
		},
		validationSchema,
		onSubmit: (values, { resetForm }) => {
			const newInterest = {
				id: Math.max(...interests.map(i => i.id)) + 1,
				...values,
				userCount: 0,
				createdAt: new Date().toISOString().split('T')[0]
			};
			setInterests([newInterest, ...interests]);
			setIsOpen(false);
			resetForm();
		}
	});

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg'>
			<ModalHeader>
				<ModalTitle id='add-interest-modal'>Add New Interest</ModalTitle>
			</ModalHeader>
			<form onSubmit={formik.handleSubmit}>
				<ModalBody>
					<div className='row'>
						<div className='col-md-6'>
							<FormGroup>
								<Label htmlFor='name'>Interest Name</Label>
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
								<Label htmlFor='category'>Category</Label>
								<select
									id='category'
									name='category'
									className='form-select'
									value={formik.values.category}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								>
									<option value=''>Select Category</option>
									{categories.map((category: string) => (
										<option key={category} value={category}>{category}</option>
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
							className='form-control'
							rows={3}
							value={formik.values.description}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						></textarea>
					</FormGroup>
					<FormGroup>
						<div className='form-check'>
							<input
								id='isActive'
								name='isActive'
								type='checkbox'
								className='form-check-input'
								checked={formik.values.isActive}
								onChange={formik.handleChange}
							/>
							<Label htmlFor='isActive' className='form-check-label ms-2'>
								Active
							</Label>
						</div>
					</FormGroup>
				</ModalBody>
				<ModalFooter>
					<Button color='secondary' onClick={() => setIsOpen(false)}>
						Cancel
					</Button>
					<Button color='primary' type='submit'>
						Add Interest
					</Button>
				</ModalFooter>
			</form>
		</Modal>
	);
};

export default AddInterest;
