import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [_curr, setCurr] = useState(0);
  useEffect(()=>{
    axios.get("https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=PerGZ9dSZPiQuQJGzAiHaQLlMacXk5FU").then(res=>{
      console.log(res.data);
      setBooks(res.data.results.lists)

      setLoading(false);
    }).catch(err=>console.log(err))
  },[])

  return (
    <div className="container-fluid">
     <h2>Book Listing App</h2>
     {loading ? "Loading..." : ""}
     <div className='row'>
        <div className='col-md-2'>
          <div className='d-flex flex-column'>
        {books.map((book,key)=>
            <button onClick={()=>setCurr(key)}>{book.display_name}</button>
        )}
          </div>
        </div>
        <div className='col-md-10 ml-3'>
          <div className='row'>
        {books.length > 0 && books[_curr].books.map((_book,key)=>{
            return <div className='col-md-3'>
              <img src={_book.book_image} width={"100%"} style={{objectFit:"cover"}} height={"430px"} />
              <h3>{_book.title}</h3>
              <p>{_book.description}</p>
              <p>Author: {_book.author}</p>
              <p>Rank: {_book.rank} {_book.rank_last_week - _book.rank > 0 ? "up":"down"}</p>
              {/* <p>Rank: {_book.rank_last_week}</p> */}
              <p>Publisher: {_book.publisher}</p>
              {_book.buy_links.map((_link,key)=><a href={_link.url} className='btn btn-success m-1'>{_link.name}</a>)}
            </div>
          })}
          </div>
        </div>
     </div>
     {/* {books.map((book,key)=>
      <div className='row'>
        <h3>{book.display_name}</h3>
        <div className='row'>
          {book.books.map((_book,key)=>{
            return <div className='col-md-4'>
              <img src={_book.book_image} />
              <p>Title: {_book.title}</p>
              <p>Author: {_book.author}</p>
              <p>Publisher: {_book.publisher}</p>

            </div>
          })}
        </div>
      </div> 
     )} */}
    </div>
  );
}

export default App;
