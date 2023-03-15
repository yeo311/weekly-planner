import { useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { modalState } from '../recoil/modalState';
import './TodoModal.css';
import { loginState } from '../recoil/loginState';
import { addTodo } from '../utils/firebase';

export default function TodoModal() {
  const setShowModal = useSetRecoilState(modalState);
  const subjectRef = useRef<HTMLInputElement>(null);
  const loginData = useRecoilValue(loginState);

  const handleClickSubmit = () => {
    if (!subjectRef.current?.value) {
      window.alert('내용을 입력하세요.');
      return;
    }

    addTodo(loginData.uid, new Date('2023-03-13'), subjectRef.current.value);
  };

  return (
    <div id="modal" className="modal-overlay">
      <div className="modal-window">
        <div className="title">
          <h2>모달</h2>
        </div>
        <button
          className="close-area"
          onClick={() => {
            setShowModal(false);
          }}
        >
          X
        </button>
        <div className="content">
          <label htmlFor="subject">내용</label>
          <input ref={subjectRef} type="text" name="" id="subject" />
          <button onClick={handleClickSubmit}>입력</button>
        </div>
      </div>
    </div>
  );
}
