import { useEffect, useState } from "react";
import moment from 'moment';
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";

function Comment({ com, onLike, onEdit, onDelete }) {
  // Local states for user data, editing mode, and edited content
  const [user, setUser] = useState();
  const { currentUser } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(com.content);

  // Fetch user data for the comment owner
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/getComUser/${com.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data); // Set user data if API request succeeds
        }
      } catch (error) {
        console.error(error); // Log any errors
      }
    };
    getUser();
  }, [com]);

  // Enter editing mode and populate the content field
  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(com.content);
  };

  // Save the edited content and send it to the server
  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editcomment/${com._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editedContent }),
      });

      if (res.ok) {
        setIsEditing(false); // Exit editing mode
        onEdit(com._id, editedContent); // Update the comment in the parent
      }
    } catch (error) {
      console.error(error); // Log any errors
    }
  };

  return (
    <div className="flex items-start gap-2 p-2 border-b-[1px] border-gray-400 ml-14">
      {/* Commenter's profile picture */}
      <div>
        <img
          src={user?.profilePicture}
          className="w-10 h-10 rounded-full"
          alt={user?.username || 'User'}
        />
      </div>

      <div className="items-center gap-1 w-full">
        {/* Comment header with username and timestamp */}
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : 'Anonymous user'}
          </span>
          <span className="text-xs font-thin">
            {moment(com.createdAt).fromNow()}
          </span>
        </div>

        {/* Editing mode: show textarea and save/cancel buttons */}
        {isEditing ? (
          <>
            <Textarea
              className="mb-2 w-full"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                size="sm"
                gradientDuoTone="greenToBlue"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                gradientDuoTone="greenToBlue"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Comment content */}
            <p className="text-sm pb-1">{com.content}</p>

            {/* Divider */}
            <div className="w-[150px] h-[1px] my-2 bg-slate-400"></div>

            {/* Like button and edit option */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => onLike(com._id)}
                className={`text-gray-400 hover:text-blue-600 cursor-pointer ${
                  currentUser && com?.likes?.includes(currentUser._id) && '!text-blue-600'
                }`}
              >
                <FaThumbsUp className="text-sm" />
              </button>

              {/* Display number of likes */}
              <p className="text-gray-600 text-xs">
                {com.numberOfLikes > 0 &&
                  `${com.numberOfLikes} ${com.numberOfLikes === 1 ? 'like' : 'likes'}`}
              </p>

              {/* Show edit button if the current user is the author or an admin */}
              {currentUser && (currentUser._id === com.userId || currentUser.isAdmin) && (
                <>
                <button
                    type="button"
                    onClick={handleEdit}
                    className="text-gray-400 hover:text-blue-500 text-xs"
                    >
                    Edit
                </button>
                <button
                    type="button"
                    onClick={()=>onDelete(com._id)}
                    className="text-gray-400 hover:text-red-500 text-xs"
                >
                    Delete
                </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Comment;
