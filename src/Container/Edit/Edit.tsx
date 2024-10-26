import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import {ICategory, IQuote} from "../../types";
import {useNavigate, useParams} from "react-router-dom";
import axiosApi from "../../../axiosApi.ts";

interface Props {
    categories: ICategory[];
}

const initialFotmEdit ={
    author: '',
    text: '',
    category: 'star-wars',
    id:''
}

const Edit: React.FC <Props> = ({categories}) => {
    const [quote, setQuote] = useState<IQuote>(initialFotmEdit);
    const navigate = useNavigate();
    const params = useParams<{quoteId: string}>();

    const fetchOneQuote = useCallback(async () => {
        if(params.quoteId){
            const response: {data: IQuote} = await axiosApi.get<IQuote>(`/quotes/${params.quoteId}.json`);
            if(response.data) {
                setQuote(response.data);
            }
        }
    },[params.quoteId]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if(!quote) return
        const {name, value} = e.target;
        setQuote((prevState) =>{
            return{
                ...prevState,
                [name]: value,
            }
        });
             return null
    }

    const saveQuote = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(quote.text.trim() !== '' && quote.author.trim() !== '' && quote.category.trim() !== ''){
            try{
                if(quote){
                    await axiosApi.put( `/quotes/${params.quoteId}.json`, {...quote});
                    navigate('/');
                }
            }catch (e){
                console.error(e);
            }
        }else{
            alert('Fill in the fields')
        }
    }
    useEffect(() => {
        if(params.quoteId){
            void fetchOneQuote();
        }
    }, [fetchOneQuote]);
    return (
        <div>
            <h3 className="text-start mt-4 mb-4">Edit quote</h3>
            <div className="w-50">
                <form onSubmit={saveQuote}>
                    <label className="form-label mt-3 ">Category</label>
                    <select
                        className="form-select"
                        name="category"
                        id="category"
                        value={quote.category}
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
                        value={quote.author}
                        onChange={onChange}
                    />
                    <label className="form-label mt-3 mb-">Quote text</label>
                    <textarea
                        className="form-control"
                        name="text"
                        value={quote.text}
                        onChange={onChange}
                    />
                    <button className="btn-dark mt-3" type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default Edit;