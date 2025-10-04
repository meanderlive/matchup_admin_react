import React, { FC , useEffect  } from 'react';

import {   useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useDispatch  } from 'react-redux';
 import imgID from "../../../../assets/id.png";
import data from '../../../../common/data/dummyCustomerData';
import imgback from '../../../../assets/back (3).png'
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTabItem,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Avatar from '../../../../components/Avatar';
import Icon from '../../../../components/icon/Icon';
 
import useDarkMode from '../../../../hooks/useDarkMode';
import { getbyidusers } from '../../../../redux/Slice/UserManagement_slice';
import { BorderLeft } from '../../../../components/icon/material-icons';
import Button from '../../../../components/bootstrap/Button';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import Alert from '../../../../components/bootstrap/Alert';
import showNotification from '../../../../components/extras/showNotification';
 
 
interface ICustomerEditModalProps {
	dataaaa:any,
	setEditData:any,
	setEditModal:any,
	setEditId:any
}
const MainProfile: FC<ICustomerEditModalProps> = ({dataaaa,setEditId,setEditModal,setEditData}) => {


 
	const { id } = useParams();
	const dispatch = useDispatch()
	const serializedData:any = sessionStorage.getItem('Viewed_User_Data');

    // Convert the JSON string back to an object
    const deserializedData = JSON.parse(serializedData);

	const modeid = localStorage.getItem('modeid')
	 
	
	useEffect(() => {
		dispatch(getbyidusers(id) as any)
	}, [id, dispatch])
	const { darkModeStatus } = useDarkMode();
	
	
	
	 
	
	const lastIndex = dataaaa?.avatars?.length ? dataaaa.avatars.length - 1 : -1;






	 
	const itemData = data.filter((item) => item.id.toString() === '1');
	const item = itemData[0];
 
	const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'dark'];











	const formik = useFormik({
		initialValues: {
			formPrefix: 'Prof.',
			formName: 'Timothy',
			formMiddleName: 'John',
			formSurName: 'Doe',
			formEmailAddress: 'tjohndoe@site.com',
			formPhone: '2575637401',
			formAddressLine: '711-2880 Nulla St.',
			formAddressLine2: 'Mankato',
			formCity: 'Mississippi',
			formState: 'USA',
			formZIP: '96522',
			formCurrentPassword: '',
			formNewPassword: '',
			formConfirmNewPassword: '',
		},
		onSubmit: (values) => {
			// eslint-disable-next-line no-console
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Updated Information</span>
				</span>,
				JSON.stringify(values, null, 2),
			);
		},
	});
 
	return (
		 

				<div className='row' id='main_profile'>
					<div className='col-lg-12  row '>
						<Card className='shadow-3d-primary '>
							<CardBody>
								<div className='row g-5 py-3' style={{borderBottom:'1px solid #dee2e6'}}>
                                    <div className='col-sm-12 col-md-6 col-lg-5 col-xl-4 ' style={{borderRight:'1px solid #dee2e6'}}>

									<div className='d-flex justify-content-center'>
    <div style={{ position: 'relative' }}>
        <Avatar
            style={{ 
                borderRadius: '10px',
				border: dataaaa?.subscription ? '5px solid #ffd700' : '5px solid gray',
                position: 'relative', // Add this to position the pseudo-element
            }}
            src={dataaaa?.mainAvatar ? `https://datingapi.meander.software/assets/images/${dataaaa?.mainAvatar}` : imgback}
            isOnline={item.isOnline}
            onError={(e) => {
                // Fallback to default image if main avatar fails to load
                e.currentTarget.src = imgback;
            }}
        />
        { dataaaa?.subscription &&
        <div
            style={{
                position: 'absolute',
                top: '50%', // Adjust the top position as needed
                right: '-15px', // Adjust the right position as needed
                transform: 'translateY(-50%)',
                color: '#ffd700', // Golden color
                fontSize: '34px', // Adjust the font size as needed
            }}
        >
            &#9733; {/* Unicode character for a star */}
        </div>}
    </div>
</div>
									 
                                           
										<div className='row g-3 my-2    '>
											<div className='col-12'>
												<div className='d-flex align-items-center'style={{background:'#f0effb',padding:'10px',borderRadius:'15px'}}>
													<div className='flex-shrink-0'>
														<Icon
															icon='Mail'
															size='3x'
															color='primary'
														/>
													</div>
													<div className='flex-grow-1 ms-3' >
														<div className='fw-bold fs-5 mb-0'>
															{dataaaa?.email || 'John@gmail.com'}
														</div>
														<div className='text-muted'>
															Email Address
														</div>
													</div>
												</div>
                                                <div className='d-flex align-items-center my-3' style={{background:'#f0effb',padding:'10px',borderRadius:'15px'}}>
													<div className='flex-shrink-0'>
														<Icon
															icon='Phone'
															size='3x'
															color='primary'
                                                            />
													</div>
													<div className='flex-grow-1 ms-3' style={{background:'#f0effb',padding:'10px',borderRadius:'15px'}}>
													{dataaaa?.phoneNumber?
													
													<div className='fw-bold fs-5 mb-0'>
														({dataaaa?.phoneNumber.slice(0, 3)})-{dataaaa?.phoneNumber.slice(3, 7)}-{dataaaa?.phoneNumber.slice(7)}
                                                       
														</div>:	<div className='fw-bold fs-5 mb-0'>
														(555)-4444-333
                                                       
														</div>}
														<div className='text-muted'>
                                                        Phone Number
														</div>
													</div>
												</div>  
											</div>
											<div className='col-6'>
												<div className='d-flex align-items-center' style={{background:'#f0effb',padding:'10px',borderRadius:'15px'}}>
													<div className='flex-shrink-0'>
														<Icon
															icon={dataaaa?.iAm === 'Male' ? "Male" : "Female"}
															size='3x'
															color='primary'
														/>
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-5 mb-0'>
															{dataaaa?.iAm || 'Male'}
														</div>
														<div className='text-muted'>
															Gender
														</div>
													</div>
												</div>
											</div>
											<div className='col-6 '>
												<div className='d-flex align-items-center' style={{background:'#f0effb',padding:'10px',borderRadius:'15px'}}>
													<div className='flex-shrink-0'>
														<Icon
															icon='Person'
															size='3x'
															color='primary'
														/>
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-5 mb-0'>
															Father
														</div>
														<div className='text-muted'>
															Created by
														</div>
													</div>
												</div>
											</div>

											<div>

                                        
<CardHeader>
<CardLabel icon='StackedLineChart'>
<CardTitle tag='div' className='h5'>
Interest
</CardTitle>
</CardLabel>

</CardHeader>
<CardBody>
<div className='row'>
{dataaaa?.interest?.length ? dataaaa?.interest.map((item22: any, index: any) => (

	<div key={item22._id}  style={{margin:'2px'}}>

<Alert isLight className='border-0' shadow='md' icon={item22.icon} >
{item22?.name}
		</Alert>

{/* <div  className={`bg-${colors[index]} d-flex align-items-center justify-content-center` } style={{height:'40px', borderRadius:'15px'}}  >
<Icon icon={item22.icon} size='2x' className={`text-${colors[index-1]}`} />
{item22?.name}
</div> */}

	</div>
)):
<div>
<p className='text-danger'>User has not selected any interest</p>

</div>
}

</div>
</CardBody>
</div>
										</div>
                                        </div>
                                        <div className='col-sm-12 col-md-6 col-lg-7 col-xl-8 ' ><div style={{borderBottom:'1px solid #dee2e6'}}>

                                        <CardHeader>
					<CardLabel icon='Receipt'>
						<CardTitle tag='div' className='h5'>
							Bio
							
						</CardTitle>
					</CardLabel>
					<Button
						className='float-end '
						icon='Edit' color='primary' isLight onClick={() => {
							setEditData( deserializedData || dataaaa)
							setEditModal(true)
							setEditId(dataaaa?._id)
						}}>
							Edit
						</Button>
				</CardHeader>
				<CardBody>
				 
				{dataaaa?.description ?
					 
							<p>{dataaaa?.description}</p> :<p className='text-danger'>User has not Update Description</p>}
					 
				</CardBody>                                        
                                     
                            </div>


							<div>

                                        
<CardHeader>
<CardLabel icon='StackedLineChart'>
<CardTitle tag='div' className='h5'>
Details
</CardTitle>
</CardLabel>

</CardHeader>
<CardBody>
<div className='row'>
{dataaaa ?  


<div >
 
<Card hasTab>
	<CardTabItem id='profile' title='Profile' icon='Contacts'>
		 

		<Card
			className='rounded-2'
			tag='form'
			onSubmit={formik.handleSubmit}>
			<CardHeader>
				<CardLabel icon='Person'>
					<CardTitle>Other Details</CardTitle>
				</CardLabel>
			</CardHeader>
			<CardBody>
				<div className='row g-4'>
					<FormGroup
						className='col-md-2'
						 
						label=' Dob'>
						<Input
						 	value={dataaaa?.dob ? new Date(dataaaa.dob).toLocaleDateString('en-US') : '11/11/1999'}
						disabled
						/>
					</FormGroup>
					<FormGroup
						className='col-md-3'
					 
						label=' Marital'>
						<Input
							 type='text'
						disabled
							 
							value={dataaaa?.marital || 'Single'}
						/>
					</FormGroup>
					<FormGroup
						className='col-md-3'
						 
						label='Weight'>
						<Input
							placeholder='John'
							 disabled
							value= {dataaaa?.Weight || '135lb'}
						/>
					</FormGroup>
					<FormGroup
						className='col-md-4'
						 
						label=' Height'>
						<Input
							placeholder='Doe'
							 disabled
							value={dataaaa?.Height || '5.5Ft.'}
						/>
					</FormGroup>
					<div className='row col-12'>

					<FormGroup
						className='col-lg-6'
						 
						label='Diet Preferences'>
						<Input
							type='text'
							 
							disabled
							value={dataaaa?.DietPreferences || 'Any'}
						/>
					</FormGroup>
					<FormGroup
						className='col-lg-6'
						 
						label='Occupation'>
						<Input
							type='text'
							disabled
							value={dataaaa?.occupation || 'Developer'}
						/>
					</FormGroup>
					{modeid === '65943637acc570d6b14edf38' &&
<>
					<FormGroup
						className='col-lg-6'
						id='formPhone'
						label='Monthly Salary'>
						<Input
							type='text'
							disabled
							value={dataaaa?.salary || '2500$'}
							/>
					</FormGroup>
					<FormGroup
						className='col-lg-6'
						
						label='Religion'>
						<Input
							type='text'
							disabled
							value={dataaaa?.Religion || 'any'}
							/>
					</FormGroup>
					<FormGroup
						className='col-lg-6'
						
						label='Caste'>
						<Input
							type='text'
							disabled
							value={dataaaa?.Caste || 'any'}
							/>
					</FormGroup>
					<FormGroup
						className='col-lg-6'
						
						label=' Education'>
						<Input
							type='text'
							disabled
							value={dataaaa?.education || 'any'}
							/>
					</FormGroup>
					</>
					}
					</div>
				</div>
			</CardBody>
			 
		</Card>
		 
	</CardTabItem>
	<CardTabItem id='profile2' title='Password' icon='Lock'>
		<Card
			className='rounded-2'
			tag='form'
			onSubmit={formik.handleSubmit}>
			<CardHeader>
				<CardLabel icon='Lock'>
					<CardTitle>Change Password</CardTitle>
				</CardLabel>
			</CardHeader>
			<CardBody>
				<div className='row g-4'>
					<FormGroup
						className='col-lg-4'
						id='formCurrentPassword'
						label='Current Password'>
						<Input
							type='password'
							placeholder='Current Password'
							autoComplete='current-password'
							disabled
							value={formik.values.formCurrentPassword}
						/>
					</FormGroup>
					<div className='w-100 m-0' />
					<FormGroup
						className='col-lg-4'
						id='formNewPassword'
						label='New Password'>
						<Input
							type='password'
							placeholder='New Password'
							autoComplete='new-password'
							disabled
							value={formik.values.formNewPassword}
						/>
					</FormGroup>
					<div className='w-100 m-0' />
					<FormGroup
						className='col-lg-4'
						id='formConfirmNewPassword'
						label='Confirm New Password'>
						<Input
							type='password'
							placeholder='Confirm New Password'
							autoComplete='new-password'
							disabled
							value={formik.values.formConfirmNewPassword}
						/>
					</FormGroup>
				</div>
			</CardBody>
			 
		</Card>
	</CardTabItem>
	


	<CardTabItem id='address' title='Address' icon='HolidayVillage'>
		<Card
			className='rounded-2'
			tag='form'
			onSubmit={formik.handleSubmit}>
			<CardHeader>
				<CardLabel icon='HolidayVillage'>
					<CardTitle>Address Information</CardTitle>
				</CardLabel>
			</CardHeader>
			<CardBody>
				<div className='row g-4'>
					<FormGroup
						className='col-12'
						id='formAddressLine'
						label='Address Line'>
						<Input
							placeholder='Address Line'
							autoComplete='address-line1'
							disabled
							value={formik.values.formAddressLine}
						/>
					</FormGroup>
					<FormGroup
						className='col-12'
						id='formAddressLine2'
						label='Address Line 2'>
						<Input
							placeholder='Address Line 2'
							autoComplete='address-line2'
							disabled
							value={formik.values.formAddressLine2}
						/>
					</FormGroup>
					<FormGroup
						className='col-md-6'
						id='formCity'
						label='City'>
						<Input
							placeholder='City'
							autoComplete='address-level2'
							disabled
							value={formik.values.formCity}
						/>
					</FormGroup>
					<FormGroup
						className='col-md-4'
						id='formState'
						label='State'>
						<Input
							placeholder='State'
							autoComplete='country-name'
							disabled
							value={formik.values.formState}
						/>
					</FormGroup>
					<FormGroup
						className='col-md-2'
						id='formZIP'
						label='ZIP Code'>
						<Input
							placeholder='ZIP'
							autoComplete='postal-code'
							disabled
							value={formik.values.formZIP}
						/>
					</FormGroup>
				</div>
			</CardBody>
		 
		</Card>
	</CardTabItem>


	{ modeid === '65943637acc570d6b14edf38' ?
	<CardTabItem id='profile3' title='Family Details' icon='Lock'>
		<Card
			className='rounded-2'
			tag='form'
			 >
			<CardHeader>
				<CardLabel icon='Lock'>
					<CardTitle>Family Details</CardTitle>
				</CardLabel>
			</CardHeader>
			<CardBody>
				<div className='row '>
					<FormGroup
						 className='col-md-6'
						label='Family Status'>
						<Input
							type='text'
							 disabled
							value='Good'
						/>
					</FormGroup>
					 
					<FormGroup
					className='col-md-6'
						label='Father Name'>
						<Input
							type='text'
							 disabled
							value='Jhon Deo'
						/>
					</FormGroup>
					
					<FormGroup
						 className='col-md-6'
						label='Father Status'>
						<Input
							type='text'
							 disabled
							value='Good'
						/>
					</FormGroup>
					 
					<FormGroup
					className='col-md-6'
						label='Mother Name'>
						<Input
							type='text'
							 disabled
							value='Elvin'
						/>
					</FormGroup>
					
					 
					<FormGroup
					className='col-md-6'
						label='No of Bothers'>
						<Input
							type='text'
							 disabled
							value='2'
						/>
					</FormGroup>
					<FormGroup
						 className='col-md-6'
						label='Of Which Married'>
						<Input
							type='text'
							 disabled
							value='1'
						/>
					</FormGroup>
					<FormGroup
						 className='col-md-6'
						label='No of Sister'>
						<Input
							type='text'
							 disabled
							value='2'
						/>
					</FormGroup>
					<FormGroup
						 className='col-md-6'
						label='Of Which Married'>
						<Input
							type='text'
							 disabled
							value='1'
						/>
					</FormGroup>
					<FormGroup
						 className='col-md-6'
						label='Govt ID Proof'>
						 <img src={imgID} alt="ID Govt Proof"   />
					</FormGroup>
				</div>
			</CardBody>
			 
		</Card>
	</CardTabItem>:<div/>
}
	
</Card>
</div>



:
<div>
<p className='text-danger'>User has not Update Family Datails</p>

</div>
}

</div>
</CardBody>
</div>
                           
                                        </div>
								</div>
							</CardBody>
						 
						 
						</Card>
					</div>
					 
				</div>
 
	);
};

export default MainProfile;
