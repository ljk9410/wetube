import fetch from "node-fetch";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const addComment = (text, newCommentId) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    const icon = document.createElement("i");
    const span = document.createElement("span");
    const span2 = document.createElement("span");
    
    newComment.className = "video__comment";
    newComment.dataset.id = newCommentId;
    span.innerText = ` ${text}`;
    span2.innerText = `❌`;
    icon.className = "fas fa-comment";
    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(span2);
    videoComments.prepend(newComment);
}

const handleSubmit = async (event) => {
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id
    
    event.preventDefault();
    if (text === "") {
        return ;
    }
    const response = await fetch(`/api/videos/${videoId}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    });
    const { newCommentId } = await response.json();
    textarea.value = "";
    if (response.status === 201) {
        addComment(text, newCommentId);
    }
};

if (form) {
    form.addEventListener("submit", handleSubmit);
};