import Link from 'next/link';

const Pagination = ({ page, pageCount }) => {
	return (
		<>
			{page > 1 && (
				<Link href={`/events?page=${page - 1}`}>
					<a className='btn-secondary'>Prev</a>
				</Link>
			)}
			{page < pageCount && (
				<Link href={`/events?page=${page + 1}`}>
					<a className='btn-secondary'>Next</a>
				</Link>
			)}
		</>
	);
};

export default Pagination;
