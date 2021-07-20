import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams } from 'react-router-dom';

const DetailsPage = () => {
  let {id} = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [post, setPost] = useState({
    title: null,
    body: null,
  });

  useEffect(() => {
    document.title = 'Details page';
  }, []);

  useEffect(() => {
    setIsLoading(true);
    let didCancel = false;
    axios({
      url: `https://jsonplaceholder.typicode.com/posts/${id}`})
      .then(response => {
        if (!didCancel) {
          console.log(response)
          setPost({
            title: response.data.title,
            body: response.data.body
          })
          setIsLoading(false);
        }
      }).catch(error => {
        setError('Something went wrong')
        console.log(error);
        setIsLoading(false);
      })
    return () => {
      didCancel = true;
    }

  }, [post.id])
  console.log('error : ', error);
  console.log('isLoading : ', isLoading);
  if (!isLoading && error) { return <div style={{ color: 'red' }}>{error}</div> }
  if (isLoading) {
    return <i className="fa fa-spinner"></i>;
  } else {
    return (
      <div>
        
        <div>Title: {post.title}</div>
        <div>Body: {post.body}</div>
      </div>
    )
  }
}

export default DetailsPage;