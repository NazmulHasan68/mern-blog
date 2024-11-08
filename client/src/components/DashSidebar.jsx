import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { HiDocumentText, HiTable, HiUser, HiUsers } from "react-icons/hi";
import { FaCommentAlt } from "react-icons/fa";
import { signOutSuccess } from "../redux/userSlice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdDashboard } from "react-icons/md";

function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromURL = urlParams.get("tab");
    if (tabFromURL) {
      setTab(tabFromURL);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      const res = await fetch(`/api/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.error(error); 
    }
  };

  return (
    <Sidebar aria-label="Default sidebar example" className="w-full sm:w-56 shadow-md">
      <Sidebar.Logo href="#">shadow</Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to="/dashboard?tab=dashbord">
              <Sidebar.Item
                  href="#"
                  active={tab === "dashbord"}
                  icon={MdDashboard}
                  labelColor="light"
                  as="div"
              >
                  Dashboard
                </Sidebar.Item>
            </Link>

          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
                href="#"
                active={tab === "profile"}
                label={currentUser.isAdmin ? "Admin" : "User"}
                icon={HiUser}
                labelColor="light"
                as="div"
            >
                Profile
              </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=posts">
            <Sidebar.Item
                href="#"
                active={tab === "posts"}
                icon={HiDocumentText}
                labelColor="dark"
                as="div"
            >
              Posts
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=users">
            <Sidebar.Item
                href="#"
                active={tab === "users"}
                icon={HiUsers}
                labelColor="dark"
                as="div"
            >
              users
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=comments">
            <Sidebar.Item
                href="#"
                active={tab === "comments"}
                icon={FaCommentAlt}
                labelColor="dark"
                as="div"
            >
              Comments
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=logout" onClick={handleSignOut}>
            <Sidebar.Item
              href="#"
              active={tab === "logout"}
              icon={HiTable}
              as="div"
            >
              logout
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashSidebar;
