import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProfilePage.css"; 
import { getProfileData } from "../services/employeeService";

const ProfilePage = () => {
//   const user = 
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+123 456 7890",
    gender: "Male",
    hobbies: ["Reading", "Traveling", "Coding"],
    profileImage: "https://via.placeholder.com/150",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
        try {
            const data = await getProfileData();
            console.log('api data', data);

            setUser(data);
          } catch (error) {
            console.error('Error fetching departments:', error);
          } finally {
            setLoading(false); 
          }
    }

    getProfile()
    
  }, [])
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header text-center bg-primary text-white">
              <h3>Profile</h3>
            </div>
            <div className="card-body">
              <div className="text-center mb-4">
                <img
                  src={user?.profileImage || 'https://via.placeholder.com/150'}
                  alt="Profile"
                  className="rounded-circle profile-img"
                  width="150"
                  height="150"
                />
              </div>
              <h4 className="text-center">
                {user?.firstName} {user?.lastName}
              </h4>
              <p className="text-center text-muted">{user?.email}</p>
              <hr />
              <div className="row">
                <div className="col-md-6 d-flex">
                  <h6>Role:</h6>
                  <p class="ps-1">{user?.role}</p>
                </div>
                <div className="col-md-6 d-flex">
                  <h6>Gender:</h6>
                  <p class="ps-1">{user?.gender}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <h6>Hobbies:</h6>
                  <ul>
                    {user?.hobbies.map((hobby, index) => (
                      <li key={index}>{hobby}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default ProfilePage;
