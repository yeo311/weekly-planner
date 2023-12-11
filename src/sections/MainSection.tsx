import { Swiper, SwiperSlide } from 'swiper/react';
import { useWeekStore } from '../store/date';
import WeekHeader from '../components/WeekHeader';
import { Divider } from '@mantine/core';

const MainSection = () => {
  const { weekDays, addNext, addPrev } = useWeekStore();

  return (
    <>
      <Swiper
        slidesPerView={1}
        onSlideChange={() => console.log(`slide change }`)}
        onSwiper={(swiper) => swiper.slideTo(1, 0)}
        onReachEnd={addNext}
        onReachBeginning={addPrev}
        style={{ height: 'calc(100vh - 60px)' }}
      >
        {weekDays.map((weekDay) => (
          <SwiperSlide key={weekDay.offset}>
            <div style={{ width: '100vw' }}>
              <WeekHeader days={weekDay.days} />
              <Divider color="gray.2" />
              Hello
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default MainSection;
