import { ICategory, IQuote, IQuoteAPI } from "../../types";
import * as React from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import QuoteItem from "../../Componenets/QuoteItem/QuoteItem.tsx";
import axiosApi from "../../../axiosApi.ts";
import Spinner from "../../Componenets/Spinner/Spinner.tsx";

interface Props {
  categories: ICategory[];
}

const HomeQuote: React.FC<Props> = ({ categories }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [quotes, setQuotes] = useState<IQuote[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchQuotes = useCallback(async () => {
    setLoading(true);
    try {
      const response: { data: IQuoteAPI } =
        await axiosApi.get<IQuoteAPI>("/quotes.json");
      if (response.data) {
        const quotesApi: IQuote[] = Object.keys(response.data).map(
          (quoteKey) => ({
            ...response.data[quoteKey],
            id: quoteKey,
          }),
        );
        setQuotes(quotesApi);
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }, []);

  const deleteQuote = async (id: string | undefined) => {
    try {
      if (id) {
        await axiosApi.delete<IQuote>(`quotes/${id}.json`);
        setQuotes((prevQuotes) =>
          prevQuotes.filter((quote) => quote.id !== id),
        );
      }
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const category = () => {
    const filteredCategories = categories.filter(
      (cat) => cat.id === params.categoryId,
    );
    return filteredCategories.length > 0
      ? filteredCategories[0].category
      : "All";
  };

  let filteredQuotes;

  if (params.categoryId) {
    filteredQuotes = quotes.filter(
      (quote) => quote.category === params.categoryId,
    );
  } else {
    filteredQuotes = quotes;
  }

  useEffect(() => {
    void fetchQuotes();
  }, [fetchQuotes, params.categoryId]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="row">
          <div className="col-5">
            <ul>
              <li className="text-start text-dark">
                <NavLink className="text-black text-decoration-none" to="/">
                  All
                </NavLink>
              </li>
            </ul>
            {categories.map((category) => (
              <li className="text-start ms-3" key={category.id}>
                <NavLink
                  className="text-black text-decoration-none"
                  to={`/quotes/${category.id}`}
                >
                  {category.category}
                </NavLink>
              </li>
            ))}
          </div>
          <div className="col-5">
            <h1>{params.categoryId ? category() : "All"}</h1>
            {filteredQuotes.length > 0 ? (
              filteredQuotes.map((quote: IQuote) => (
                <QuoteItem
                  quote={quote}
                  key={quote.id}
                  deleteQuote={deleteQuote}
                />
              ))
            ) : (
              <h3>No quotes yet</h3>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeQuote;
