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
	const [intersetArray,setIntersetArray]=useState<any >(editData?.interest)
	const [errorHandling, setErrorHandling] = useState(false);
	//    yup
	const [avatarFil, setAvatarFile] = useState<any>(null);


		 
	const stateinterest = useSelector((statee:any)=>statee.interest)
	console.log(stateinterest.interset.data)
	const dataa:any = stateinterest.interset.data
   useEffect(()=>{
     dispatch(getAllInterest(modeid)as any)
   },[dispatch,modeid])
   const handleActiveInteset =(idd:any)=>{
	const data2 =	intersetArray.includes(idd)
		if(data2){
			const updatedArray = intersetArray.filter((itema:any) => itema !== idd);
			setIntersetArray(updatedArray);
		}else{
			setIntersetArray([...intersetArray,idd])
        
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
		looking: Yup.string().required('required'),
		marital: Yup.string().required('required'),
		 
	});
 
	const formik = useFormik({
		initialValues: {
			
			name: editData?.name || '',
			password: 'Test@123',
			email: editData?.email || '',
			dob: moment(editData?.dob).format("YYYY-MM-DD") || '', 
			address: editData?.address || '',
			phone_number: '0123456789',
			iAm: editData?.iAm || '', // Assuming it's one of these two values
			looking: editData?.looking || '', // Assuming it's one of these two values
			marital: editData?.marital || '', // Assuming it's one of these four values
			status: 'Active',
			Height: editData?.Height || '',
			Weight: editData?.Weight || '',
			occupation: editData?.occupation || '',
			phoneNumber:editData?.phoneNumber || '',
			salary: editData?.salary || '',
			DietPreferences: editData?.DietPreferences || '',
			NumberofSiblings: editData?.NumberofSiblings || '',
			FamilyBackground: editData?.FamilyBackground || '',
			education: editData?.education || '',
			Religion: editData?.Religion || '',
			Caste: editData?.Caste || '',
			sexuality: 'Heterosexual',
			SmokingandDrinkingHabits:editData?.SmokingandDrinkingHabits || 'Yes',
			interest:intersetArray || '',
			subscription: false,
		 
		},
		enableReinitialize: true,
		validationSchema: userValidation,

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values:any) => {
			console.log(values);
			try {
				setErrorHandling(true);
				dispatch(fetchupdateUser({editId, values}) as any);
				if(ApiTrue){
					const imageid = editId
					createProfile({imageid,avatarFil})

				}
			} catch (error) {
			} finally {
				dispatch(fetchUser({ modeid }) as any);  
				setAvatarFile(null)
			}
			setIsOpen(false);
			showNotification(
				<span className='d-flex align-items-center '>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Added Successfully</span>
				</span>,
				'User has been Added successfully',
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
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='xl' titleId={id.toString()}>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id={id}>{item?.name || 'Edit User'}</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
				<div className='row g-4'>
						<div
							className='col-md-6'
							style={{ display: 'flex', justifyContent: 'center' }}>
							<label htmlFor='avatarInput'>
								<div
									style={{
										border: '1px solid gray',
										width: '120px',
										height: '120px',
										borderRadius: '50%',
										backgroundSize: 'cover',
										backgroundPosition: 'center',
									}}>
									{avatarFil ? (
										<img
											src={URL.createObjectURL(avatarFil)}
											alt='Avatar Preview'
											style={{
												width: '100%',
												height: '100%',
												borderRadius: '50%',
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
												borderRadius: '50%',
												objectFit: 'cover'
											}}
											onError={(e) => {
												// Hide image on error and show fallback
												e.currentTarget.style.display = 'none';
												e.currentTarget.nextElementSibling?.classList.remove('d-none');
											}}
										/>
									) : null}
									<div
										className={`bg-l${
											darkModeStatus
												? 'o25'
												: '25'
										}-${getColorNameWithIndex(0,
										)} text-${getColorNameWithIndex(0,
										)} d-flex align-items-center justify-content-center ${avatarFil || editData?.mainAvatar ? 'd-none' : ''}`}
										style={{
											width: '100%',
											height: '100%',
											borderRadius: '50%',
										}}>
										<span className='fw-bold'>
											{getFirstLetter(formik.values.name || editData?.name || 'U')}
										</span>
									</div>
									
											
										
										<input
											type='file'
											accept='image/'
											id='avatarInput'
											style={{
												width: '100%',
												height: '100%',
												opacity: 0,
												// position: 'absolute',
												// top: 0,
												// left: 0,
												cursor: 'pointer',
											}}
											onChange={(e: any) => handleAvatarChang(e)}
										/>
									{/* <Button
											icon='Edit'
											style={{
												position: 'absolute',
												top: '67%',
												right: '55%',
											}}
										/> */}
								</div>
							</label>
						</div>
						<div className='col-md-6 row  '>

						<FormGroup id='name' label='Name *' className='col-md-6'>
							<Input
								name='name'
								onChange={formik.handleChange}
								value={formik.values.name}
							/>
							{errorHandling && formik.errors.name ? (
												<div className='errorMassage'>Name is required</div>
											) : (
												<div />
											)}
							
						</FormGroup>

						<FormGroup id='email' label='Email *' className='col-md-6'>
							<Input
								name='email'
								type='email'
								onChange={formik.handleChange}
								value={formik.values.email}
							/>
{errorHandling && formik.errors.email ? (
												<div className='errorMassage'>Email is required</div>
											) : (
												<div />
											)}
                      </FormGroup>
							<FormGroup label='I am a *' className='col-6'>
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
												<div className='errorMassage'>I Am is required</div>
											) : (
												<div />
											)}
							</FormGroup>
							<FormGroup label='Looking for *' className='col-6'>
								<select
									id='looking'
									className='form-select'
									name='looking'
									value={formik.values.looking}
									onChange={formik.handleChange}>
									<option value='' disabled>
										...Select...
									</option>
									<option value='Male'>Male</option>
									<option value='Female'>Female</option>
								</select>
								{errorHandling && formik.errors.looking ? (
												<div className='errorMassage'>Looking is required</div>
											) : (
												<div />
											)}
							</FormGroup>
						</div>
					</div>
					<div className='row g-4'>

						<FormGroup id='dob' label='Birthday *' className='col-md-3'>
							<Input
								name='dob'
								type='date'
								onChange={formik.handleChange}
								value={formik.values.dob}
							/>
						{errorHandling && formik.errors.dob ? (
												<div className='errorMassage'>Date of birth is required</div>
											) : (
												<div />
											)}
						</FormGroup>
						<FormGroup id='education' label='Education' className='col-md-3'>
							<Input
								name='education'
								type='text'
								onChange={formik.handleChange}
								value={formik.values.education}
							/>
						
						</FormGroup>
						

						<FormGroup label='Marial status *' className='col-md-3'>
							<select
								id='marital'
								className='form-select'
								name='marital'
								value={formik.values.marital}
								onChange={formik.handleChange}>
								<option value='' disabled>
									...Select...
								</option>
								<option value='Single'>Single</option>
								<option value='Married'>Married</option>
							</select>
							{errorHandling && formik.errors.marital ? (
												<div className='errorMassage'>Martial Status is required</div>
											) : (
												<div />
											)}
						</FormGroup>
						<FormGroup id='address' label='City *' className='col-md-3'>
							<Input
								name='address'
								onChange={formik.handleChange}
								value={formik.values.address}
							/>
{errorHandling && formik.errors.address ? (
												<div className='errorMassage'>Address is required</div>
											) : (
												<div />
											)}
							
						</FormGroup>
						<FormGroup label='Height' className='col-md-3'>
							<select
								id='Height'
								className='form-select'
								name='Height'
								value={formik.values.Height}
								onChange={formik.handleChange}>
								<option value='' disabled>
									...Select...
								</option>
								{heightArray.map((itemArray: any, index: any) => (
									<option value={itemArray}>
										{itemArray}
									</option>
								))}
							</select>
							
						</FormGroup>

						<FormGroup label='Weight' className='col-md-3'>
							<select
								id='Weight'
								className='form-select'
								name='Weight'
								value={formik.values.Weight}
								onChange={formik.handleChange}>
								<option value='' disabled>
									...Select...
								</option>
								{WeightArray.map((itemWeight: any, index: any) => (
									<option  value={itemWeight}>
										{itemWeight}
									</option>
								))}
							</select>
						
						</FormGroup>

						<FormGroup id='occupation' label='occupation' className='col-md-3'>
							<Input
								name='occupation'
								onChange={formik.handleChange}
								value={formik.values.occupation}
							/>
							
						</FormGroup>
						<FormGroup id='phoneNumber' label='Phone No *' className='col-md-3'>
											<Input
												name='phoneNumber'
												type='text'
												onChange={formik.handleChange}
												value={formik.values.phoneNumber}
											/>
											{errorHandling && formik.errors.phoneNumber ? (
												<div className='errorMassage'>Phone no. is required</div>
											) : (
												<div />
											)}
										</FormGroup>
						<FormGroup label='NumberofSiblings' className='col-md-3'>
							<select
								id='NumberofSiblings'
								className='form-select'
								name='NumberofSiblings'
								value={formik.values.NumberofSiblings}
								onChange={formik.handleChange}>
								<option value='' disabled>
									...Select...
								</option>
								{NumberofSiblingsArray.map((itemSiblings: any, index: any) => (
									<option  value={itemSiblings}>
										{itemSiblings}
									</option>
								))}
							</select>
						
						</FormGroup>
						<FormGroup id='Religion' label='Religion' className='col-md-3'>
							<Input
								name='Religion'
								onChange={formik.handleChange}
								value={formik.values.Religion}
							/>
						
						</FormGroup>
						<FormGroup id='Caste' label='Caste' className='col-md-3'>
							<Input
								name='Caste'
								onChange={formik.handleChange}
								value={formik.values.Caste}
							/>
							
						</FormGroup>
						<FormGroup
							id='DietPreferences'
							label='DietPreferences'
							className='col-md-3'>
							<Input
								name='DietPreferences'
								onChange={formik.handleChange}
								value={formik.values.DietPreferences}
							/>
							
						</FormGroup>

						

						<FormGroup label='Smoking and Drinking' className='col-md-3'>
							<select
								id='SmokingandDrinkingHabits'
								className='form-select'
								name='SmokingandDrinkingHabits'
								value={formik.values.SmokingandDrinkingHabits}
								onChange={formik.handleChange}>
								<option value='' disabled>
									...Select...
								</option>

								<option value='Yes'>YES</option>
								<option value='No'>NO</option>
							</select>
						
						</FormGroup>
						<div className='col-12'>
						<div className='row g-4'>
						<FormGroup label='Interest *' className=' row'>
{dataa && dataa.map((itemm:any,index:Number)=>(

<div

className='col-md-3 col-lg-2 col-xl-1  col-4 p-2'
key={itemm._id}
>
<Button  onClick={()=>handleActiveInteset(itemm._id)as any}
color='info'

isActive={ intersetArray.includes(itemm._id)}	
isLight
icon={itemm.icon}
tag='a'

>
{itemm?.name}
</Button>


	


</div>
))}
</FormGroup>
</div>
						</div>
					</div>
				</ModalBody>
				<ModalFooter className='px-4 pb-4'>
					<Button color='info' onClick={()=>{
						formik.handleSubmit()
					setErrorHandling(true)}}>
						Save
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
