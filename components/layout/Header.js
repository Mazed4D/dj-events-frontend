import Link from 'next/link';
import { header, logo } from '@/styles/Header.module.scss';
import Search from '../Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faRegistered,
	faSign,
	faSignInAlt,
	faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import AuthContext from '@/context/AuthContext';
import { useContext } from 'react';

const Header = () => {
	const { user, logout } = useContext(AuthContext);

	return (
		<header className={header}>
			<div className={logo}>
				<Link href='/'>
					<a>DJ Events</a>
				</Link>
			</div>

			<Search />

			<nav>
				<ul>
					<li>
						<Link href='/events'>
							<a>Events</a>
						</Link>
					</li>
					{user && (
						<>
							<li>
								<Link href='/events/add'>
									<a>Add Event</a>
								</Link>
							</li>
							<li>
								<Link href='/account/dashboard'>
									<a>Dashboard</a>
								</Link>
							</li>
							<li>
								<button className='btn-secondary btn-icon' onClick={logout}>
									<FontAwesomeIcon icon={faSignOutAlt} />
									Logout
								</button>
							</li>
						</>
					)}
					{!user && (
						<li>
							<Link href='/account/login'>
								<a className='btn-secondary btn-icon'>
									<FontAwesomeIcon icon={faSignInAlt} />
									Login
								</a>
							</Link>
						</li>
					)}
					{/* <li>
						<Link href='/account/register'>
							<a className='btn-secondary btn-icon'>
								<FontAwesomeIcon icon={faLogin} />
								Register
							</a>
						</Link>
					</li> */}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
