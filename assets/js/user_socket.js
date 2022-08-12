// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "assets/js/app.js".

// Bring in Phoenix channels client library:
import {Socket} from "phoenix"


let socket = new Socket("/socket", {params: {token: window.userToken}})

//
// Finally, connect to the socket:
socket.connect()

// Now that you are connected, you can join channels with a topic.
// Let's assume you have a channel with a topic named `room` and the
// subtopic is its id - in this case 42:

const createSocket = (topicId) => {
  let channel = socket.channel(`comments:${topicId}`, {})
  channel.join()
    .receive("ok", resp => { 
      
      console.log("Joined successfully", resp.comments) 
      renderComments(resp.comments)
    })
    .receive("error", resp => { console.log("Unable topic join", resp) })

    channel.on(`comments:${topicId}:new`, renderComment);

    document.querySelector('button').addEventListener("click", () => {
         const content = document.querySelector('textarea').value;

         channel.push('comment:add', { content: content });
    });

  }

  function renderComments(comments) {
     const renderedComments = comments.map(comment => {
      return commentTemplate(comment);
     });


     document.querySelector('.collection').innerHTML = renderedComments.join('');
  }


  function renderComment(e) { 
    const renderedComment = commentTemplate(e.comment);

    document.querySelector('.collection').innerHTML += renderedComment;
  }


  function commentTemplate(comment) {
    let email = 'Anonymous';
    if (comment.user) {
      email = comment.user.email;
    }


    return `
      <li class="collection-item">
        ${comment.content}
        <div class="secondary-content">
          ${email}
        </div>
      </li>
    `;
  }
window.createSocket = createSocket;