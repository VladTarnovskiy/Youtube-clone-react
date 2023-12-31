import { FC } from 'react';
import * as S from './styled';
import { Card } from 'src/components/Card';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsError,
  selectIsLoading,
  selectNextPageToken,
  selectVideos,
  setIsLoading,
  setTriggeredNextPageToken,
} from 'src/store/slices/MainPageSlice';
import { Filters } from 'src/components/Filters';
import { CardSkeleton } from 'src/components/CardSkeleton';

export const MainPage: FC = () => {
  const dispatch = useDispatch();
  const nextPageToken = useSelector(selectNextPageToken);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const videos = useSelector(selectVideos);

  const getNextPageVideosData = () => {
    if (!isLoading) {
      dispatch(setTriggeredNextPageToken(nextPageToken));
      dispatch(setIsLoading(true));
    }
  };

  let content: JSX.Element | JSX.Element[] | null = null;
  if (videos.length >= 1) {
    if (videos.length >= 1) {
      console.log(videos);
      content = videos.map((video) => (
        <Card key={video.keyID} videoData={video} />
      ));
    } else {
      content = <div>Nothing found.</div>;
    }
  } else if (isError) {
    content = <S.InfoContainer>Sorry, something went wrong.</S.InfoContainer>;
  }

  return (
    <div>
      <Filters />
      <S.CardContainer>
        {content}
        {isLoading &&
          [...Array(6)].map((_item, index) => <CardSkeleton key={index} />)}
      </S.CardContainer>
      {nextPageToken ? (
        <S.ShowMoreBut $isFetching={isLoading} onClick={getNextPageVideosData}>
          Show More
        </S.ShowMoreBut>
      ) : (
        <S.ShowMoreBut $isFetching={true}>Show More</S.ShowMoreBut>
      )}
    </div>
  );
};
