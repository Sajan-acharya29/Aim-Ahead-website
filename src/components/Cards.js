import React, {useState, useEffect} from 'react';
import { db , auth} from '../firebase';
import CardItem from './CardItem';
import './Cards.css';
import { UserAuth } from '../context/AuthContext';
//import first_caregivee from './images/elder_1.jpg';
//import second_caregivee from './images/elder_2.jpg';
import basic_caregivee from './images/empty-avatar.png';
import { collection, where, query, getDocs } from 'firebase/firestore';
function Cards() {
  const {user} = UserAuth();
  const [Elderly, setElderly] = useState([]);
  //collection Ref
  const validcaregiverCollectionRef = collection(db, "Valid_Caregivees");
  //query
  //console.log(user.email);
  const getuser = async () => {
    await auth.currentUser;
    return (auth.currentUser.email)
  };
  //console.log(getuser());
  useEffect(() => {

    const getElderly = async () => {
      const q = query(validcaregiverCollectionRef, where("Caregiver", "==", user.email));
      const caregiver_data = await getDocs(q);
      //fetching data form firestore and storing in data structure array
      setElderly(caregiver_data.docs.map((doc)=>({...doc.data(), id: doc.id})))

    };
    getElderly();
}, []);
return (
  <div className='cards'>
      <h1>Check up on your elderly</h1>
      <div className='cards__container'>
          <div className='cards__wrapper'>
              <ul className='cards__items'>
              {Elderly.map((user) => {
                return(
                <>
                  <CardItem src={basic_caregivee}
                  id={user.Elderly_ID}
                  elderly={user.Caregivee}
                  label='Monitor Health'
                  path='/caregiver-info'/>
                  </>)
            })}
              </ul>
          </div>
      </div>

  </div>
)
};

export default Cards;