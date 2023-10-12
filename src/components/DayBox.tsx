import {
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListSubheader,
  Typography,
} from '@mui/material';
import { dayArr, isSameDate } from '../utils/date';
import AddIcon from '@mui/icons-material/Add';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { addModalState } from '../recoil/modal';
import useTodo from '../hooks/useTodo';
import TodoItem from './TodoItem';
import { Stack } from '@mui/system';
import { todayState } from '../recoil/date';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';

interface DayProps {
  date: Date;
  width: string;
}

const DayBox = ({ date, width }: DayProps) => {
  const setModalState = useSetRecoilState(addModalState);
  const today = useRecoilValue(todayState);
  const { getTodos, updateTodo, setTodos } = useTodo();

  const handleClickAddButton = () => {
    setModalState({ isShowModal: true, targetDate: date });
  };

  const isToday = isSameDate(today, date);
  const day = date.getDay();
  const isSat = day === 6;
  const isSun = day === 0;

  const onDragEnd = async ({ source, destination }: DropResult) => {
    if (!destination) return;
    const todos = getTodos(date);
    if (source.index >= todos.length || destination.index >= todos.length)
      return;

    const newTodos = todos
      .map((todo, index) => {
        if (index === source.index) {
          return { ...todo, sortIdx: destination.index };
        } else if (index === destination.index) {
          return { ...todo, sortIdx: source.index };
        } else if (todo.sortIdx === 999 || todo.sortIdx === undefined) {
          return { ...todo, sortIdx: index };
        }
        return todo;
      })
      .sort((a, b) => a.sortIdx - b.sortIdx);
    setTodos((prev) => ({ ...prev, [date.getTime()]: newTodos }));

    const promises: Promise<void>[] = [];
    todos.forEach((todo, index) => {
      if (index === source.index) {
        promises.push(
          updateTodo(
            todo.id,
            todo.isCompleted,
            todo.repeatingType,
            todo.date,
            destination.index
          )
        );
      } else if (index === destination.index) {
        promises.push(
          updateTodo(
            todo.id,
            todo.isCompleted,
            todo.repeatingType,
            todo.date,
            source.index
          )
        );
      } else if (todo.sortIdx === 999 || todo.sortIdx === undefined) {
        promises.push(
          updateTodo(
            todo.id,
            todo.isCompleted,
            todo.repeatingType,
            todo.date,
            index
          )
        );
      }
    });
    try {
      await Promise.all(promises);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <List
      sx={{ width, minHeight: 300 }}
      subheader={
        <ListSubheader sx={{ padding: '0px' }}>
          <Stack
            direction={'row'}
            spacing={1}
            sx={{
              alignItems: 'center',
              paddingBottom: '5px',
              borderBottom: '1px solid gray',
              color: isSat ? '#2d83e8' : isSun ? '#f21d1d' : 'black',
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: 800 }}
            >{`${dayArr[day]}`}</Typography>
            <Typography variant="body1">{date.getDate()}</Typography>
            {isToday && <Chip label="오늘" size="small" color="info" />}
          </Stack>
        </ListSubheader>
      }
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId={`${date.getFullYear()}-${
            date.getMonth() + 1
          }-${date.getDate()}`}
        >
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {getTodos(date)?.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TodoItem todo={todo} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <ListItem disablePadding>
        <ListItemButton
          onClick={handleClickAddButton}
          dense
          sx={{
            margin: '2px 0px',
            padding: '4px 8px',
            border: '1px solid lightgray',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AddIcon sx={{ color: 'lightgray' }} />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default DayBox;
