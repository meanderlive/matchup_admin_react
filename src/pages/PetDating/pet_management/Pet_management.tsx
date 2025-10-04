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
// import add_Pet_management from './ADD'
import Add from './ADD';
import Edit_Pet from './Edit';
import OrderDeleteModal from './Delete_user';
import { fetchPet, fetchsearchPet, fetchsortPet, fetchupdatePet, searchPetbyAges, setPage } from '../../../redux/Slice/PetsManagement';
 
import ActiveUser from './ActiveUser';
import { updatestatus } from '../../../redux/Api/PetApi';
import Label from '../../../components/bootstrap/forms/Label';
import Select from '../../../components/bootstrap/forms/Select';
import imgback from '../../../assets/back (3).png'

const PetManagement = () => {
	const { darkModeStatus } = useDarkMode();
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const [editModal, setEditModal] = useState<boolean>(false);
	const [editData, setEditData] = useState<any>('')
	const [deleteModal, setDeleteModal] = useState<boolean>(false);
	const [deleteId, setDeleteid] = useState<any>('')
	const [editId, setEditId] = useState<any>('')
	const [filterData, setFilterData] = useState<any>({
		gender: '',
		minAge: '',
		maxAge: '',

	})
	const handleFilterData = (e: any) => {
		setFilterData({ ...filterData, [e.target.name]: e.target.value })
	}
	const [filterMenu, setFilterMenu] = useState<boolean>(false);
	const handleStatus = async (idedi: any, status: any) => {

		await updatestatus({ editId: idedi, status })
		await dispatch(fetchPet({ modeid, currentPage }) as any);
	}

	const modeid = localStorage.getItem('modeid')
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setPage(currentPage) as any)

		dispatch(fetchPet({ modeid, currentPage }) as any)
	}, [dispatch, modeid, currentPage])

	const statePet: any = useSelector((state: any) => state.Pet?.Pets?.data)
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



	const filteredData = statePet ? statePet.filter((f: any) =>
		f.petName?.toLowerCase().includes(formik.values.searchInput.toLowerCase())  
	) : [];
	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData.reverse());

	const handleFilter = () => {

		dispatch(searchPetbyAges(filterData) as any)
	}


	


	return (
		<PageWrapper title={demoPagesMenu.crm.subMenu.customersList.text}>
			<span className='display-5 fw-bold my-3 mx-3 ' >Pet Profile Management</span>
			 
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
						placeholder='Search Pet...'
						onChange={formik.handleChange}
						value={formik.values.searchInput}
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
											<Label htmlFor='minAge'>Age</Label>
											<InputGroup>
												<Input
													id='minAge'
													name='minAge'
													ariaLabel='Minimum age'
													placeholder='Min.'
													onChange={handleFilterData}
													value={filterData.minAge}
												/>
												<InputGroupText>to</InputGroupText>
												<Input
													id='maxAge'
													name='maxAge'
													ariaLabel='Maximum age'
													placeholder='Max.'
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
												placeholder='Gender Name'
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
					<Button
						icon='PersonAdd'
						color='primary'
						isLight
						onClick={() => setEditModalStatus(true)}>
						New Pet
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
											<th
												onClick={() => requestSort('petName')}
												// onClick={()=> {aaa(data, 'name', 'ascending')}}

												className='cursor-pointer text-decoration-underline'>
												Pet Name{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('petName')}
													icon='FilterList'
												/>
											</th>
											<th  >
												Owner Name
											 </th    >
											<th onClick={() => requestSort('petAge')} className='cursor-pointer text-decoration-underline'> Pet Age
											<Icon
												size='lg'
												className={getClassNamesFor('petAge')}
												icon='FilterList'
											/></th>
											<th onClick={() => requestSort('petGender')} 
											className='cursor-pointer text-decoration-underline'>Pet Gender<Icon
												size='lg'
												className={getClassNamesFor('petGender')}
												icon='FilterList'
											/></th>
											<th>
												Address
											 </th>
											 
											 
											 
											<th onClick={() => requestSort('status')}
												className='cursor-pointer text-decoration-underline'> Status
											<Icon
												size='lg'
												className={getClassNamesFor('status')}
												icon='FilterList'
											/>
											</th>
											<th> Action</th>
											 
											<td />
										</tr>
									</thead>
									<tbody>

										{statePet &&
											dataPagination(items, currentPage, perPage).map((itemss: any, index: any) => {
												return <tr key={itemss?._id}>
													<td>
														<div className='d-flex align-items-center'>
														<div className='flex-shrink-0'>
																<div
																	className='ratio ratio-1x1 me-3'
																	style={{ width: 48 }}>
																	{
																		itemss?.mainAvatar ? <img
																			src={`https://datingapi.meander.software/assets/images/${itemss.mainAvatar}`}
																			alt='image not fatch'
																			style={{
																				width: '100%',
																				height: '100%',
																				borderRadius: '30%'
																			}}
																		/> : <div
																			className={`bg-l${darkModeStatus
																					? 'o25'
																					: '25'
																				}-${getColorNameWithIndex(index,
																				)} text-${getColorNameWithIndex(index,
																				)} rounded-2 d-flex align-items-center justify-content-center`}>
																			<span className='fw-bold'>
																				{getFirstLetter(itemss?.petName)}
																			</span>
																		</div>
																	}
																</div>
															</div>
															<div className='flex-grow-1'>
																<div className='fs-6 fw-bold'>
																	{itemss?.petName}
																</div>
																<div className='text-muted'>
																	<Icon icon='MyLocation' />{' '}
																	<small>{itemss?.petType || 'Dog'}</small>
																</div>
															</div>
														</div>
													</td>
													<td>{itemss?.user?.userName}</td>
													<td>{itemss?.petAge}</td>
													<td>{itemss?.petGender}</td>
													<td>{itemss?.user?.address}</td>
													<td>
														<Dropdown>
															<DropdownToggle hasIcon={false}>
																<Button
																	isLink>

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
 
                                                                         sessionStorage.setItem('Viewed_Pet_Data', serializedData);
																 
																		}
																		}
																	>
																		View
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
							{statePet && <PaginationButtons
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
		 
			{editModalStatus && <Add setIsOpen={setEditModalStatus} isOpen={editModalStatus} id='0' />}
			{editId && <Edit_Pet setIsOpen={setEditModal} isOpen={editModal} editData={editData} editId={editId} id="0" />}
			{deleteId && <OrderDeleteModal setIsOpen={setDeleteModal} isOpen={deleteModal} deleteId={deleteId} id="0" />}
		</PageWrapper>
	);
};

export default PetManagement;
