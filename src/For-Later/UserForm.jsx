import React, { useState } from "react";

function UserForm({setUsers}) {
    
    const [formData, setFormData] = useState({name: "", email: "", age: ""});
    const [errors, setErrors] = useState({});
    
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    }

    function validate() {
        let newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.includes("@")) {
            newErrors.email = "Valid email required";
        }

        if (!formData.age || formData.age <= 0) {
            newErrors.age = "Age must be greater than 0";
        }
        
        return newErrors;
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        
        const validationErrors = validate();
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        }
        else {
            setErrors({});
            setUsers(prev => [...prev, formData]);
            setFormData({ name: "", email: "", age: "" });
        }
    }
    
    return (
    <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">User Form</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded"/>
                {errors.name && (<p className="text-red-500 text-sm">{errors.name}</p>)}
            </div>
            
            <div>
                <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded"/>
                {errors.email && (<p className="text-red-500 text-sm">{errors.email}</p>)}
            </div>

            <div>
                <input type="number" name="age" placeholder="Enter Age" value={formData.age} onChange={handleChange} className="w-full p-2 border rounded"/>
                {errors.age && (<p className="text-red-500 text-sm">{errors.age}</p>)}
            </div>
            
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Submit</button>
            
        </form>
    </div>
    );
}

export default UserForm;