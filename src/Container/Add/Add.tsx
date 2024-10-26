import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IAddQuote, ICategory } from "../../types";
import * as React from "react";
import axiosApi from "../../../axiosApi.ts";
import Spinner from "../../Componenets/Spinner/Spinner.tsx";

interface Props {
  categories: ICategory[];
}

const initialStateForCategories = {
  author: "",
  text: "",
  category: "star-wars",
};

const Add: React.FC<Props> = ({ categories }) => {
  const [newQuote, setNewQuote] = useState<IAddQuote>(
    initialStateForCategories,
  );
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setNewQuote((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const saveNewQuote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const quoteAdd = {
      author: newQuote.author,
      text: newQuote.text,
      category: newQuote.category,
    };

    if (
      newQuote.author.trim() !== "" &&
      newQuote.text.trim() !== "" &&
      newQuote.category.trim() !== ""
    ) {
      try {
        await axiosApi.post("/quotes.json", newQuote);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
      setNewQuote({ ...initialStateForCategories });
      navigate("/quotes/" + quoteAdd.category);
      setLoading(false);
    } else {
      alert("Fill in the fields");
    }
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h3 className="text-start mt-4 mb-4">Submit new quote</h3>
          <div className="w-50">
            <form onSubmit={saveNewQuote}>
              <label className="form-label mt-3 ">Category</label>
              <select
                className="form-select"
                name="category"
                id="category"
                value={newQuote.category}
                onChange={onChange}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category}
                  </option>
                ))}
              </select>
              <label className="form-label mt-3 mb-3">Author</label>
              <input
                className="form-control"
                type="text"
                name="author"
                value={newQuote.author}
                onChange={onChange}
              />
              <label className="form-label mt-3 mb-">Quote text</label>
              <textarea
                className="form-control"
                name="text"
                value={newQuote.text}
                onChange={onChange}
              />
              <button className="btn-dark mt-3" type="submit">
                Save
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Add;
