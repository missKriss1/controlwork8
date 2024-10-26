import {ICategory, IQuote, IQuoteAPI} from "../../types";
import * as React from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import QuoteItem from "../../Componenets/QuoteItem/QuoteItem.tsx";
import axiosApi from "../../../axiosApi.ts";

interface Props {
    categories : ICategory[];
}
const HomeQuote: React.FC <Props> = ({categories}) => {
    const params = useParams();
    const navigate = useNavigate();

    const [quotes, setQuotes] = useState<IQuote[]>([]);

    const fetchQuotes = useCallback(async () => {
        try {
            const response: { data: IQuoteAPI } = await axiosApi.get<IQuoteAPI>('/quotes.json');
            if (response.data) {
                const quotesApi: IQuote[] = Object.keys(response.data).map(
                    (quoteKey) => {
                        return {
                            ...response.data[quoteKey],
                            id: quoteKey,
                        };
                    },
                );
                setQuotes(quotesApi);
            }
        } catch (e) {
            console.error(e);
        }
    }, []);

    const deleteQuote = async (id: string | undefined) => {
        console.log("work");
        try {
            if (id) {
                console.log("work");
                await axiosApi.delete<IQuote>(`quotes/${id}.json`);
                setQuotes(prevQuotes => prevQuotes.filter(quote => quote.id !== id));
            }
            navigate("/");
        } catch (e) {
            console.log(e);
        }
    };


    useEffect(() => {
           void fetchQuotes()
    }, [fetchQuotes, params.category]);

    return (
        <div>
            <div  className="row">
                <div className="col-5">
                    <ul>
                        <li>
                            <NavLink className="text-black text-decoration-none" to='/'>All</NavLink>
                        </li>
                    </ul>
                    {categories.map((category) => (
                        <li key={category.id}>
                            <NavLink className="text-black text-decoration-none" to={`/quotes/${category.id}`}>{category.category}</NavLink>
                        </li>
                    ))}
                </div>
                <div className="col-5">
                    {quotes.map((quote: IQuote) => (
                        <QuoteItem quote={quote} key={quote.id} deleteQuote ={deleteQuote}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeQuote;