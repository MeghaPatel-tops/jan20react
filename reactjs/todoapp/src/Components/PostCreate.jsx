import React, { useState } from 'react'

function PostCreate() {
    const [postdata, setPostData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData({
            ...postdata,
            [name]: value
        })
    }

    const hanldeImage = (e) => {

        const file=e.target.files[0];
          const reader = new FileReader();

            reader.onload = function() {
                console.log("Base64 Image:", reader.result);
                setPostData({
                    ...postdata,
                    ['pimage']:reader.result
                })
            };

            reader.readAsDataURL(file); // Convert to Base64

    }

    const handleClick = (e) => {
        e.preventDefault()
         if(localStorage.getItem('postarray')){
            let arr = localStorage.getItem('postarray');
            arr = JSON.parse(arr);
            let newArr=  [
                ...arr,
                postdata

            ]
            console.log(arr);
            
            localStorage.setItem('postarray',JSON.stringify(newArr))

         }
         else{
             console.log(postdata);
            let postArray=[postdata]
            localStorage.setItem('postarray',JSON.stringify(postArray))
         }

    }


    return (
        <div>
            <div class="container mt-4">
                <div class="card shadow">
                    <div class="card-header bg-primary text-white">
                        <h4>Create New Post</h4>
                    </div>

                    <div class="card-body">
                        <form id="postForm" method='post'>

                            <div class="mb-3">
                                <label for="title" class="form-label fw-bold">Post Title</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="title"
                                    placeholder="Enter post title"
                                    required
                                    name='title'
                                    onChange={handleChange}
                                />
                            </div>
                            <div class="mb-3">
                                <label for="title" class="form-label fw-bold">Post Image</label>
                                <input
                                    type="file"
                                    class="form-control"
                                    id="title"
                                    name='pimage'
                                    required
                                    onChange={hanldeImage}
                                />
                            </div>

                            <div class="mb-3">
                                <label for="description" class="form-label fw-bold">Post Description</label>
                                <textarea
                                    class="form-control"
                                    id="description"
                                    rows="4"
                                    placeholder="Enter post description"
                                    required
                                    name='description'
                                    onChange={handleChange}
                                ></textarea>
                            </div>


                            <button class="btn btn-success w-100" onClick={handleClick}>Create Post</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostCreate