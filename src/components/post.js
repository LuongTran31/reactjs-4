import React,{ useEffect, useState } from "react"
import axios from 'axios';
import { Link } from 'react-router-dom';

const Post = () => {
    const [isLoading,setIsLoading] = useState(true);
    const [posts,setPosts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isSortByName,setIsSortByName] = useState(false);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts').then(response=>
        {setIsLoading(false);
        setPosts(response.data);
    })
    }, []);
    const postFitler = posts.filter(post =>post.title.includes(searchText.toLowerCase()))
    const postSorted = isSortByName ? postFitler.sort((post1,post2) =>{
        if(post1.title < post2.title) return -1;
        if(post2.title > post2.title) return 1;
        return 0;
    } ) : postFitler;
    if(isLoading) return <h1>Loading</h1>
    return (
        <div>
            <input style={{margin: 25}} 
            placeholder = "Search Post"
            type ="text"
            onChange = {evt => setSearchText(evt.target.value)} />
            {postFitler.length ===0 && <div> No found</div>}
        <div className = "posts-list">
                <table>
                       <tr>
                           <th>Id</th>
                           <th onClick = {() => setIsSortByName(true)}> Title</th>
                           <th>Action</th>
                       </tr>
                        {postFitler.map(post =>(
                       <tr key={post.id}>
                           <td>{post.id}</td>
                           <td>{post.title}</td>
                           <td>
                           <Link to={`post/${post.id}`} >Details</Link>
                           </td>
                       </tr>  
                       ))}
                   </table>
            
         
        </div>
        </div>
    )
};

export default Post;