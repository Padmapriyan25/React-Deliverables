import React, {useState} from "react";

function Pokemon(){
    const [pokemonName, setPokemonName] = useState("");
    const [sprite, setSprite] = useState(null);
    const [error, setError] = useState("");

    const fetchData = async () => {
        try{
            setError("");
            setSprite(null);

            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

            if(!response.ok){
                throw new Error("Pokemon not found!!");
            }
            const data = await response.json();
            console.log(data);

            setSprite(data.sprites.front_default); 
        }
        catch(e){
            setError(e.message);
        }
    }

    // return (
    //     <div className="border max-w-100 flex items-center flex-col justify-center">
    //         <h1 className="border text-5xl p-4 font-bold text-center">Pokemon Search</h1>
    //         <div className="border flex items-center justify-center gap-5 w-full">
    //             <input  className="border h-10 p-4 text-xl rounded-xl"  type="text" placeholder="Enter Pokemon name" value={pokemonName} onChange={(e) => setPokemonName(e.target.value)}/>
    //             <button  className="border h-8 w-20 rounded-xl bg-emerald-400 text-amber-50 text-xl" onClick={fetchData}>Search</button>
    //         </div>
    //         {error && <p  className="border" style={{ color: "red" }}>{error}</p>}
    //         {sprite && (<img  className=" w-62.5 h-62.5 bg-gray-200 rounded-2xl" src={sprite} alt="pokemon" />)}
    //     </div>
    // );

    return(
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
            <div className="w-96 bg-white shadow-xl rounded-2xl p-6">
                <h1 className="text-3xl font-bold text-center mb-6">Pokémon Search</h1>
                <div className="flex gap-3">
                    <input type="text" placeholder="Enter Pokémon name" value={pokemonName} onChange={(e) => setPokemonName(e.target.value)} className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"/>
                    <button onClick={fetchData} className="bg-emerald-500 text-white px-5 py-2 rounded-xl hover:bg-emerald-600 active:scale-95 transition">Search</button>
                </div>
                <div className="h-60 flex items-center justify-center mt-6 bg-gray-50 rounded-xl">
                    {sprite && (<img src={sprite} alt="pokemon" className="max-h-52 drop-shadow-md"/>)}
                    {!sprite && !error && (<span className="text-gray-400 text-sm">Search for a Pokémon</span>)}
                    {error && (<div className="flex flex-col items-center text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M5.455 19h13.09c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.723 16c-.77 1.333.192 3 1.732 3z"/>
                        </svg>
                        <p className="text-sm">Pokémon not found</p>
                    </div>
                    )}
                </div>
            </div>
        </div>
);
}

export default Pokemon

{/* 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="./dist/output.css" rel="stylesheet">
</head>
<body class="flex items-center justify-center">
    <div class="border border-gray-800 min-h-50 min-w-lg max-w-lg rounded-2xl flex flex-col justify-center items-center">

        <input class="border border-amber-400 rounded-2xl w-fit" type="text" id="pokeName" placeholder="Enter Pokemon Name">
        <button class="border border-b-emerald-600 rounded-2xl bg-emerald-300 m-5" onclick="fetchData()">Fetch Pokemon</button>
        <br>
        <img src="" alt="PokemonImg" id="pokemonImg" style="display: none;">
    
        <script src="./script.js"></script>
    </div>    
</body>
</html>

async function fetchData() {
    try{
        const pokemonName = document.getElementById("pokeName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if(!response.ok){
            throw new Error("Could not fetch resource")
        }
        const data = await response.json();
        console.log(data);

        const sprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemonImg");

        imgElement.src = sprite;
        imgElement.style.display = "block";

    }
    catch(error){
        console.log(error);
    }
} */}