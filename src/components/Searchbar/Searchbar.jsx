import { useState } from 'react';
import { SearchBarHead, SearchForm, SearchFormBtn, SearchFormButtonLabel, SearchFormInput } from './Searchbar.styled'

export const Searchbar = ({onSubmit}) => {
	const [query, setQuery] = useState('');

	const handleChange = event =>
		setQuery(event.target.value );

	const handleSubmit = event => {
		event.preventDefault();
			if (!query.trim()) { 
			return
}
		onSubmit(query);
};

return (
	<SearchBarHead>
		<SearchForm onSubmit={handleSubmit}>
			<SearchFormBtn type="submit">
				<SearchFormButtonLabel>Search</SearchFormButtonLabel>
			</SearchFormBtn>

	<SearchFormInput
		type="text"
		autoComplete="off"
		autoFocus
		placeholder="Search images and photos"
		value={query}
		onChange={handleChange}
/>
		</SearchForm>
	</SearchBarHead>
);
}