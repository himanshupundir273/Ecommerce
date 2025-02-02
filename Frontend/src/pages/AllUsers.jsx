import React, { useState, useEffect } from "react";
import SummaryApi from "../common";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeuserRole from "../components/ChangeuserRole";


const AllUsers = () => {
  const [allUser, setAllUser] = useState([]);
  const[openUpdate,setopenUpdate]=useState(false);
  const[updateUserDetail,setUpdateUserDetail]=useState({
    email:" ",
    name:" ",
    role:" ",
    userId:" "
  })
  const fetchAlluser = async () => {
    const fetchdata = await fetch(SummaryApi.allUsers.url, {
      method: SummaryApi.allUsers.method,
      withCredentials: true,
      credentials: "include", 

    });
    const dataResponse = await fetchdata.json();
    if (dataResponse.success) {
      setAllUser(dataResponse.data);
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };
  useEffect(() => {
    fetchAlluser();
  }, []);

  console.log(allUser)

  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white">
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {allUser.map((el, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{el?.name}</td>
                <td>{el?.email}</td>
                <td>{el?.role}</td>
                <td>{moment(el?.createdAt).format("LL")}</td>
                <td>
                  <button
                    className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                    onClick={()=>{
                      setUpdateUserDetail(el)
                    setopenUpdate(true)
                    }}
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {
        openUpdate && (
          <ChangeuserRole onClose={()=>setopenUpdate(false)}
            name={updateUserDetail.name}
            email={updateUserDetail.email}
            role={updateUserDetail.role}
            userId={updateUserDetail._id}
            callFunc={fetchAlluser}
          />
        )
      }
    </div>
  );
};

export default AllUsers;
