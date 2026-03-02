import React from "react";

function UserDetails({users}) {
    
    if (users.length === 0) {
        return (
        <div className="bg-gray-200 p-6 rounded-xl shadow">
            <p className="text-gray-500 text-center">No users added yet.</p>
        </div>
        );
    }
    return (
    <div className="bg-gray-200 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">User Details</h2>
        
        <div className="overflow-x-auto">
            <div className="flex gap-4 min-w-max">
                {users.map((user, index) => (
                    <div key={index} className="min-w-[250px] bg-white p-4 rounded-lg shadow">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Age:</strong> {user.age}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
    );
}

export default UserDetails;