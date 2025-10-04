import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Label from '../../../components/bootstrap/forms/Label';
import Modal, { ModalBody, ModalHeader, ModalFooter, ModalTitle } from '../../../components/bootstrap/Modal';
import Badge from '../../../components/bootstrap/Badge';
import { demoPagesMenu } from '../../../menu';
import AddInterest from './AddInterest';
import EditInterest from './EditInterest';
import DeleteInterest from './DeleteInterest';



const InterestManagement = () => {
	const [interests, setInterests] = useState([
		{
			id: 1,
			name: 'Sports',
			description: 'Athletic activities and sports',
			category: 'Physical',
			isActive: true,
			userCount: 1250,
			createdAt: '2024-01-15'
		},
		{
			id: 2,
			name: 'Music',
			description: 'Music and musical instruments',
			category: 'Entertainment',
			isActive: true,
			userCount: 2100,
			createdAt: '2024-01-14'
		},
		{
			id: 3,
			name: 'Travel',
			description: 'Traveling and exploring new places',
			category: 'Lifestyle',
			isActive: true,
			userCount: 1800,
			createdAt: '2024-01-13'
		},
		{
			id: 4,
			name: 'Photography',
			description: 'Photography and visual arts',
			category: 'Creative',
			isActive: false,
			userCount: 950,
			createdAt: '2024-01-12'
		},
		{
			id: 5,
			name: 'Cooking',
			description: 'Cooking and culinary arts',
			category: 'Lifestyle',
			isActive: true,
			userCount: 1600,
			createdAt: '2024-01-11'
		}
	]);

	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [editingInterest, setEditingInterest] = useState<any>(null);
	const [deletingInterest, setDeletingInterest] = useState<any>(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [filterCategory, setFilterCategory] = useState('');

	const categories = ['All', 'Physical', 'Entertainment', 'Lifestyle', 'Creative', 'Educational', 'Technology'];

	const handleEdit = (interest: any) => {
		setEditingInterest(interest);
		setIsEditModalOpen(true);
	};

	const handleDelete = (interest: any) => {
		setDeletingInterest(interest);
		setIsDeleteModalOpen(true);
	};

	const toggleActive = (interest: any) => {
		setInterests(prev => prev.map(i => 
			i.id === interest.id 
				? { ...i, isActive: !i.isActive }
				: i
		));
	};

	const filteredInterests = interests.filter(interest => {
		const matchesSearch = interest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
							interest.description.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory = filterCategory === '' || filterCategory === 'All' || interest.category === filterCategory;
		return matchesSearch && matchesCategory;
	});

	const getCategoryColor = (category: string) => {
		const colors: { [key: string]: string } = {
			'Physical': 'primary',
			'Entertainment': 'success',
			'Lifestyle': 'info',
			'Creative': 'warning',
			'Educational': 'secondary',
			'Technology': 'dark'
		};
		return colors[category] || 'secondary';
	};

	return (
		<PageWrapper title='Interest Management'>
			<SubHeader>
				<SubHeaderLeft>
					<span className='h4 mb-0 fw-bold'>Interest Management</span>
					<SubheaderSeparator />
					<span className='text-muted'>Manage user interests and categories</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Input
						type='search'
						placeholder='Search interests...'
						value={searchTerm}
						onChange={(e: any) => setSearchTerm(e.target.value)}
						style={{ width: '250px' }}
					/>
					<SubheaderSeparator />
					<Dropdown>
						<DropdownToggle hasIcon={false}>
							<Button color='info' isLight>
								Filter: {filterCategory || 'All Categories'}
							</Button>
						</DropdownToggle>
						<DropdownMenu>
							{categories.map((category: string) => (
								<DropdownItem key={category} onClick={() => setFilterCategory(category === 'All' ? '' : category)}>
									{category}
								</DropdownItem>
							))}
						</DropdownMenu>
					</Dropdown>
					<SubheaderSeparator />
					<Button
						color='primary'
						icon='Add'
						onClick={() => setIsAddModalOpen(true)}>
						Add Interest
					</Button>
				</SubHeaderRight>
			</SubHeader>

			<Page>
				<div className='row'>
					<div className='col-12'>
						<Card stretch>
							<CardBody>
								<div className='table-responsive'>
									<table className='table table-modern table-hover'>
										<thead>
											<tr>
												<th>Interest Name</th>
												<th>Description</th>
												<th>Category</th>
												<th>Users</th>
												<th>Status</th>
												<th>Created</th>
												<th>Actions</th>
											</tr>
										</thead>
										<tbody>
											{filteredInterests.map((interest) => (
												<tr key={interest.id}>
													<td>
														<div className='fw-bold'>{interest.name}</div>
													</td>
													<td>
														<div className='text-muted' style={{ maxWidth: '200px' }}>
															{interest.description}
														</div>
													</td>
													<td>
														<Badge color={getCategoryColor(interest.category) as any} isLight>
															{interest.category}
														</Badge>
													</td>
													<td>
														<span className='fw-bold text-primary'>
															{interest.userCount.toLocaleString()}
														</span>
													</td>
													<td>
														<span className={`badge bg-${interest.isActive ? 'success' : 'secondary'}-subtle text-${interest.isActive ? 'success' : 'secondary'}`}>
															{interest.isActive ? 'Active' : 'Inactive'}
														</span>
													</td>
													<td>
														<span className='text-muted'>{interest.createdAt}</span>
													</td>
													<td>
														<Dropdown>
															<DropdownToggle hasIcon={false}>
																<Button color='light' size='sm' icon='MoreVert' />
															</DropdownToggle>
															<DropdownMenu isAlignmentEnd>
																<DropdownItem onClick={() => handleEdit(interest)}>
																	✏️ Edit
																</DropdownItem>
																<DropdownItem onClick={() => toggleActive(interest)}>
																	{interest.isActive ? '🚫 Deactivate' : '✅ Activate'}
																</DropdownItem>
																<DropdownItem onClick={() => handleDelete(interest)}>
																	🗑️ Delete
																</DropdownItem>
															</DropdownMenu>
														</Dropdown>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>

			{/* Add Interest Modal */}
			<AddInterest
				isOpen={isAddModalOpen}
				setIsOpen={setIsAddModalOpen}
				interests={interests}
				setInterests={setInterests}
			/>

			{/* Edit Interest Modal */}
			<EditInterest
				isOpen={isEditModalOpen}
				setIsOpen={setIsEditModalOpen}
				interest={editingInterest}
				interests={interests}
				setInterests={setInterests}
			/>

			{/* Delete Interest Modal */}
			<DeleteInterest
				isOpen={isDeleteModalOpen}
				setIsOpen={setIsDeleteModalOpen}
				interest={deletingInterest}
				interests={interests}
				setInterests={setInterests}
			/>
		</PageWrapper>
	);
};

export default InterestManagement;