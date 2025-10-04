import React from 'react';
import Modal, { ModalBody, ModalHeader, ModalFooter, ModalTitle } from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

interface DeleteInterestProps {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	interest: any;
	interests: any[];
	setInterests: (interests: any[]) => void;
}

const DeleteInterest: React.FC<DeleteInterestProps> = ({ isOpen, setIsOpen, interest, interests, setInterests }) => {
	const handleDelete = () => {
		setInterests(interests.filter(i => i.id !== interest?.id));
		setIsOpen(false);
	};

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<ModalHeader>
				<ModalTitle id='delete-interest-modal'>Delete Interest</ModalTitle>
			</ModalHeader>
			<ModalBody>
				<p>Are you sure you want to delete the interest <strong>"{interest?.name}"</strong>?</p>
				<p className='text-muted'>This action cannot be undone.</p>
			</ModalBody>
			<ModalFooter>
				<Button color='secondary' onClick={() => setIsOpen(false)}>
					Cancel
				</Button>
				<Button color='danger' onClick={handleDelete}>
					Delete
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default DeleteInterest;
