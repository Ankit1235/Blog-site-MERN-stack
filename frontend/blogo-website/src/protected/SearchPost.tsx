import { useState } from "react"
import { PostHook } from "../hook/PostHook";
const SearchPostForm = () => {

    const [seachQuery, setSearchQuery] = useState<string>('');
    const { searchPost } = PostHook();

    const handleChange = (e:any) => {
        const {value} = e.target; 
        setSearchQuery(value)
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        console.log(seachQuery);
        searchPost(seachQuery);
    }

    return (
        <form action="" method="post">
            <input type="text" name="search" value={seachQuery} onChange={handleChange}/>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    )
}

export default SearchPostForm;

