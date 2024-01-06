import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from 'src/components/Footer';
import { Header } from 'src/components/Header';
import * as S from './styled';
import { useGetSearchInfoQuery } from 'src/store/slices/ApiSlice';
import {
  setVideos,
  setNextPageToken,
  selectSearchValue,
  setIsLoading,
  setIsError,
  selectTriggeredNextPageToken,
} from 'src/store/slices/MainPageSlice';
import { useDispatch, useSelector } from 'react-redux';

export const Layout: FC = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector(selectSearchValue);
  const nextPageToken = useSelector(selectTriggeredNextPageToken);

  const {
    data: videosInfo,
    isSuccess,
    isFetching,
    isError,
  } = useGetSearchInfoQuery({
    searchValue: searchValue,
    pageToken: nextPageToken,
  });

  useEffect(() => {
    console.log('Layout');
    if (isSuccess) {
      dispatch(setVideos(videosInfo.items));
      dispatch(setNextPageToken(videosInfo.nextPageToken));
    } else if (isFetching) {
      dispatch(setIsLoading(true));
    } else if (isError) {
      dispatch(setIsError(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videosInfo]);

  return (
    <>
      <Header />
      <S.MainContainer>
        <Outlet />
      </S.MainContainer>
      <Footer />
    </>
  );
};
