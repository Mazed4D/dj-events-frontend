import { search } from '@/styles/Search.module.scss';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Search = () => {
	const router = useRouter();
	const [term, setTerm] = useState('');

	const enterHandler = (e) => {
		e.preventDefault();
		router.push(`/events/search?term=${term}`);
		setTerm('');
	};
	return (
		<div className={search}>
			<form onSubmit={enterHandler}>
				<input
					type='text'
					name='search'
					id='search'
					value={term}
					placeholder='Search events'
					onChange={(e) => setTerm(e.target.value)}
				/>
			</form>
		</div>
	);
};

export default Search;
