import React, {useState} from 'react';
import {Comment, Avatar, Button, Input} from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import LikeDislikes from './LikeDislikes';

const { TextArea } = Input;

function SingleComment(props) {

    const user = useSelector(state => state.user);
    const [openReply, setopenReply] = useState(false);
    const [CommentValue, setCommentValue] = useState("");


    const openReplyOpen = () => {
        setopenReply(!openReply)
    }


    const onHandleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        // 재댓글은 프로퍼티 하나가 더 있다 (response id)
        const variables = {
            content: CommentValue,
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id
        }

        Axios.post('/api/comment/saveComment', variables)
        .then(response => {
            if(response.data.success){
                console.log(response.data.result)
                setCommentValue("");
                setopenReply(false);
                props.refreshFunction(response.data.result);
            }else{
                alert('커멘트를 저장하지 못했습니다.')
            }
        })
    }

    const actions = [
        <LikeDislikes userId={localStorage.getItem('userId')} commentId={props.comment._id}/>
        ,<span onClick={openReplyOpen} key="comment-basic-reply-to">Reply to</span>
    ]

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image}/>}
                content={<p> {props.comment.content} </p>}
            >
            </Comment>

            {/* openReply true일때만 보여지는 form */}
            {openReply &&
        
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <textarea
                        style={{width: '100%', borderRadius: '5px'}}
                        value={CommentValue}
                        onChange={onHandleChange}
                        placeholder= "코멘트를 작성해주세요"
                    />
                    <br />
                    <button style={{width: '20%', height: '52px'}} onClick={onSubmit}>Submit</button>
                </form>
            }


        </div>
    )
}


export default SingleComment;
