import { Swiper, SwiperSlide } from 'swiper/react';
import { useWeekStore } from '../store/date';
import WeekHeader from '../components/WeekHeader';
import { Container, Divider, Flex } from '@mantine/core';
import useGetTasks from '../services/useGetTasks';
import { formatKey } from '../utils/date';
import TaskItem from '../components/TaskItem';

const MainSection = () => {
  const { weekDays, addNext, addPrev, setActiveIndex } = useWeekStore();

  const { tasks } = useGetTasks();
  console.log({ tasks });

  return (
    <>
      <Swiper
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        onSwiper={(swiper) => swiper.slideTo(1, 0)}
        onReachEnd={addNext}
        onReachBeginning={addPrev}
        style={{ height: 'calc(100vh - 60px)' }}
      >
        {weekDays.map((weekDay) => (
          <SwiperSlide key={weekDay.offset} style={{ height: '100%' }}>
            <Container fluid h="100%">
              <WeekHeader days={weekDay.days} />
              <Divider color="gray.2" />
              <Container fluid h="100%">
                <Flex justify="space-between" align="flex-start" h="100%">
                  {weekDay.days.map((day) => (
                    <Flex
                      key={formatKey(day)}
                      miw="calc(100% / 7)"
                      h="100%"
                      direction="column"
                      justify="flex-start"
                      style={{ borderRight: '1px solid #e9ecef' }}
                    >
                      {tasks[formatKey(day)]?.map((task) => (
                        <TaskItem key={task.id} task={task} />
                      ))}
                    </Flex>
                  ))}
                </Flex>
              </Container>
            </Container>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default MainSection;
