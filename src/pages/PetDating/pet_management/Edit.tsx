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
import { createPet, fetchPet, fetchupdatePet } from '../../../redux/Slice/PetsManagement';
import img from '../../../assets/Dogs.jpg';
import { createProfile } from '../../../redux/Api/PetApi';
import { getColorNameWithIndex } from '../../../common/data/enumColors';
import { getFirstLetter } from '../../../helpers/helpers';
import useDarkMode from '../../../hooks/useDarkMode';
import { getAllInterest } from '../../../redux/Slice/IntersetSlice';
import { fetchUser } from '../../../redux/Slice/UserManagement_slice';

interface ICustomerEditModalProps {
	editId: any;
	editData: any;
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}
const EditPet: FC<ICustomerEditModalProps> = ({ id, isOpen, editId, editData, setIsOpen }) => {
	const { darkModeStatus } = useDarkMode();
	const stateUser: any = useSelector((state: any) => state.user.users.data)
	const itemData = id ? data.filter((item) => item.id.toString() === id.toString()) : {};
	const item = id && Array.isArray(itemData) ? itemData[0] : {};
	const dispatch = useDispatch();
	const modeid = localStorage.getItem('modeid');
	const [intersetArray,setIntersetArray]=useState<any >(editData?.interest);
	const [errorHandling, setErrorHandling] = useState(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [avatarFil, setAvatarFile] = useState<any>(null);


		 
	const stateinterest = useSelector((statee:any)=>statee.interest)
	const dataa:any = stateinterest.interset.data





   useEffect(()=>{
	dispatch(fetchUser({ modeid, currentPage }) as any)
     dispatch(getAllInterest(modeid)as any)
   },[dispatch,modeid,currentPage])



   const handleActiveInteset =(idd:any)=>{
	const data2 =	intersetArray.includes(idd)
		if(data2){
			const updatedArray = intersetArray.filter((itema:any) => itema !== idd);
			setIntersetArray(updatedArray);
		}else{
			setIntersetArray([...intersetArray,idd])
        
		}
	}

	 
 

 
	const PetValidation = Yup.object().shape({
		petName: Yup.string().required('Name is required'),
		petAge: Yup.string().required('Dob is required'),
		 
	});
 
	const formik = useFormik({
		initialValues: {
			
			avtarInput: '',
            user: editData?.user?._id || '',
			petName:editData?.petName || '',
			petAge:editData?.petAge || '',
			petGender:editData?.petGender || '',
			petBreed:editData?.petBreed || '',
			image:editData?.image || '',
			mode:editData?.mode?._id || '',
			description:editData?.description || '',
			petType:editData?.petType || '',
			interest:intersetArray || '',
			subscription: false,
 
		 
		},
		enableReinitialize: true,
		validationSchema: PetValidation,

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values:any) => {
			console.log(values);
			try {
				setErrorHandling(true);
				dispatch(fetchupdatePet({editId, values}) as any);
				if(ApiTrue){
					const imageid = editId
					createProfile({imageid,avatarFil})

				}
			} catch (error) {
			} finally {
				dispatch(fetchPet({ modeid }) as any);
				setAvatarFile(null)
			}
			setIsOpen(false);
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Added Successfully</span>
				</span>,
				'Pet has been Added successfully',
			);
		},
	});
	const [ApiTrue,setApiTrue]=useState(false)
	const handleAvatarChang = (e: any) => {

		setApiTrue(true)
	 
		setAvatarFile(e.target.files[0]);
		if (e.target.files && e.target.files.length > 0) {
			setAvatarFile(e.target.files[0]);
		}
	};
	if (id || id === '0') {
		return (
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='md' titleId={id.toString()}>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id={id}>{editData?.petName || 'Edit Pet'}</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
				
				<div className='row g-4 align-items-center' style={{ }}>

<FormGroup
label='Add Profile Picture *'
className='col-md-12'
style={{ display: 'flex', justifyContent: 'center' }}>


<label htmlFor='avatarInput' style={{margin: '47px 0px 0px -120px'}}>
 
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
		) : editData?.image ? (
			<img
				src={`https://datingapi.meander.software/assets/images/${editData.image}`}
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
				alt='Default Pet Image'
				style={{
					width: '100%',
					height: '100%',
					borderRadius: '10px',
					objectFit: 'cover'
				}}
			/>
		)}
		<div
			className={`d-flex align-items-center justify-content-center ${avatarFil || editData?.image ? 'd-none' : ''}`}
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
			<span>Pet Image</span>
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
			<FormGroup id='petName' label='Name *' className='col-md-12'>
				<Input
					name='petName'
					onChange={formik.handleChange}
					value={formik.values.petName}
				/>
				{errorHandling && formik.errors.petName ? (
					<div className='errorMassage'>{formik.errors.petName as any} </div>
				) : (
					<div />
				)}
			</FormGroup>
			<FormGroup id='petGender' label='Pet Gender *' className='col-md-12'>
				<Input
					name='petGender'
					onChange={formik.handleChange}
					value={formik.values.petGender}
				/>
				{errorHandling && formik.errors.petGender ? (
					<div className='errorMassage'>{formik.errors.petGender as any}</div>
				) : (
					<div />
				)}
			</FormGroup>
			<FormGroup label='Pet Type *' className='col-md-12'>
											<select
												id='petType'
												className='form-select'
												name='petType'
												value={formik.values.petType}
												onChange={formik.handleChange}>
												<option value='' disabled>
													...Select...
												</option>
												 

													<option  value='Cat'>Cat</option>
													<option  value='Dog'>Dog</option>

												 
											 
											</select>
											{errorHandling && formik.errors.petType ? (
												<div className='errorMassage'>{formik.errors.petType as any}</div>
											) : (
												<div />
											)}
										</FormGroup>
			<FormGroup id='petBreed' label='Pet 	Breed *' className='col-md-12'>
				<Input
					name='petBreed'
					onChange={formik.handleChange}
					value={formik.values.petBreed}
				/>
				{errorHandling && formik.errors.petBreed ? (
					<div className='errorMassage'>{formik.errors.petBreed as any}</div>
				) : (
					<div />
				)}
			</FormGroup>
			
			<FormGroup label='Owner Name *' className='col-md-12	'>
				<select
					id='user'
					className='form-select'
					name='user'
					value={formik.values.user}
					onChange={formik.handleChange}>
					<option value='' disabled>
						...Select...
					</option>
					{stateUser && stateUser.map((itemUser:any,index:any)=>(

						<option key={itemUser._id} value={itemUser._id}>{itemUser.name}</option>
					))

					}
				 
				</select>
				{errorHandling && formik.errors.user ? (
					<div className='errorMassage'>{formik.errors.user as any}</div>
				) : (
					<div />
				)}
			</FormGroup>
			<FormGroup id='petAge' label='Pet Age' className='col-md-12'>
				<Input
					name='petAge'
					type='text'
					onChange={formik.handleChange}
					value={formik.values.petAge}
				/>
				{errorHandling && formik.errors.petAge ? (
					<div className='errorMassage'>{formik.errors.petAge as any}</div>
				) : (
					<div />
				)}
			</FormGroup>
			<FormGroup id='description' label='Description' className='col-md-12'>
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
		 
		
			 
		 
		</div>
 


 



<div className='row g-4'  >

<FormGroup label='Interest *' className='row g-4 col-md-12'>
	{dataa && dataa.map((item22:any,index:Number)=>(

<div

className='col-md-12 col-lg-6 col-xl-4   p-2'
key={item22._id}
>
<Button  onClick={()=>handleActiveInteset(item22._id)as any}
color='info'

isActive={ intersetArray.includes(item22._id) }	
isLight
icon={item22.icon}
tag='a'

>
{item22?.name}
</Button>


		

 
</div>
 ))}
</FormGroup>
 
</div>

				</ModalBody>
				<ModalFooter className='px-4 pb-4'>
					<Button color='info' onClick={()=>{
						formik.handleSubmit()
					setErrorHandling(true)}}>
						Update
					</Button>
				</ModalFooter>
			</Modal>
		
		);
	}
	return null;
};
	

EditPet.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default EditPet;
