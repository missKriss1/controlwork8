import "./App.css";
import TollBar from "./Componenets/TollBar/TollBar.tsx";
import Add from "./Container/Add/Add.tsx";
import { Route, Routes } from "react-router-dom";
import { ICategory } from "./types";
import HomeQuote from "./Container/HomeQuote/HomeQuote.tsx";
import Edit from "./Container/Edit/Edit.tsx";

const App = () => {
  const categories: ICategory[] = [
    { category: "Star Wars", id: "star-wars" },
    { category: "Famous people", id: "famous-people" },
    { category: "Saying", id: "saying" },
    { category: "Humour", id: "humour" },
    { category: "Motivation", id: "motivation" },
  ];

  return (
    <>
      <header>
        <TollBar />
      </header>
      <Routes>
        <Route path="/" element={<HomeQuote categories={categories} />} />
        <Route
          path="/quotes/:categoryId"
          element={<HomeQuote categories={categories} />}
        />
        <Route path="/new-quote" element={<Add categories={categories} />} />
        <Route
          path="/quotes/:quoteId/edit"
          element={<Edit categories={categories} />}
        ></Route>
      </Routes>
    </>
  );
};

export default App;
