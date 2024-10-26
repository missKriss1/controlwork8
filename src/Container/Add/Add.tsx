import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {ICategory} from "../../types";
import * as React from "react";
import axiosApi from "../../../axiosApi.ts";

interface Props {
    categories: ICategory[];
}

const initialStateForCategories ={
    author: '',
    text: '',
    category: ''
}

const Add: React.FC <Props> = ({categories}) => {
    const [newQuote, setNewQuote] = useState(initialStateForCategories);
    const navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement |HTMLSelectElement>) =>{
        const {name, value} = e.target;
        setNewQuote((prevState) =>{
            return{
                ...prevState,
                [name]: value
            }
        });
    }

    const saveNewQuote = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        const quoteAdd ={
            author: newQuote.author,
            text: newQuote.text,
            category: newQuote.category
        }

        if(newQuote.author.trim() !== '' &&  newQuote.text.trim() !== ''){
            try{
                await axiosApi.post('/quotes.json', quoteAdd);
            }catch (e){
                console.error(e);
            }
            setNewQuote({...initialStateForCategories});
            navigate('/');
        }else{
            alert("Fill in the fields");
        }
    };

    return (
        <div>
            <h3 className="text-start mt-4 mb-4">Submit new quote</h3>
            <div className="w-50">
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
                <form onSubmit={saveNewQuote}>
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
                    <button className="btn-dark mt-3" type="submit">Save</button>
                </form>
            </div>

        </div>
    );
};

export default Add;