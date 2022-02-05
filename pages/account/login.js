import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import styles from '@/styles/AuthForm.module.scss';
import AuthContext from '@/context/AuthContext';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { login, error } = useContext(AuthContext);

	useEffect(() => error && toast.error(error));

	const handleSubmit = (e) => {
		e.preventDefault();
		login({ email, password });
	};

	return (
		<Layout title='User Login'>
			<div className={styles.auth}>
				<h1>
					<FontAwesomeIcon icon={faUser} /> Log In
				</h1>
				<ToastContainer />
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor='email'>Email Address</label>
						<input
							type='email'
							name='email'
							id='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='email'>Password</label>
						<input
							type='password'
							name='password'
							id='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<input type='submit' value='Login' className='btn' />
				</form>

				<p>
					Don&apos;t have an account?{' '}
					<Link href='/account/register'>Register</Link>
				</p>
			</div>
		</Layout>
	);
};

export default LoginPage;
