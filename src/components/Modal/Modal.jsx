import { useEffect } from 'react';
import { Overlay, ModalWrapper } from './Modal.styled'

export const Modal = ({ image, onClose }) => {
	useEffect(() => {
		const handleKeyDown = evt => {
			if (evt.code === 'Escape') onClose();
};
		window.addEventListener('keydown', handleKeyDown);
		document.body.style.overflow = 'hidden';

return () => {
		window.removeEventListener('keydown', handleKeyDown);
		document.body.style.overflow = 'auto';
};
}, 
[onClose]);

const handleClick = event => {
	if (event.target === event.currentTarget) {
		onClose();
}
};
return (
	<Overlay onClick={handleClick}>
		<ModalWrapper>
			<img src={image.largeImageURL} alt={ image.tags } />
		</ModalWrapper>
	</Overlay>
);
}