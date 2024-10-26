import {IQuote} from "../../types";
import * as React from "react";
import {useNavigate} from "react-router-dom";
interface Props {
    quote: IQuote;
    deleteQuote: (id: string | undefined) => void;
}
const QuoteItem: React.FC <Props> = ({quote, deleteQuote}) => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="text-start mt-4 ">
                <b className="pb-3">
                    {quote.category}
                </b>
                <div className="border border-dark p-3">
                    <p>{quote.text}</p>
                    <strong> - {quote.author}</strong>
                    <hr/>
                    <div>
                        <button className="btn btn-dark" onClick={() => navigate(`/quotes/${quote.id}/edit`)}> Edit</button>
                        <button className="btn-close ms-4" onClick={() => deleteQuote(quote.id) }></button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default QuoteItem;