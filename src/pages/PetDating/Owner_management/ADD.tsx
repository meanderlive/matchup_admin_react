import React, { FC, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useField, useFormik } from 'formik';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
import data from '../../../common/data/dummyCustomerData';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import img from '../../../assets/img/user6.png';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Label from '../../../components/bootstrap/forms/Label';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import PAYMENTS from '../../../common/data/enumPaymentMethod';
import { createUser, fetchUser } from '../../../redux/Slice/UserManagement_slice';
import Avatar from '../../../components/Avatar';
import Select from '../../../components/bootstrap/forms/Select';
import Wizard, { WizardItem } from '../../../components/Wizard';
import { getAllInterest } from '../../../redux/Slice/IntersetSlice';

interface IPreviewItemProps {
	title: string;
	value: any | any[];
}
const PreviewItem: FC<IPreviewItemProps> = ({ title, value }) => {
	return (
		<>
			<div className='col-3 text-end'>{title}</div>
			<div className='col-9 fw-bold'>{value || '-'}</div>
		</>
	);
};
interface ICustomerEditModalProps {
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}

const Add: FC<ICustomerEditModalProps> = ({ id, isOpen, setIsOpen }) => {
	const state = useSelector((statee: any) => statee.interest);

	const itemData = id ? data.filter((item) => item.id.toString() === id.toString()) : {};
	const item = id && Array.isArray(itemData) ? itemData[0] : {};
	const modeid = localStorage.getItem('modeid');
	const [avatarFil, setAvatarFile] = useState<any>();
	const [isProfileUploaded, setisProfileUploaded] = useState<boolean>(false);
	const [intersetArray, setIntersetArray] = useState<any>([])
	console.log(intersetArray, 'ssdddsdsdssdsdsdsdsdsd');

	const dispatch = useDispatch();
	const [errorHandling, setErrorHandling] = useState(false);
	const heightArray = [];
	for (let i = 3; i <= 6.6; i += 0.1) {
		heightArray.push(parseFloat(i.toFixed(1)));
	}

	const WeightArray = [];






	const stateinterest = useSelector((statee: any) => statee.interest)
	console.log(stateinterest.interset.data)
	const dataa: any = stateinterest.interset.data
	useEffect(() => {
		dispatch(getAllInterest(modeid) as any)
	}, [dispatch, modeid])

	for (let i = 20; i < 120; i += 1) {
		WeightArray.push(i);
	}

	const NumberofSiblingsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	// new yup-------- schema 
	const userValidation = Yup.object().shape({
		name: Yup.string().required('Name is required'),
		email: Yup.string().email('Invalid email').required('Email is required'),
		dob: Yup.string().required('Date of Birth is required'),

		address: Yup.string().required('Address is required'),
		password: Yup.string().required('Password is required'),
		confirmPassword: Yup.string().required('Password is required'),


		iAm: Yup.string().required('This field is required'),
		looking: Yup.string().required('This field is required'),
		marital: Yup.string().required('This field is required'),

		phoneNumber: Yup.string()
			.matches(/^\d{10}$/, 'Phone number must be 10 digits')
			.required('Phone number is required'),
	});

	// -------------------------------

	const formik = useFormik({
		initialValues: {
			avtarInput: '',
			image: '',
			name: '',
			userName: '',
			email: '',
			dob: '', // Assuming it's a string for simplicity
			address: '',
			phoneNumber: '',
			mode: modeid,
			iAm: '', // Assuming it's one of these two values



			password: 'Mspl@123',
			confirmPassword: 'Mspl@123',

			description: ''

		},
		validationSchema: userValidation,

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			console.log(values);
			try {
				setErrorHandling(true);
				dispatch(createUser({ values, avatarFil }) as any);
			} catch (error) {
			} finally {
				dispatch(fetchUser({ modeid }) as any);
				setIsOpen(false);
				showNotification(
					<span className='d-flex align-items-center'>
						<Icon icon='Info' size='lg' className='me-1' />
						<span>Added Successfully</span>
					</span>,
					'User has been Added successfully',
				);
			}
		},
	});
	const [ApiTrue, setApiTrue] = useState(false)
	const handleAvatarChang = (e: any) => {

		setApiTrue(true)

		console.log(e.target.files[0]);
		setAvatarFile(e.target.files[0]);
		if (e.target.files && e.target.files.length > 0) {
			setisProfileUploaded(true);
			setAvatarFile(e.target.files[0]);
		}
	};
	const handleActiveInteset = (idd: any) => {
		const data2 = intersetArray.includes(idd)
		if (data2) {
			const updatedArray = intersetArray.filter((item2: any) => item2 !== idd);
			setIntersetArray(updatedArray);
		} else {
			setIntersetArray([...intersetArray, idd]);
			formik.setFieldValue('interest', intersetArray)

		}
	}






	if (id || id === '0') {
		return (
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='xl' titleId={id.toString()}  >
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id={id}>{item?.name || 'New Owner User'}</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4 user-modal-body'>



					<div className='row g-4 align-items-center' style={{}}>
						<FormGroup
							label='Add Profile Picture *'
							className='col-md-6'
							style={{ display: 'flex', justifyContent: 'center' }}>


							<label htmlFor='avatarInput' style={{ margin: '47px 0px 0px -120px' }}>

								<div
									style={{
										border: '1px solid gray',
										width: '120px',
										height: '120px',
										// borderRadius: '50%',
										backgroundImage: `url(${img})`,
										backgroundSize: 'cover',
										backgroundPosition: 'center',
									}}>
									{avatarFil && (
										<img
											src={URL.createObjectURL(avatarFil) || ''}
											alt='Avatar Preview'
											style={{
												width: '100%',
												height: '100%',
												// borderRadius: '50%',	
											}}
										/>)}
									<input
										type='file'
										accept='image/'
										id='avatarInput'
										name='image'
										style={{
											width: '100%',
											height: '100%',
											opacity: 0,
											cursor: 'pointer',
										}}
										value={formik.values.image}
										onChange={(e: any) => handleAvatarChang(e)}
									/>

									<p className='mt-3'> Click on Image</p>
								</div>
							</label>
						</FormGroup>
						<FormGroup id='name' label='Name' className='col-md-6'>
							<Input
								name='name'
								onChange={formik.handleChange}
								value={formik.values.name}
							/>
							{errorHandling && formik.errors.name ? (
								<div className='errorMassage'>{formik.errors.name}</div>
							) : (
								<div />
							)}
						</FormGroup>
						<FormGroup id='userName' label='UserName' className='col-md-6'>
							<Input
								name='userName'
								onChange={formik.handleChange}
								value={formik.values.userName}
							/>
							{errorHandling && formik.errors.userName ? (
								<div className='errorMassage'>{formik.errors.userName}</div>
							) : (
								<div />
							)}
						</FormGroup>
						<FormGroup id='description' label='Description' className='col-md-6'>
							<Input
								name='description'
								onChange={formik.handleChange}
								value={formik.values.description}
							/>
							{errorHandling && formik.errors.description ? (
								<div className='errorMassage'>{formik.errors.description}</div>
							) : (
								<div />
							)}
						</FormGroup>
						<FormGroup id='dob' label='Birthday' className='col-md-6'>
							<Input
								name='dob'
								type='date'
								onChange={formik.handleChange}
								value={formik.values.dob}
							/>
							{errorHandling && formik.errors.dob ? (
								<div className='errorMassage'>{formik.errors.dob}</div>
							) : (
								<div />
							)}
						</FormGroup>
						<FormGroup id='phoneNumber' label='Phone No *' className='col-md-6'>
							<Input
								name='phoneNumber'
								type='text'
								onChange={formik.handleChange}
								value={formik.values.phoneNumber}
							/>
							{errorHandling && formik.errors.phoneNumber ? (
								<div className='errorMassage'>{formik.errors.phoneNumber}</div>
							) : (
								<div />
							)}
						</FormGroup>

						<FormGroup id='email' label='Email' className='col-md-6'>
							<Input
								name='email'
								type='email'
								onChange={formik.handleChange}
								value={formik.values.email}
							/>

							{errorHandling && formik.errors.email ? (
								<div className='errorMassage'>{formik.errors.email}</div>
							) : (
								<div />
							)}
						</FormGroup>

						<FormGroup id='address' label='Address' className='col-md-6'>
							<Input
								name='address'
								onChange={formik.handleChange}
								value={formik.values.address}
							/>

							{errorHandling && formik.errors.address ? (
								<div className='errorMassage'>{formik.errors.address}</div>
							) : (
								<div />
							)}
						</FormGroup>

					</div>


					<div className='row g-4'>
						<FormGroup label='Gender' className='col-6'>
							<select
								id='iAm'
								className='form-select'
								name='iAm'
								value={formik.values.iAm}
								onChange={formik.handleChange}>
								<option value='' disabled>
									...Select...
								</option>
								<option value='Male'>Male</option>
								<option value='Female'>Female</option>
							</select>
							{errorHandling && formik.errors.iAm ? (
								<div className='errorMassage'>{formik.errors.iAm}</div>
							) : (
								<div />
							)}
						</FormGroup>






















					</div>




					<div   >

						<Button
							color='info'
							className='col-1 col-sm-3 col-md-3 col-lg-2 col-xl-1 col-xxl-1	 float-end'
							onClick={() => {
								formik.handleSubmit();
								setErrorHandling(true);
							}}>
							Submit
						</Button>
					</div>




				</ModalBody>

			</Modal>
		);
	}
	return null;
};
Add.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default Add;
