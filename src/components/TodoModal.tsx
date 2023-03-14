import { useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { modalState } from '../recoil/modalState';
import { arrayUnion, doc, setDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import './TodoModal.css';
import { loginState } from '../recoil/loginState';

export default function TodoModal() {
  const setShowModal = useSetRecoilState(modalState);
  const subjectRef = useRef<HTMLInputElement>(null);
  const loginData = useRecoilValue(loginState);

  const handleClickSubmit = () => {
    if (!subjectRef.current?.value) {
      window.alert('내용을 입력하세요.');
      return;
    }

    const todoRef = doc(db, loginData.uid, '20230314');

    setDoc(
      todoRef,
      {
        subjects: arrayUnion({
          subject: subjectRef.current.value,
          isCompleted: false,
        }),
      },
      { merge: true }
    );
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
