import { Montserrat } from 'next/font/google';
import Head from 'next/head';
import styled from 'styled-components';

import { Header, MainSection } from '@/features/HomePage';

const montserrat = Montserrat({
	subsets: ['latin'],
});

export default function Home() {
	return (
		<Container className={`${montserrat.className}`}>
			<Head>
				<title>Peakee | Learn English by Chatting</title>
			</Head>

			<Header />
			<MainSection />
		</Container>
	);
}

const Container = styled.div`
	width: 100%;
`;
