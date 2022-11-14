import React, {useState} from 'react';
import { Button, Input } from 'antd';
import Axios from 'axios';
import {useSelector} from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
const { TextArea } = Input;

function Comment(props) {

    const videoId = props.postId;
    const user = useSelector(state => state.user);
    const [commentValue, setcommentValue] = useState("");

    const handleClick = (e) => {
        setcommentValue(e.currentTarget.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId: videoId
        }

        Axios.post('/api/comment/saveComment', variables)
        .then(response => {
            if(response.data.success){
                setcommentValue("");
                console.log(response.data.result);

                props.refreshFunction(response.data.result)
            }else{
                alert('커멘트를 저장하지 못했습니다.')
            }
        })
    }

    return (
        <div>
            <br />
            <p>Replies</p>
            <hr />

            {/* Comment Lists */}

            {props.commentLists && props.commentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment comment={comment} postId={videoId} refreshFunction={props.refreshFunction} />
                        <ReplyComment commentLists={props.commentLists} postId={videoId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                )
            ))}



            {/* Root Comment Form */}

            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <textarea
                    style={{width: '100%', borderRadius: '5px'}}
                    value={commentValue}
                    onChange={handleClick}
                    placeholder= "코멘트를 작성해주세요"
                />
                <br />
                <button style={{width: '20%', height: '52px'}} onClick={onSubmit}>Submit</button>

            </form>
        </div>
    )
}

export default Comment;
