class CommentModel {
    constructor(type) {
        this.type = type;
        this.comment = readFromLS(this.type) || [];
    }
    getComments(q=null) {
        if (q !== null) {
            return this.comment.filter(el => el.name === q);
        }
        return this.comment;
    }


    addComment(postName, comment) {
        const newComment = {
            name: postName, 
            comment: comment, 
            date: new Date()
        };
        this.comment.push(newComment);
        writeToLS(this.type, this.comment);
    }
}

function writeToLS(type, comment) {
    localStorage.setItem(type, JSON.stringify(comment));
}

function readFromLS(type) {
    return JSON.parse(localStorage.getItem(type));
}

const commentUI = 
`<div class="addComment">
<h2>Add a comment</h2>
<input type="text" id="commentEntry" />
<button id="commentSubmit">Comment</button>
</div>
<h2>Comments</h2>
<ul class="comments"></ul>`;

function renderCommentList(element, comment, hikename) {
    let filtered = comment.filter(el => el.name === hikename);
    filtered = filtered ? filtered: [];
    comments = document.getElementById('comments');
    filtered.forEach(el => {
        comments.innerHTML += `<li>${el.name}: ${el.comment}</li>`;
    });
}

class Comments {
    constructor(type, commentElementId) {
        this.type = type;
        this.commentElementId = commentElementId;
        this.model = new CommentModel(this.type);
    }

    addSubmitListener(postName) {
        document.getElementById('commentSubmit').ontouchend = () => {
            const comment = document.getElementById('commentEntry').value;
            this.model.addComment(postName, comment);
            renderCommentList(document.querySelector('.comments'), this.model.getComments(), postName);
        };
    }    

    showCommentList(q=null) {
        try {
            const parent = document.getElementById('');
            console.log(parent);
            if (!parent) {
                throw new Error('No element found');
            }
            if (parent.innerHTML === '') {
                // parent.innerHTML = commentUI;
                console.log('rendering');
            }
            if (q !== null) {
                document.querySelector('.addComment').style.display = 'None';
            }
            let comments = this.model.getComments(q);
            if (comments === null) {
                comments = [];
            }
            // renderCommentList(parent.lastChild, comments, postName);
        } catch (e) {
            console.log(e);
        }
    }
}

export default Comments;

