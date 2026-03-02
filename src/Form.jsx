import React, { useState } from "react";

function Form() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        website: "",
        age: "",
        experience: 0,
        birthDate: "",
        gender: "",
        hobbies: [],
        country: "",
        bio: "",
        favoriteColor: "#000000",
    });
    
    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        
        if (type === "checkbox") {
            if (checked) {
                setFormData((prev) => ({...prev, hobbies: [...prev.hobbies, value],
                }));
            }
            else {
                setFormData((prev) => ({...prev, hobbies: prev.hobbies.filter((hobby) => hobby !== value),
                }));
            }
        } 
        else if (type === "number" || type === "range") {
            setFormData((prev) => ({...prev, [name]: Number(value),}));
        }
        else {
            setFormData((prev) => ({...prev, [name]: value,}));
        }
    }

  // function handleSubmit(e) {
  //     e.preventDefault();
  //     const existingData = JSON.parse(localStorage.getItem("formSubmissions")) || [];
  //     const updatedData = [...existingData, formData];
  //     localStorage.setItem("formSubmissions",JSON.stringify(updatedData));
  //     alert("Data saved successfully!");
  //     navigate("/view-data");
  // }

    function handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:3001/formSubmissions", {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify(formData),
        })
        .then((res) => res.json())
        .then((data) => {
            alert("Saved to db.json successfully!");
            console.log(data);
        })
        .catch((err) => console.error(err));
    }

return(
    <div className="p-6 flex justify-center">
        <div className="bg-white w-full max-w-3xl p-8 rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold mb-6">Personal Details Form</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="p-2 border rounded" required/>
                <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="p-2 border rounded" required/>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="p-2 border rounded" required/>
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="p-2 border rounded" required/>
                <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="p-2 border rounded"/>
                <input type="url" name="website" placeholder="Website" value={formData.website} onChange={handleChange} className="p-2 border rounded"/>
                <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} className="p-2 border rounded"/>
                <div>
                    <label>Experience: {formData.experience} years</label>
                    <input type="range" name="experience" min="0" max="20" value={formData.experience} onChange={handleChange} className="w-full"/>
                </div>
                <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} className="p-2 border rounded"/>
                <div className="col-span-2">
                    <label className="mr-4">Gender:</label>
                    <label className="mr-4">
                        <input type="radio" name="gender" value="Male" onChange={handleChange}/>
                        {" "} Male
                    </label>
                    <label>
                    <input type="radio" name="gender" value="Female" onChange={handleChange}/>
                    {" "}Female</label>
                </div>
                <div className="col-span-2">
                    <label className="mr-4">Hobbies:</label>
                    <label className="mr-4">
                        <input type="checkbox" value="Reading" onChange={handleChange} />
                        {" "}Reading
                    </label>
                    <label className="mr-4">
                        <input type="checkbox" value="Sports" onChange={handleChange} />
                        {" "}Sports
                    </label>
                    <label>
                        <input type="checkbox" value="Music" onChange={handleChange} />
                        {" "}Music
                    </label>
                </div>
                <select name="country" value={formData.country} onChange={handleChange} className="p-2 border rounded col-span-2">
                    <option value="">Select Country</option>
                    <option>India</option>
                    <option>USA</option>
                    <option>UK</option>
                </select>
                <textarea name="bio" placeholder="Bio" value={formData.bio} onChange={handleChange} className="p-2 border rounded col-span-2"/>
                <div>
                    <label>Favorite Color:</label>
                    <input type="color" name="favoriteColor" value={formData.favoriteColor} onChange={handleChange}/>
                </div>
                
                <button type="submit" className="col-span-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Submit</button>
            </form>
        </div>
    </div>
    );
}

export default Form;
