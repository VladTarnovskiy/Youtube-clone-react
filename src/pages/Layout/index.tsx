import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from 'src/components/Footer';
import { Header } from 'src/components/Header';

export const Layout: FC = () => {
  return (
    <>
      <Header />
      <main className="container max-w-[1600px] min-h-[85vh] m-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};