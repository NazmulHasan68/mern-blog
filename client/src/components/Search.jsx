import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCart from "./PostCart";

function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData((prev) => ({
        ...prev,
        searchTerm: searchTermFromUrl || prev.searchTerm,
        sort: sortFromUrl || prev.sort,
        category: categoryFromUrl || prev.category,
      }));
    }

    const fetchPost = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getpost?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      const data = await res.json();
      setPosts(data.posts);
      setLoading(false);

      if (data.posts.length === 0) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    };
    fetchPost();
  }, [location.search]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSidebarData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleshowmore = async()=>{
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts
    const urlParams = new URLSearchParams(location.search)
    urlParams.set('startIndex', startIndex)
    const searchQuery = urlParams.toString()

    const res = await fetch(`/api/post/getpost?${searchQuery}`)
    if(res.ok){
        const data = await res.json()
        setPosts([...posts, ...data.posts])

        if(data.posts.length === 9){
            setShowMore(true)
        }else{
            setShowMore(false)
        }
    }
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r min-h-screen border-gray-700">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex items-center gap-2 justify-between">
            <label className="whitespace-nowrap font-semibold" htmlFor="searchTerm">Search Term</label>
            <TextInput
              placeholder="Search...."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-2 items-center justify-between">
            <label className="font-semibold">Sort : </label>
            <Select onChange={handleInputChange} value={sidebarData.sort} id="sort">
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>

          <div className="flex gap-2 items-center justify-between">
            <label className="font-semibold">Category : </label>
            <Select onChange={handleInputChange} value={sidebarData.category} id="category">
              <option value="uncategorized">Select a Category</option>
              <option value="Yamaha">Yamaha Motors</option>
              <option value="Royal">Royal Enfield</option>
              <option value="TVS">TVS Motor</option>
              <option value="Bajaj">Bajaj Auto</option>
              <option value="Honda">Honda Motorcycle</option>
              <option value="Kawasaki">Kawasaki</option>
              <option value="KTM">KTM</option>
            </Select>
          </div>
          <Button type="submit" outline gradientDuoTone="greenToBlue" className="mt-4">
            Apply filters
          </Button>
        </form>
      </div>

      <div className="w-full">
        <h1 className="text-2xl font-semibold m-5">Post Results :</h1>
        <div className="p-4 flex flex-wrap gap-4 ">
            {
                !loading && posts.length === 0 && <p className="text-xl text-gray-500">No post found !</p>
            }
            {
                loading && (
                    <p>Loading.....</p>
                )
            }
            {
                !loading && posts && posts.map((post)=>(
                    <PostCart key={post._id} post={post}/>
                ))
            }
            {
                showMore && <button onClick={handleshowmore} className="text-teal-500 hover:underline p-7 w-full">Show more</button>
            }
        </div>
      </div>
    </div>
  );
}

export default Search;
