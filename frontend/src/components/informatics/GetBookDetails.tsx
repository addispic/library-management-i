// hooks
import {useAppSelector} from '../../hooks'
// slices
import {booksSelector} from '../../features/books/booksSlice'

export default function GetBookDetails({
  _id,
  flag,
}: {
  _id: string;
  flag: string;
}) {
    // states
    const books = useAppSelector(booksSelector)
    const isBookExist = books.find(book => book._id === _id) 
    if(!isBookExist) return null
  if(flag === "img"){
    return <img className='w-full h-full object-center object-cover' src={isBookExist.file}/>
  }
  if(flag === "tit"){
    return <span>{isBookExist.title}</span>
  }
  if(flag === "aut"){
    return <>{isBookExist.author}</>
  }
  if(flag === "cat"){
    return <>{isBookExist.category}</>
  }
  if(flag === "des"){
    return <>{isBookExist.description}</>
  }
  return <div>Hello world</div>;
}
