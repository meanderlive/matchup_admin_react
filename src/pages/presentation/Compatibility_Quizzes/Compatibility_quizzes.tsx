import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';

import { useDispatch, useSelector } from 'react-redux';

import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import { getFirstLetter } from '../../../helpers/helpers';
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

import PAYMENTS from '../../../common/data/enumPaymentMethod';
import useSortableData from '../../../hooks/useSortableData';

import { getColorNameWithIndex } from '../../../common/data/enumColors';
import useDarkMode from '../../../hooks/useDarkMode';

import Add from './ADD';
import Edit_User from './Edit_Quizzes';
import OrderDeleteModal from './Delete_Quizzes';
import { setPage } from '../../../redux/Slice/UserManagement_slice';

import ActiveUser from './ActiveUser';

import { getAllCompatibilityApis } from '../../../redux/Slice/CompatibilitySlice';

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


	const [filterData, setFilterData] = useState<any>({
		gender: '',
		minAge: '',
		maxAge: '',

	})





	const handleStatus = async (idedi: any, status: any) => {

	}

	const modeid = localStorage.getItem('modeid')
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setPage(currentPage) as any)

		dispatch(getAllCompatibilityApis(modeid) as any)
	}, [dispatch, modeid, currentPage])

	const compatibility: any = useSelector((state: any) => state.compatibility?.Compatibility?.data)

	// const dataa = compatibility?.users?.data




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




	const filteredData = compatibility ? compatibility.filter((f: any) =>
		f.question.toLowerCase().includes(formik.values.searchInput.toLowerCase())
	) : [];
	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);







	return (
		<PageWrapper title={demoPagesMenu.crm.subMenu.customersList.text}>
			<span className='display-5 fw-bold my-3 mx-3 ' >Compatibility Quizzes Management</span>

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
						placeholder='Search Quizzes...'
						onChange={formik.handleChange}
						value={formik.values.searchInput}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>





					<SubheaderSeparator />
					<Button
						icon='PersonAdd'
						color='primary'
						isLight
						onClick={() => setEditModalStatus(true)}>
						New Quizzes
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
												onClick={() => requestSort('question')}
												// onClick={()=> {aaa(data, 'name', 'ascending')}}

												className='cursor-pointer text-decoration-underline'>
												Question{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('question')}
													icon='FilterList'
												/>
											</th>
											<th  >
												Answer A
											</th>
											<th
											>Answer B
											</th>
											<th
											>Answer C </th>
											<th
											>  Answer d </th>

											<th
											> Status

											</th>
											<th> Action</th>

											<td />
										</tr>
									</thead>
									<tbody>

										{data &&
											dataPagination(items, currentPage, perPage).map((itemss: any, index: any) => {
												return <tr key={itemss?._id}>
													<td>
														<div className='d-flex align-items-center'>
															<div className='flex-shrink-0'>
																<div
																	className='ratio ratio-1x1 me-3'
																	style={{ width: 48 }}>

																	<div
																		className={`bg-l${darkModeStatus
																			? 'o25'
																			: '25'
																			}-${getColorNameWithIndex(index,
																			)} text-${getColorNameWithIndex(index,
																			)} rounded-2 d-flex align-items-center justify-content-center`}>
																		<span className='fw-bold'>
																			{getFirstLetter(itemss?.question)}
																		</span>
																	</div>



																</div>
															</div>
															<div className='flex-grow-1'>
																<div className='fs-6 fw-bold'>
																	{itemss?.question}
																</div>
																<div className='text-muted'>
																	<Icon icon='MyLocation' />{' '}
																	<small>Quizzes</small>
																</div>
															</div>
														</div>
													</td>
													<td>
														{itemss?.answer[0]}
													</td>
													<td>
														{itemss?.answer[1]}

													</td>
													<td>
														{itemss?.answer[2]}
													</td>
													<td>
														{itemss?.answer[3]}
													</td>
													<td 	>
														<Dropdown>
															<DropdownToggle hasIcon={false}>
																<Button
																	isLink
																// color={item.status.color}
																// icon='Circle'
																// className="bn6"
																>

																	{itemss?.is_activated === true ? (
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
							{data && <PaginationButtons
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
			{/* <CustomerEditModal setIsOpen={setEditModalStatus} isOpen={editModalStatus} id='0' /> */}
			{/* <add_user_management setIsOpen={setEditModalStatus} isOpen={editModalStatus} id='0' />
			 */}
			{/* {viewData && <View_user setIsOpen={setViewUser} isOpen={viewUser} viewData={viewData} id='0' />} */}
			{editModalStatus && <Add setIsOpen={setEditModalStatus} isOpen={editModalStatus} id='0' />}
			{editId && <Edit_User setIsOpen={setEditModal} isOpen={editModal} editData={editData} editId={editId} id="0" />}
			{deleteId && <OrderDeleteModal setIsOpen={setDeleteModal} isOpen={deleteModal} deleteId={deleteId} id="0" />}
		</PageWrapper>
	);
};

export default UserManagement;
