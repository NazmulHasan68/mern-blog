import { Link } from "react-router-dom"
function PostCart({post}) {
  return (
    <div className="group relative w-full border h-[300px] sm:h-[170px] overflow-hidden rounded-lg  sm:w-[170px] ">
      <Link to={`/post/${post.slug}`}>
        <img src={post.image} alt="post cover" className="sm:h-[120px] h-[180px] w-full object-cover sm:group-hover:h-[130px] group-hover:h-[200px] transition-all duration-300 z-20"/>
      </Link>
      <div className="flex flex-col gap-1">
        <p className="sm:text-sm text-md font-semibold px-4 line-clamp-2">{post.title}</p>
        <span className="italic sm:text-xs text-sm px-4">{post.category}</span>
        <Link to={`/post/${post.slug}`} className="z-20 group-hover:bottom-0 absolute sm:-bottom-[120px] -bottom-[200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-fuchsia-50 transition-all duration-300 text-center py-1 rounded-md m-1">
            Read article
        </Link>
      </div>
    </div>
  )
}

export default PostCart
