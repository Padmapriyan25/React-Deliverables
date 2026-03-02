import React, { useEffect, useState } from "react";

function ViewData() {
  const [data, setData] = useState([]);

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("formSubmissions")) || [];
//     setData(stored);
//   }, []);

useEffect(() => {
  fetch("http://localhost:3001/formSubmissions")
  .then(res => res.json())
  .then(data => setData(data))
  .catch(err => console.error(err));
}, []);

return(
    <div className="p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Submitted Data</h1>
        {data.length === 0 ? (<p>No data found.</p>) : (data.map((item, index) => (
          <div key={index} className="border p-4 mb-4 rounded-lg shadow-sm">
            <h2 className="font-semibold text-lg mb-2">{item.firstName} {item.lastName}</h2>
            <p><strong>Email:</strong> {item.email}</p>
            <p><strong>Phone:</strong> {item.phone}</p>
            <p><strong>Website:</strong>{" "}
              <a href={item.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{item.website}</a>
            </p>
            <p><strong>Age:</strong> {item.age}</p>
            <p><strong>Experience:</strong> {item.experience} years</p>
            <p><strong>Date of Birth:</strong>{" "}
              {item.birthDate ? new Date(item.birthDate).toLocaleDateString() : "N/A"}
            </p>
            <p><strong>Gender:</strong> {item.gender}</p>
            <p><strong>Country:</strong> {item.country}</p>
            <p><strong>Hobbies:</strong> {item.hobbies.join(", ")}</p>
            <p><strong>Bio:</strong> {item.bio}</p>
            
            <div className="flex items-center gap-2 mt-2">
              <strong>Favorite Color:</strong>
              <div className="w-6 h-6 rounded border" style={{ backgroundColor: item.favoriteColor }}/>
                <span>{item.favoriteColor}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ViewData;
