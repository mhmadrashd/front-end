import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';
import Select from './Select';
import StarRating from './Rating'
import './Author.css'
import { Box } from '@mui/material';
import Image from './Images/LibararyBG.jpg'
import axios from 'axios';
const LOCALHOST = 'https://goodread-backend.herokuapp.com/';

export default function Author() {
  const { id } = useParams();
  const [AuthorInfo, setAuthorInfo] = useState({
    ID: id,
    fname: '',
    lname: '',
    dob: '',
    info: '',
    image: '',
  });
  const [AuthorBook, setAuthorBook] = useState({
    Books: []
  });
  useEffect(() => {
    axios.get(`${LOCALHOST}author/` + id, {
      headers: {
        token: sessionStorage.getItem("Authorization")
      }
    })
      .then(response =>
        setAuthorInfo({
          ID: response.data._id,
          fname: response.data.fName,
          lname: response.data.lName,
          dob: response.data.DOB,
          info: response.data.info,
          image: response.data.img,
        })
      )
  }, [])
  useEffect(() => {
    axios.get(`${LOCALHOST}book/authBook/` + id, {
      headers: {
        token: sessionStorage.getItem("Authorization")
      }
    })
      .then(response => {
        setAuthorBook({
          Books: response.data
        })
      }
      )
  }, [])

  var list = AuthorBook.Books.map((data) => {

    return (
      <div class="booksofauthor">
        <img alt="" class=" bookimg" src={data.img} width="100px" height="100px" />
        <div class="selectandrating">
          <div><StarRating stars={data.rating} /></div>
        </div>
        <div class="rating">
          <h6>{data.title}</h6>
          <h6>{data.category.Name}</h6>
          <br></br>
          <strong>{!isNaN(Date.parse(data.created_at)) && !(Number.isInteger(data.created_at)) ?
            new Date(data.created_at).toLocaleString()
            : data.created_at}</strong>
        </div>
        <hr></hr>
      </div>)
  })
  return (

    <Box sx={{
      width: "100%", margin: 0,
      overflow: "hidden",
      backgroundSize: 'cover',
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url(${Image})`,
      fontFamily: 'Courier New',
      fontWeight: 600
    }}>
      <div className='parentContainer' >
        <div>
          <div class="cardAndrateAndselect">
            <Card bookname={AuthorInfo.fname + AuthorInfo.lname} photo={AuthorInfo.image} />
          </div>
          <div class="beside">
            {/* <h3 class="bookname"> {AuthorInfo.bookName}</h3> */}
            <h6 class="authorname"> {AuthorInfo.fname}  {AuthorInfo.lname}</h6>
            <h6 class="category"> {!isNaN(Date.parse(AuthorInfo.dob))
              && !(Number.isInteger(AuthorInfo.dob)) ?
              new Date(AuthorInfo.dob).toDateString()
              : AuthorInfo.dob} </h6>
            <div class="rating">
            </div>
            <div class="description">
              <p>
                {AuthorInfo.info}
              </p>
            </div>
          </div>
        </div>
        <div class="authorbooks">
          <h5 class="s">Author's Books</h5>
          <>{list}</>
        </div>
      </div>
      {window.scrollTo(0, 0)}
    </Box>
  );

};



