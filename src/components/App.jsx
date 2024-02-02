import { useState, useEffect } from 'react';
import {Searchbar} from './Searchbar/Searchbar';
import {ImageGallery} from './ImageGallery/ImageGallery';
import {Button} from './Button/Button';
import {Modal} from './Modal/Modal';
import {Loader} from './Loader/Loader';
import { AppWrapper } from './App.styled';
import {ToastContainer, toast, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getImages} from './API/API';

// export class App extends Component {
//   state = {
//     images: [],
//     query: '',
//     page: 1,
//     totalImages: 0,
//     isLoading: false,
//   };
export const App = () => {

	const [images, setImages] = useState([]);
		const [isLoading, setIsLoading] = useState(false);
		const [error, setError] = useState(null);
		const [query, setQuery] = useState('');
		const [page, setPage] = useState(1);
		const [total, setTotal] = useState(1);
		const [showModal, setShowModal] = useState(false);
		const [selectedImage, setSelectedImage] = useState(null);
		const [showButton, setShowButton] = useState(false);

		useEffect(() => {
			if (!query) return;
			async function fetchImages() {
				try {
					setShowButton(true);
					setIsLoading(true);
					const response = await getImages(query, page);
	
					if (!response.hits.length) {
						toast('Sorry, there are no images matching your request...', { type: "info", position: toast.POSITION.TOP_CENTER });
						return setQuery('');
					}
	
					const modifiedHits = response.hits.map(
						({ id, tags, webformatURL, largeImageURL }) => ({
							id,
							tags,
							webformatURL,
							largeImageURL,
						})
					);
	
					setImages(prevImages => [...prevImages, ...modifiedHits]);
					setTotal(response.total);
				} catch (error) {
					setError(error.message);
				} finally {
					setIsLoading(false);
				}
			}
			fetchImages();
		}, [page, query]);
	
		const handleSearchSubmit = newQuery => {
			if (query === newQuery) {
				return;
			}
			setQuery(newQuery);
			setImages([]);
			setPage(1);
			setTotal(1);
			setIsLoading(false);
			setError(null);
		};
	
		const handleImageClick = image => {
			setSelectedImage(image);
			setShowModal(true);
		};
	
		const handleModalClose = () => {
			setSelectedImage(null);
			setShowModal(false);
		};
	
		const loadMoreBtn = () => {
			setPage(prevPage => prevPage + 1);
		};
		
return (
	<AppWrapper>
		<ToastContainer
			transition={Bounce}
			role={alert}
			autoClose={3000}
			theme="light"
		/>
				<Searchbar onSubmit={handleSearchSubmit} />
{error && <p>Error: {error}</p>}

					<ImageGallery images={images} onItemClick={handleImageClick} />
						{isLoading && <Loader />}

						{!isLoading && total / 12 > page && showButton && (
							<Button onClick={loadMoreBtn} />
)}
						{showModal && (
						<Modal image={selectedImage} onClose={handleModalClose} />
)}
	</AppWrapper>
);
}
