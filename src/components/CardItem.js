import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import './Cards.css';


function CardItem(props) {
  var road = props.path;
  road+="/"+props.elderly;
  road+="/"+props.id;

  return (
    <>
    <li className='cards__item' >
        <Link className='cards__item__link' to={{pathname: road,
        state: {stateParam: true}}} >
            <figure className='cards__item__pic-wrap' data-category={props.label}>
                <img src={props.src} alt="elderly_1" className='cards__item__img'/>
                </figure>
                <div className='cards__item__info'>
                    <h5 className='cards__item__text'>{props.elderly}</h5>
                </div>
        </Link>
    </li>
    </>

  )
};

export default CardItem;