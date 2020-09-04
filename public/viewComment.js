class ViewComment extends React.Component {
    constructor() {
        super();
        this.handleDeletePost = this.handleDeletePost.bind(this);
        this.handleEditPost = this.handleEditPost.bind(this);
        this.state = {
            commentArray: []
        };
    }
    componentDidMount() {
        this.fetchMount();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.render !== this.props.render) {
            this.fetchUpdate();
        }
    }
    fetchUpdate(){
        let commentarr = this.state.commentArray
        let comment = this.eachComment( this.handleDeletePost, this.handleEditPost,this.props.file);
        commentarr.push(comment)
        commentarr = commentarr;
        this.setState({commentArray: commentarr});
    }
    fetchMount() {
        fetch('/files')
            .then(res => res.json())
            .then(data => {
                let comment = data.map(this.eachComment.bind(data, this.handleDeletePost, this.handleEditPost));
                this.setState({ commentArray: comment });
            })
    }
    handleEditPost(id) {
        console.log(id);
    }
    handleDeletePost(id) {
        fetch('/files/' + id, {
            method: 'DELETE'
        })
            .then(response => {
                this.fetchMount();
                return response;
            });
    }
    eachComment(handleDeletePost, handleEditPost, pic) {
        var media;
        if (pic.extension === "video") {
            media = <video src={pic.urlPhoto} controls height="140px" width="250px" />
        }
        else if (pic.extension === "audio") {
            media = <audio controls height="300px" width="250px">
                    <source src={pic.urlPhoto} type="audio/mp3"/>
                </audio>
        }
        else if (pic.extension === "image") {
            media = <img src={pic.urlPhoto} height="300px" width="300px" />
        }
        var user = "";
        if (pic.anonimus) {
            user = "Anonymus";
        }
        else {
            user = <a href={"/profile/"+pic.user}>{pic.user}</a>;
        }
        var menubar;
        if (document.cookie !== "") {
            if (pic.user === pic.loginUser) {
                menubar = <div class="pb-menu">
                    <input type="button" onClick={() => {
                        handleEditPost(pic._id);
                    }} value="Editar" />
                    <input type="button" onClick={() => {
                        handleDeletePost(pic._id);
                    }} value="Eliminar" />
                </div>;
            }
        }
        //var date = pic.datePost.toLocaleString();
        var date = new Date(pic.datePost).toLocaleString();
        var like;
        var pbLike;
        if(pic.like){
            like = <img src="/liked.png" width="50px" height="50px"/>;
            pbLike = "pb-liked";
        }
        else{
            like = <img src="/like.png" width="50px" height="50px"/>;
            pbLike = "pb-like";
        }
        return (
            <div class="pb-Container">
                {menubar}
                <div class="pb-user">{user}</div>
                <div class="pb-date">{date}</div>
                <div class="pb-comment">{pic.comment}</div>
                <div class="pb-file">{media}</div>
                <div class={pbLike}>{like}</div>
            </div>
        );
    }
    render() {
        return (
            <div>
                {this.state.commentArray}
            </div>
        );
    }
}