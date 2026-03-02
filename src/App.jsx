import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import List from "./List";
import Pokemon from "./Pokemon";
import Form from "./Form";
import ViewData from "./ViewData";

function App() {

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header/>
      <Routes>
        <Route path="/viewdata" element={<ViewData />} />
        <Route path="/list" element={<List />} />
        <Route path="/pokemon" element={<Pokemon />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;