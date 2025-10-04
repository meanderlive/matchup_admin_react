import React, { FC, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import * as Yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
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
import { createUser, fetchUser, fetchupdateUser } from '../../../redux/Slice/UserManagement_slice';
import img from '../../../assets/img/user6.png';
import { createProfile } from '../../../redux/Api/UserManagement';
import { getColorNameWithIndex } from '../../../common/data/enumColors';
import { getFirstLetter } from '../../../helpers/helpers';
import useDarkMode from '../../../hooks/useDarkMode';
import { getAllInterest } from '../../../redux/Slice/IntersetSlice';

interface ICustomerEditModalProps {
	editId: any;
	editData: any;
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}
const EditUser: FC<ICustomerEditModalProps> = ({ id, isOpen, editId, editData, setIsOpen }) => {
	const { darkModeStatus } = useDarkMode();

	const itemData = id ? data.filter((item) => item.id.toString() === id.toString()) : {};
	const item = id && Array.isArray(itemData) ? itemData[0] : {};
	const dispatch = useDispatch();
	//    const [modeId,setModeid]=useState<any>('')
	const modeid = localStorage.getItem('modeid');
	//    setModeid(localStorage.getItem('modeid'))
	const [intersetArray, setIntersetArray] = useState<any>(editData?.interest)
	const [errorHandling, setErrorHandling] = useState(false);
	//    yup
	const [avatarFil, setAvatarFile] = useState<any>(null);



	const stateinterest = useSelector((statee: any) => statee.interest)
	console.log(stateinterest.interset.data)
	const dataa: any = stateinterest.interset.data
	useEffect(() => {
		dispatch(getAllInterest(modeid) as any)
	}, [dispatch, modeid])
	const handleActiveInteset = (idd: any) => {
		const data2 = intersetArray.includes(idd)
		if (data2) {
			const updatedArray = intersetArray.filter((itema: any) => itema !== idd);
			setIntersetArray(updatedArray);
		} else {
			setIntersetArray([...intersetArray, idd])

		}
	}

	const heightArray = [];
	for (let i = 3; i <= 6.6; i += 0.1) {
		heightArray.push(parseFloat(i.toFixed(1)));
	}

	const WeightArray = [];

	for (let i = 20; i < 120; i += 1) {
		WeightArray.push(i);
	}

	const NumberofSiblingsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const userValidation = Yup.object().shape({
		name: Yup.string().required('Name is required'),
		email: Yup.string().email('invalid email').required('Email is required'),
		dob: Yup.string().required('required'),
		address: Yup.string().required('address is required'),
		iAm: Yup.string().required('required'),
		 

	});

	const formik = useFormik({
		initialValues: {

image:'',
description:editData?.description || '',
			userName: editData?.userName || '',
			mode: editData?.mode || '',

			name: editData?.name || '',
			password: 'Test@123',
			email: editData?.email || '',
			dob: editData?.dob || '',
			address: editData?.address || '',
			phone_number: '0123456789',
			iAm: editData?.iAm || '', // Assuming it's one of these two values

			phoneNumber: editData?.phoneNumber || '',


		},
		enableReinitialize: true,
		validationSchema: userValidation,

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values: any) => {
			console.log(values);
			try {
				setErrorHandling(true);
				dispatch(fetchupdateUser({ editId, values }) as any);
				if (ApiTrue) {
					const imageid = editId
					createProfile({ imageid, avatarFil })

				}
			} catch (error) {
			} finally {
				dispatch(fetchUser({ modeid }) as any);
				setAvatarFile(null)
			}
			setIsOpen(false);
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Added Successfully</span>
				</span>,
				'User has been Added successfully',
			);
		},
	});
	const [ApiTrue, setApiTrue] = useState(false)
	const handleAvatarChang = (e: any) => {

		setApiTrue(true)

		setAvatarFile(e.target.files[0]);
		if (e.target.files && e.target.files.length > 0) {
			setAvatarFile(e.target.files[0]);
		}
	};
	if (id || id === '0') {
		return (
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='xl' titleId={id.toString()}>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id={id}>{item?.name || 'Edit Owner User'}</ModalTitle>
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
										borderRadius: '10px',
										backgroundSize: 'cover',
										backgroundPosition: 'center',
										position: 'relative'
									}}>
									{avatarFil ? (
										<img
											src={URL.createObjectURL(avatarFil)}
											alt='Avatar Preview'
											style={{
												width: '100%',
												height: '100%',
												borderRadius: '10px',
												objectFit: 'cover'
											}}
										/>
									) : editData?.mainAvatar ? (
										<img
											src={`https://datingapi.meander.software/assets/images/${editData.mainAvatar}`}
											alt='Avatar Preview'
											style={{
												width: '100%',
												height: '100%',
												borderRadius: '10px',
												objectFit: 'cover'
											}}
											onError={(e) => {
												// Hide image on error and show fallback
												e.currentTarget.style.display = 'none';
												e.currentTarget.nextElementSibling?.classList.remove('d-none');
											}}
										/>
									) : (
										<img
											src={img}
											alt='Default Owner Image'
											style={{
												width: '100%',
												height: '100%',
												borderRadius: '10px',
												objectFit: 'cover'
											}}
										/>
									)}
									<div
										className={`d-flex align-items-center justify-content-center ${avatarFil || editData?.mainAvatar ? 'd-none' : ''}`}
										style={{
											position: 'absolute',
											top: '50%',
											left: '50%',
											transform: 'translate(-50%, -50%)',
											width: '100%',
											height: '100%',
											borderRadius: '10px',
											backgroundColor: 'rgba(0,0,0,0.3)',
											color: 'white',
											fontSize: '12px',
											textAlign: 'center',
											padding: '10px'
										}}>
										<span>Owner Image</span>
									</div>
									<input
										type='file'
										accept='image/'
										id='avatarInput'
										name='image'
										style={{
											position: 'absolute',
											top: 0,
											left: 0,
											width: '100%',
											height: '100%',
											opacity: 0,
											cursor: 'pointer',
											borderRadius: '10px'
										}}
										onChange={(e: any) => handleAvatarChang(e)}
									/>

									<p className='mt-3 text-center' style={{marginTop: '130px !important'}}>Click on Image</p>
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
								<div className='errorMassage'>{formik.errors.name as any}</div>
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
								<div className='errorMassage'>{formik.errors.userName as any}</div>
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
								<div className='errorMassage'>{formik.errors.description as any}</div>
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
								<div className='errorMassage'>{formik.errors.dob as any}</div>
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
								<div className='errorMassage'>{formik.errors.phoneNumber as any}</div>
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
								<div className='errorMassage'>{formik.errors.email as any}</div>
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
								<div className='errorMassage'>{formik.errors.address as any}</div>
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
								<div className='errorMassage'>{formik.errors.iAm as any}</div>
							) : (
								<div />
							)}
						</FormGroup>




















						 

					</div>




				 




				</ModalBody>
				<ModalFooter className='px-4 pb-4'>
					<Button color='primary' isLight onClick={() => {
						formik.handleSubmit()
						setErrorHandling(true)
					}}>
						Update
					</Button>
				</ModalFooter>
			</Modal>

		);
	}
	return null;
};


EditUser.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default EditUser;
