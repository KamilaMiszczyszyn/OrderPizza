import styled from 'styled-components';
import { ReviewMain, Button } from './../index';
import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import arrowLeftIcon from './../../assets/arrow-left.svg';
import arrowRightIcon from './../../assets/arrow-right.svg';
import { useNavigate } from 'react-router-dom';
import { CustomArrowProps } from 'react-slick';

interface Review {
  date: Timestamp;
  firstName: string;
  stars: number;
  feedback: string;
  id?: string;
}

const Container = styled.section`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 56px;
  padding-top: 100px;
  padding-bottom: 100px;

  @media (max-width: 490px) {
    padding: 40px 0;
  }
`;

const H2 = styled.h2`
  text-align: center;
  width: 100%;
  padding: 0 24px;
`;

const SliderContainer = styled.div`
  width: 1120px;
  position: relative;
  height: auto;

  @media (min-width: 798px) and (max-width: 1040px) {
    width: 768px;
  }

  @media (max-width: 798px) {
    width: 448px;
  }

  @media (max-width: 798px) {
    width: 100%;
  }

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
  }

  div.slick-slider.slick-initialized {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 24px;
  }

  .slick-list {
    width: 1024px;
    overflow-y: visible;

    @media (min-width: 798px) and (max-width: 1040px) {
      width: 664px;
    }

    @media (max-width: 798px) {
      width: 344px;
    }

    @media (max-width: 490px) {
      width: 300px;
    }
  }

  .slick-arrow {
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;
  }

  .slick-arrow:hover {
    background-color: ${(props) => props.theme.colors.neutral[50]};
  }

  .slick-prev {
    left: 10px;
  }

  .slick-next {
    right: 10px;
  }

  .slick-prev:before,
  .slick-next:before {
    display: none;
  }
`;

const SampleNextArrow = (props: CustomArrowProps) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-arrow`} onClick={onClick}>
      <img src={arrowRightIcon} alt="Next" />
    </div>
  );
};

const SamplePrevArrow = (props: CustomArrowProps) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-arrow rotate-180`} onClick={onClick}>
      <img src={arrowLeftIcon} alt="Previous" />
    </div>
  );
};

const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Array<Review>>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getReviewsData = () => {
      const q = query(collection(db, 'reviews'), orderBy('date', 'desc'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const reviewsArr: Array<Review> = [];
        querySnapshot.forEach((doc) => {
          reviewsArr.push({ ...(doc.data() as Review), id: doc.id });
        });
        setReviews(reviewsArr.slice(0, 6));
      });
      return () => unsubscribe();
    };

    getReviewsData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    arrows: true,
    responsive: [
      {
        breakpoint: 1040,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 798,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <Container>
      <H2>Recent customer feedback</H2>
      <SliderContainer>
        <Slider {...settings}>
          {reviews.map((review) => (
            <ReviewMain review={review} key={review.id} />
          ))}
        </Slider>
      </SliderContainer>
      <Button
        buttonType="secondary"
        onClick={() => navigate('/customer-feedback')}
      >
        See all feedback
      </Button>
    </Container>
  );
};

export default ReviewsSection;
