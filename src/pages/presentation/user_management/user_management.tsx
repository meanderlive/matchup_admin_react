import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import { getFirstLetter, priceFormat } from '../../../helpers/helpers';
import data from '../../../common/data/dummyCustomerData';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import PAYMENTS from '../../../common/data/enumPaymentMethod';
import useSortableData from '../../../hooks/useSortableData';
import InputGroup, { InputGroupText } from '../../../components/bootstrap/forms/InputGroup';
import Popovers from '../../../components/bootstrap/Popovers';
// import CustomerEditModal from './CustomerEditModal';
import { getColorNameWithIndex } from '../../../common/data/enumColors';
import useDarkMode from '../../../hooks/useDarkMode';
// import add_user_management from './ADD'
import Add from './ADD';
import ADDMatrimonial from './ADDMatrimonial'
import Edit_User from './Edit_user';
import OrderDeleteModal from './Delete_user';
import { fetchUser, fetchsearchUser, fetchsortUser, fetchupdateUser, searchUserbyAges, setPage } from '../../../redux/Slice/UserManagement_slice';

import ActiveUser from './ActiveUser';
import { updatestatus } from '../../../redux/Api/UserManagement';
import Label from '../../../components/bootstrap/forms/Label';
import Select from '../../../components/bootstrap/forms/Select';
import imgback from '../../../assets/back (3).png';
import UserProfileOverview from './UserProfileOverview';

const UserManagement = () => {
	const { darkModeStatus } = useDarkMode();
	const [searchUser, setSearcUser] = useState<any>('')
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const [editModal, setEditModal] = useState<boolean>(false);
	const [editData, setEditData] = useState<any>('')
	const [deleteModal, setDeleteModal] = useState<boolean>(false);
	const [deleteId, setDeleteid] = useState<any>('')
	const [editId, setEditId] = useState<any>('')

	const [viewUser, setViewUser] = useState<any>(false)
	const [viewData, setViewdata] = useState<any>('')
	const [showProfileOverview, setShowProfileOverview] = useState(false)
	const [selectedUserForOverview, setSelectedUserForOverview] = useState<any>(null)
	const [filterData, setFilterData] = useState<any>({
		gender: '',
		minAge: '',
		maxAge: '',
		registrationDate: '',
		profileType: '',
		verificationStatus: '',
		accountStatus: '',
		location: '',
		username: '',
		email: '',
		suspended: '',
		deleted: '',
		profileVisibility: '',
		subscriptionStatus: '',
		lastLoginDate: '',
		activityLevel: ''
	})
	
	// Bulk actions state
	const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
	const [selectAll, setSelectAll] = useState(false);
	const [bulkActionModal, setBulkActionModal] = useState(false);


	const handleFilterData = (e: any) => {
		setFilterData({ ...filterData, [e.target.name]: e.target.value })


	}

	const [filterMenu, setFilterMenu] = useState<boolean>(false);
	const handleStatus = async (idedi: any, status: any) => {

		await updatestatus({ editId: idedi, status })
		await dispatch(fetchUser({ modeid, currentPage }) as any);
	}

	const modeid = localStorage.getItem('modeid')
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setPage(currentPage) as any)

		dispatch(fetchUser({ modeid, currentPage }) as any)
	}, [dispatch, modeid, currentPage])

	const stateUser: any = useSelector((state: any) => state.user)



	// Create a shallow copy using slice and then reverse the copy
	const reversedDataa = stateUser?.users?.data;
	console.log(reversedDataa);


	const formik = useFormik({
		initialValues: {
			searchInput: '',
			payment: Object.keys(PAYMENTS).map((i) => PAYMENTS[i].name),
			minPrice: '',
			maxPrice: '',
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2));
		},
	});



	const filteredData = reversedDataa ? reversedDataa.filter((f: any) => {
		const searchTerm = searchUser.toLowerCase();
		return (
			f.name?.toLowerCase().includes(searchTerm) ||
			f.email?.toLowerCase().includes(searchTerm) ||
			f.address?.toLowerCase().includes(searchTerm) ||
			f.phoneNumber?.includes(searchTerm)
		);
	}) : [];
	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData.reverse());

	const handleSearch = (e: any) => {
		const inputValue = e.target.value
		setSearcUser(inputValue)
		if (inputValue.trim() === '') {
			dispatch(fetchUser({ modeid, currentPage }) as any)

		} else {

			dispatch(fetchsearchUser(inputValue) as any)
		}
	}

	const handleFilter = () => {
		dispatch(searchUserbyAges(filterData) as any)
	}

	// Bulk actions handlers
	const handleSelectUser = (userId: string) => {
		if (selectedUsers.includes(userId)) {
			setSelectedUsers(selectedUsers.filter(id => id !== userId));
		} else {
			setSelectedUsers([...selectedUsers, userId]);
		}
	}

	const handleSelectAll = () => {
		if (selectAll) {
			setSelectedUsers([]);
		} else {
			const allUserIds = reversedDataa ? reversedDataa.map((user: any) => user._id) : [];
			setSelectedUsers(allUserIds);
		}
		setSelectAll(!selectAll);
	}

	const handleViewProfileOverview = (user: any) => {
		setSelectedUserForOverview(user);
		setShowProfileOverview(true);
	};

	const handleBulkAction = (action: string) => {
		if (selectedUsers.length === 0) return;
		
		switch (action) {
			case 'delete':
				// Handle bulk delete
				console.log('Bulk delete users:', selectedUsers);
				break;
			case 'block':
				// Handle bulk block
				console.log('Bulk block users:', selectedUsers);
				break;
			case 'notify':
				// Handle bulk notification
				console.log('Bulk notify users:', selectedUsers);
				break;
			case 'activate':
				// Handle bulk activate
				console.log('Bulk activate users:', selectedUsers);
				break;
			case 'suspend':
				// Handle bulk suspend
				console.log('Bulk suspend users:', selectedUsers);
				break;
			case 'verify':
				// Handle bulk verify
				console.log('Bulk verify users:', selectedUsers);
				break;
			case 'premium':
				// Handle bulk upgrade to premium
				console.log('Bulk upgrade to premium:', selectedUsers);
				break;
			case 'export':
				// Handle bulk export data
				console.log('Bulk export data:', selectedUsers);
				break;
		}
		setBulkActionModal(false);
		setSelectedUsers([]);
		setSelectAll(false);
	}


	const calculateAge = (dobString: any) => {
		const today = new Date();
		const birthDate = new Date(dobString);

		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDiff = today.getMonth() - birthDate.getMonth();

		if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
			age -= 1; // Alternative to age--
		}

		return age;
	};



	return (
		<PageWrapper title={demoPagesMenu.crm.subMenu.customersList.text}>
			<span className='display-5 fw-bold my-3 mx-3 ' >Profile Management</span>

			<SubHeader>
				<SubHeaderLeft>
					<label
						className='border-0 bg-transparent cursor-pointer me-0'
						htmlFor='searchInput'>
						<Icon icon='Search' size='2x' color='primary' />
					</label>
					<Input
						id='searchInput'
						type='search'
						className='border-0 shadow-none bg-transparent'
						placeholder='Search by username, email, location, name...'
						onChange={(e) => handleSearch(e)}
						value={searchUser}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>

					<Dropdown isOpen={filterMenu} setIsOpen={setFilterMenu}>
						<DropdownToggle hasIcon={false}>
							<Button icon='FilterAlt' color='primary' isLight>
								Filter



							</Button>
						</DropdownToggle>
						<DropdownMenu isAlignmentEnd size='lg' isCloseAfterLeave={false}>
							<div className='container py-2'>
								<form className='row g-3' onSubmit={formik.handleSubmit}>
									<div className='col-12'>
										<FormGroup>
											<Label htmlFor='minAge'>Age Range</Label>
											<InputGroup>
												<Input
													id='minAge'
													name='minAge'
													ariaLabel='Minimum age'
													placeholder='Min Age'
													type='number'
													onChange={handleFilterData}
													value={filterData.minAge}
												/>
												<InputGroupText>to</InputGroupText>
												<Input
													id='maxAge'
													name='maxAge'
													ariaLabel='Maximum age'
													placeholder='Max Age'
													type='number'
													onChange={handleFilterData}
													value={filterData.maxAge}
												/>
											</InputGroup>
										</FormGroup>
									</div>
									<div className='col-12'>
										<FormGroup>
											<Label htmlFor='gender'>Gender</Label>
											<Select
												id='gender'
												name='gender'
												ariaLabel='Gender'
												placeholder='Select Gender'
												list={[
													{ value: 'male', text: 'Male' },
													{ value: 'female', text: 'Female' },
													{ value: 'other', text: 'Other' },
												]}
												onChange={handleFilterData}
												value={filterData.gender}
											/>
										</FormGroup>
									</div>
									<div className='col-12'>
										<FormGroup>
											<Label htmlFor='profileType'>Profile Type</Label>
											<Select
												id='profileType'
												name='profileType'
												ariaLabel='Profile Type'
												placeholder='Select Profile Type'
												list={[
													{ value: 'free', text: 'Free' },
													{ value: 'subscribed', text: 'Subscribed' },
													{ value: 'premium', text: 'Premium' },
												]}
												onChange={handleFilterData}
												value={filterData.profileType}
											/>
										</FormGroup>
									</div>
									<div className='col-12'>
										<FormGroup>
											<Label htmlFor='accountStatus'>Account Status</Label>
											<Select
												id='accountStatus'
												name='accountStatus'
												ariaLabel='Account Status'
												placeholder='Select Account Status'
												list={[
													{ value: 'active', text: 'Active' },
													{ value: 'inactive', text: 'Inactive' },
													{ value: 'blocked', text: 'Blocked' },
													{ value: 'suspended', text: 'Suspended' },
													{ value: 'deleted', text: 'Deleted' },
												]}
												onChange={handleFilterData}
												value={filterData.accountStatus}
											/>
										</FormGroup>
									</div>
									<div className='col-12'>
										<FormGroup>
											<Label htmlFor='verificationStatus'>Verification Status</Label>
											<Select
												id='verificationStatus'
												name='verificationStatus'
												ariaLabel='Verification Status'
												placeholder='Select Verification Status'
												list={[
													{ value: 'verified', text: 'Verified' },
													{ value: 'unverified', text: 'Unverified' },
													{ value: 'pending', text: 'Pending' },
												]}
												onChange={handleFilterData}
												value={filterData.verificationStatus}
											/>
										</FormGroup>
									</div>
									<div className='col-12'>
										<FormGroup>
											<Label htmlFor='registrationDate'>Registration Date</Label>
											<Input
												id='registrationDate'
												name='registrationDate'
												type='date'
												onChange={handleFilterData}
												value={filterData.registrationDate}
											/>
										</FormGroup>
									</div>
									<div className='col-12'>
										<FormGroup>
											<Label htmlFor='location'>Location</Label>
											<Input
												id='location'
												name='location'
												placeholder='Enter location'
												onChange={handleFilterData}
												value={filterData.location}
											/>
										</FormGroup>
									</div>
									<div className='col-md-6 mb-3'>
										<FormGroup>
											<Label htmlFor='username'>Username</Label>
											<Input
												id='username'
												name='username'
												placeholder='Enter username'
												onChange={handleFilterData}
												value={filterData.username}
											/>
										</FormGroup>
									</div>
									<div className='col-md-6 mb-3'>
										<FormGroup>
											<Label htmlFor='suspended'>Suspended Status</Label>
											<Select
												id='suspended'
												name='suspended'
												placeholder='Select Status'
												ariaLabel='Suspended Status'
												value={filterData.suspended}
												onChange={handleFilterData}>
												<option value=''>All</option>
												<option value='true'>Suspended</option>
												<option value='false'>Not Suspended</option>
											</Select>
										</FormGroup>
									</div>
									<div className='col-md-6 mb-3'>
										<FormGroup>
											<Label htmlFor='deleted'>Deleted Status</Label>
											<Select
												id='deleted'
												name='deleted'
												placeholder='Select Status'
												ariaLabel='Deleted Status'
												value={filterData.deleted}
												onChange={handleFilterData}>
												<option value=''>All</option>
												<option value='true'>Deleted</option>
												<option value='false'>Active</option>
											</Select>
										</FormGroup>
									</div>
									<div className='col-md-6 mb-3'>
										<FormGroup>
											<Label htmlFor='profileVisibility'>Profile Visibility</Label>
											<Select
												id='profileVisibility'
												name='profileVisibility'
												placeholder='Select Visibility'
												ariaLabel='Profile Visibility'
												value={filterData.profileVisibility}
												onChange={handleFilterData}>
												<option value=''>All</option>
												<option value='public'>Public</option>
												<option value='private'>Private</option>
												<option value='friends'>Friends Only</option>
											</Select>
										</FormGroup>
									</div>
									<div className='col-md-6 mb-3'>
										<FormGroup>
											<Label htmlFor='subscriptionStatus'>Subscription Status</Label>
											<Select
												id='subscriptionStatus'
												name='subscriptionStatus'
												placeholder='Select Subscription'
												ariaLabel='Subscription Status'
												value={filterData.subscriptionStatus}
												onChange={handleFilterData}>
												<option value=''>All</option>
												<option value='free'>Free</option>
												<option value='premium'>Premium</option>
												<option value='gold'>Gold</option>
											</Select>
										</FormGroup>
									</div>
									<div className='col-md-6 mb-3'>
										<FormGroup>
											<Label htmlFor='lastLoginDate'>Last Login Date</Label>
											<Input
												id='lastLoginDate'
												name='lastLoginDate'
												type='date'
												onChange={handleFilterData}
												value={filterData.lastLoginDate}
											/>
										</FormGroup>
									</div>
									<div className='col-md-6 mb-3'>
										<FormGroup>
											<Label htmlFor='activityLevel'>Activity Level</Label>
											<Select
												id='activityLevel'
												name='activityLevel'
												placeholder='Select Activity Level'
												ariaLabel='Activity Level'
												value={filterData.activityLevel}
												onChange={handleFilterData}>
												<option value=''>All</option>
												<option value='high'>High</option>
												<option value='medium'>Medium</option>
												<option value='low'>Low</option>
												<option value='inactive'>Inactive</option>
											</Select>
										</FormGroup>
									</div>


									<div className='col-6'>
										<Button
											color='primary'
											isOutline
											className='w-100'
											onClick={formik.resetForm}>
											Reset
										</Button>
									</div>
									<div className='col-6'>
										<Button color='primary' onClick={handleFilter} className='w-100' type='submit'>
											Filter
										</Button>
									</div>
								</form>
							</div>
						</DropdownMenu>
					</Dropdown>



					<SubheaderSeparator />
					
					{/* Bulk Actions */}
					{selectedUsers.length > 0 && (
						<>
							<Dropdown>
								<DropdownToggle hasIcon={false}>
									<Button 
										icon='MoreVert'
										color='warning'
										isLight>
										Bulk Actions ({selectedUsers.length})
									</Button>
								</DropdownToggle>
								<DropdownMenu isAlignmentEnd>
									<DropdownItem>
										<Button
											icon='Notifications'
											color='info'
											isLight
											onClick={() => handleBulkAction('notify')}>
											Send Notifications
										</Button>
									</DropdownItem>
									<DropdownItem>
										<Button
											icon='Block'
											color='warning'
											isLight
											onClick={() => handleBulkAction('block')}>
											Block Users
										</Button>
									</DropdownItem>
									<DropdownItem>
										<Button
											icon='CheckCircle'
											color='success'
											isLight
											onClick={() => handleBulkAction('activate')}>
											Activate Users
										</Button>
									</DropdownItem>
									<DropdownItem>
										<Button
											icon='VisibilityOff'
											color='secondary'
											isLight
											onClick={() => handleBulkAction('suspend')}>
											Suspend Users
										</Button>
									</DropdownItem>
									<DropdownItem>
										<Button
											icon='Verified'
											color='primary'
											isLight
											onClick={() => handleBulkAction('verify')}>
											Verify Users
										</Button>
									</DropdownItem>
									<DropdownItem>
										<Button
											icon='Star'
											color='warning'
											isLight
											onClick={() => handleBulkAction('premium')}>
											Upgrade to Premium
										</Button>
									</DropdownItem>
									<DropdownItem>
										<Button
											icon='Download'
											color='dark'
											isLight
											onClick={() => handleBulkAction('export')}>
											Export Data
										</Button>
									</DropdownItem>
									<DropdownItem>
										<Button
											icon='Delete'
											color='danger'
											isLight
											onClick={() => handleBulkAction('delete')}>
											Delete Users
										</Button>
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
							<SubheaderSeparator />
						</>
					)}
					
					<Button
						icon='PersonAdd'
						color='primary'
						isLight
						onClick={() => setEditModalStatus(true)}>
						Create Account
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row h-100'>
					<div className='col-12'>
						<Card stretch>
							<CardBody isScrollable className='table-responsive'>
								<table className='table table-modern table-hover'>
									<thead>
										<tr>
											<th>
												<Checks
													id='selectAll'
													name='selectAll'
													value={selectAll ? 'true' : 'false'}
													onChange={handleSelectAll}
													label='Select All'
												/>
											</th>
											<th
												onClick={() => requestSort('name')}
												className='cursor-pointer text-decoration-underline'>
												User{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('name')}
													icon='FilterList'
												/>
											</th>
											<th onClick={() => requestSort('email')} className='cursor-pointer text-decoration-underline'>
												Email
												<Icon
													size='lg'
													className={getClassNamesFor('email')}
													icon='FilterList'
												/></th>
											<th onClick={() => requestSort('age')}
												className='cursor-pointer text-decoration-underline'>Age
												<Icon
													size='lg'
													className={getClassNamesFor('age')}
													icon='FilterList'
												/></th>
											<th onClick={() => requestSort('iAm')}
												className='cursor-pointer text-decoration-underline'>Sex<Icon
													size='lg'
													className={getClassNamesFor('iAm')}
													icon='FilterList'
												/></th>
											<th onClick={() => requestSort('looking')}
												className='cursor-pointer text-decoration-underline'>  Looking<Icon
													size='lg'
													className={getClassNamesFor('looking')}
													icon='FilterList'
												/></th>
											<th onClick={() => requestSort('marital')}
												className='cursor-pointer text-decoration-underline'>  Marital status
												<Icon
													size='lg'
													className={getClassNamesFor('marital')}
													icon='FilterList'
												/></th>
											<th onClick={() => requestSort('status')}
												className='cursor-pointer text-decoration-underline'> Status
												<Icon
													size='lg'
													className={getClassNamesFor('status')}
													icon='FilterList'
												/>
											</th>
											<th> Action</th>
											{/* <th
												onClick={() => requestSort('balance')}
												className='cursor-pointer text-decoration-underline'>
												Gender
												<Icon
													size='lg'
													className={getClassNamesFor('balance')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('payout')}
												className='cursor-pointer text-decoration-underline'>
												Marital status{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('payout')}
													icon='FilterList'
												/>
											</th> */}
											<td />
										</tr>
									</thead>
									<tbody>

										{reversedDataa &&
											dataPagination(items, currentPage, perPage).map((itemss: any, index: any) => {
												return <tr key={itemss?._id}>
													<td>
														<Checks
															id={`select-${itemss._id}`}
															name={`select-${itemss._id}`}
															value={selectedUsers.includes(itemss._id) ? 'true' : 'false'}
															onChange={() => handleSelectUser(itemss._id)}
														/>
													</td>
													<td>
														<div className='d-flex align-items-center'>
															<div className='flex-shrink-0'>
																<div
																	className='ratio ratio-1x1 me-3'
																	style={{ width: 48 }}>
																	{itemss?.mainAvatar ? (
																		<img
																			src={`https://datingapi.meander.software/assets/images/${itemss.mainAvatar}`}
																			alt='User Avatar'
																			style={{
																				width: '100%',
																				height: '100%',
																				borderRadius: '30%',
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
																		className={`bg-l${darkModeStatus
																			? 'o25'
																			: '25'
																			}-${getColorNameWithIndex(index,
																			)} text-${getColorNameWithIndex(index,
																			)} rounded-2 d-flex align-items-center justify-content-center ${itemss?.mainAvatar ? 'd-none' : ''}`}>
																		<span className='fw-bold'>
																			{getFirstLetter(itemss?.name || 'U')}
																		</span>
																	</div>


																</div>
															</div>
															<div className='flex-grow-1'>
																<div className='fs-6 fw-bold'>
																	{itemss?.name}
																</div>
																<div className='text-muted'>
																	<Icon icon='MyLocation' />{' '}
																	<small>{itemss?.address}</small>
																</div>
															</div>
														</div>
													</td>
													<td>
														<Button
															isLink
															color='light'
															icon='Email'
															className='text-lowercase'
															tag='a'
															href={`mailto:${itemss?.email}`}>
															{itemss?.email}
														</Button>
													</td>
													<td>

														{/* <p>{itemss?.age}</p> */}

														<p>{calculateAge(itemss?.dob) || '00'}</p>
														{/* <div>
									 <small className='text-muted'>
										 {i.membershipDate.fromNow()}
									 </small>
								 </div> */}
													</td>
													<td>{itemss?.iAm}</td>
													<td>{itemss?.looking}</td>


													<td>{itemss?.marital}</td>
													<td>
														<Dropdown>
															<DropdownToggle hasIcon={false}>
																<Button
																	isLink
																// color={item.status.color}
																// icon='Circle'
																// className="bn6"
																>

																	{itemss?.status === 'Active' ? (
																		<span className='badge bg-success'>
																			Active
																		</span>
																	) : (
																		<span className='badge bg-secondary'>
																			Inactive
																		</span>
																	)}
																</Button>
															</DropdownToggle>
															<DropdownMenu>
																{Object.keys(ActiveUser).map(
																	(key) => (
																		<DropdownItem key={key}>
																			<div
																				onClick={() => handleStatus(itemss._id, ActiveUser[key].value)}
																				onKeyDown={(e) => {
																					if (e.key === 'Enter' || e.key === 'Space') {
																						handleStatus(itemss._id, ActiveUser[key].value);
																					}
																				}}
																				role="button"
																				tabIndex={0}
																			>
																				{ActiveUser[key].name}
																			</div>
																		</DropdownItem>

																	),
																)}
															</DropdownMenu>
														</Dropdown>
													</td>
													{/* <td>
								<select name="cars" id="cars" 
								         style={{
									            outline:'none',
												border:'none',
												backgroundColor:'transparent',
												padding:'5px',
												appearance: 'none', 
												color:`${itemss?.status === 'active'? 'green':'red'}`,
												fontSize:'18px'
												}}
												// value={itemss?.status}

												onChange={(e:any)=>handleStatus(e,itemss?._id)}
												>
											
                                                     {itemss?.status === 'active' ? (
            <>
                <option value="active" style={{ color: 'green' }}>
                    Active
                </option>
                <option value="inactive" style={{ color: 'red' }}>
                    Inactive
                </option>
            </>
        ) : (
            <>
                <option value="inactive" style={{ color: 'red' }}>
                    Inactive
                </option>
                <option value="active" style={{ color: 'green' }}>
                    Active
                </option>
            </>
        )}
                                   
    
                                     

                               </select>
								
							</td> */}
													{/* <td>
								 <Icon
									 size='lg'
									 icon={`custom ${i.payout.toLowerCase()}`}
								 />{' '}
								 {i.payout}
							 </td> */}
													<td>
														<Dropdown>
															<DropdownToggle hasIcon={false}>
																<Button
																	icon='MoreHoriz'
																	color='dark'
																	isLight
																	shadow='sm'
																	aria-label='More actions'
																/>
															</DropdownToggle>
															<DropdownMenu isAlignmentEnd>
																<DropdownItem>
																	<Button
																		icon='Visibility'
																		tag='a'
																		to={`/profile_management/view/${itemss._id}`}
																		onClick={() => {
																			const serializedData = JSON.stringify(itemss);

																			// Save the serialized data to session storage
																			sessionStorage.setItem('Viewed_User_Data', serializedData);

																			// setViewUser(true)
																			setViewdata(itemss)
																		}
																		}
																	>
																		View
																	</Button>
																</DropdownItem>
																<DropdownItem>
																	<Button
																		icon='PersonSearch'
																		color='info'
																		isLight
																		onClick={() => handleViewProfileOverview(itemss)}
																	>
																		Profile Overview
																	</Button>
																</DropdownItem>
																<DropdownItem>
																	<Button
																		icon='Edit'
																		tag='a'
																		// to={`../${demoPagesMenu.crm.subMenu.customerID.path}/${i.id}`}
																		onClick={() => {
																			setEditData(itemss)
																			setEditModal(true)
																			setEditId(itemss?._id)
																		}
																		}
																	>
																		Edit
																	</Button>
																</DropdownItem>
																<DropdownItem>
																	<Button
																		icon='Delete'
																		tag='a'
																		// to={`../${demoPagesMenu.crm.subMenu.customerID.path}/${i.id}`}
																		onClick={() => {
																			setDeleteModal(true)
																			setDeleteid(itemss?._id)
																		}
																		}
																	>
																		Delete
																	</Button>
																</DropdownItem>
															</DropdownMenu>
														</Dropdown>
													</td>
												</tr>
											})
										}

									</tbody>
								</table>
							</CardBody>
							{reversedDataa && <PaginationButtons
								data={items}
								label='customers'
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								perPage={perPage}
								setPerPage={setPerPage}
							/>}
						</Card>
					</div>
				</div>
			</Page>

			{editModalStatus && modeid === '65943637acc570d6b14edf38' ? <ADDMatrimonial setIsOpen={setEditModalStatus} isOpen={editModalStatus} id='0' />
				: <Add setIsOpen={setEditModalStatus} isOpen={editModalStatus} id='0' />}

			{editId && <Edit_User setIsOpen={setEditModal} isOpen={editModal} editData={editData} editId={editId} id="0" />}
			{deleteId && <OrderDeleteModal setIsOpen={setDeleteModal} isOpen={deleteModal} deleteId={deleteId} id="0" />}
			
			{/* User Profile Overview Modal */}
			{showProfileOverview && (
				<UserProfileOverview
					userData={selectedUserForOverview}
					onClose={() => {
						setShowProfileOverview(false);
						setSelectedUserForOverview(null);
					}}
				/>
			)}
		</PageWrapper>
	);
};

export default UserManagement;
