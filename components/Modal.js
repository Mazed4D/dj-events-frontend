import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from '@/styles/Modal.module.scss';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Modal = ({ show, onClose, children, title }) => {
	const [isBrowser, setIsBrowser] = useState(false);

	useEffect(() => setIsBrowser(true));

	const handleClose = (e) => {
		e.preventDefault();
		onClose();
	};

	const modalConent = show ? (
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<div className={styles.header}>
					<a href='#' onClick={handleClose}>
						<FontAwesomeIcon icon={faTimes} />
					</a>
				</div>
				{title && <div>{title}</div>}
				<div className={styles.body}>{children}</div>
			</div>
		</div>
	) : null;

	if (isBrowser) {
		return createPortal(modalConent, document.getElementById('modal-root'));
	} else {
		return null;
	}
};

export default Modal;
