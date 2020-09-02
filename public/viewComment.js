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
            this.fetchMount();
        }
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
                this.props.setRender();
                return response;
            });
    }
    eachComment(handleDeletePost, handleEditPost, pic) {
        var media;
        if (pic.extension === "video") {
            media = <video src={pic.urlPhoto} controls height="300px" width="250px" />
        }
        else if (pic.extension === "audio") {
            media = <audio src={pic.urlPhoto} height="300px" width="250px" />
        }
        else if (pic.extension === "image") {
            media = <img src={pic.urlPhoto} height="300px" width="250px" />
        }
        var user = "";
        if (pic.anonimus) {
            user = "Anonymus";
        }
        else {
            user = pic.user;
        }
        var menubar;
        if (document.cookie !== "") {
            if (pic.user === document.getElementById("username").innerHTML) {
                menubar = <div>
                    <input type="button" onClick={() => {
                        handleDeletePost(pic._id);
                    }} value="Eliminar" />
                    <input type="button" onClick={() => {
                        handleEditPost(pic._id);
                    }} value="Editar" />
                </div>;
            }
        }
        return (
            <div style={{ "margin-top": "15px" }}>
                <div>{user}</div>
                <div>{pic.comment}</div>
                <div>{media}</div>
                <div>{pic.datePost}</div>
                {menubar}
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