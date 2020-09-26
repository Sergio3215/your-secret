var socket;
class ViewComment extends React.Component {
    constructor() {
        super();
        this.handleDeletePost = this.handleDeletePost.bind(this);
        this.handleEditPost = this.handleEditPost.bind(this);
        this.clickMenu = this.clickMenu.bind(this);
        this.handlerLike = this.handlerLike.bind(this);
        this.clickMen = false;
        this.editClick = false;
        this.idEditPost = "";
        this.state = {
            commentArray: [],
            idEdit: "",
            commentEdit: '',
            anonymusEdit: false
        };
    }
    componentDidMount() {
        this.fetchMount();
        socket = io.connect(window.location.toString().split("/profile/")[0],
            {
                'forceNew': true
            });
        this.setRender();
    }

    setRender() {
        socket.emit('posted', this.state.render)
        socket.on('fileUpdate', (files) => {
            console.log(files)
            this.fetchUpdate(files);
        });
        socket.on('likeUpdate', (liked, id, user, idUser) => {
            //console.log(key)
            //console.log(like)
            console.log(liked)
            console.log(id)
            console.log(user)
            id = id + ":Like";
            this.likeUpdate(id, liked, user, idUser);
        });
    }
    fetchUpdate(file) {
        var data = [];
        data.push(file)
        let commentarr = this.state.commentArray;
        commentarr = commentarr.reverse();
        let comment = data.map(this.eachComment.bind(this));
        commentarr.push(comment[0]);
        commentarr = commentarr.reverse();
        this.setState({ commentArray: commentarr }, () => this.forceUpdate());
    }
    likeUpdate(idLike, liked, user, idUser) {
        try {
            var div = document.getElementById(idLike);
            div.childNodes[0].innerHTML = liked.length;
        }
        catch (e) {
            window.location.href = window.location.toString();
        }

        var nameLiked = "";
        for (var jj = 0; jj < liked.length; jj++) {
            try {
                if (jj == 2) {
                    nameLiked += "y mas...";
                }
                else if (jj === liked.length - 1) {
                    nameLiked += liked[jj].user;
                }
                else {
                    nameLiked += liked[jj].user + ", ";
                }
            }
            catch (e) {

            }
        }
        div.childNodes[2].innerHTML = nameLiked;

        if (idUser === document.cookie.split("=")[1]) {
            var likeBool = false;
            for (var jj = 0; jj < liked.length; jj++) {
                try {
                    if (liked[jj].user === user) {
                        likeBool = true;
                        break;
                    }
                }
                catch (e) {

                }
            }

            if (!likeBool) {
                div.className = "pb-like";
                div.childNodes[1].src = "/like.png";
            }
            else {
                div.className = "pb-liked";
                div.childNodes[0].src = "/liked.png";
                div.childNodes[1].src = "/liked.png";
            }
        }
    }

    fetchMount() {
        if (this.props.profile) {
            fetch('/files/' + this.props.username)
                .then(res => res.json())
                .then(data => {
                    let profile = data.map(this.eachComment.bind(this));
                    this.setState({ commentArray: profile }, () => this.forceUpdate());
                })
        }
        else {
            fetch('/files')
                .then(res => res.json())
                .then(data => {
                    let comment = data.map(this.eachComment.bind(this));
                    this.setState({ commentArray: comment });
                })
        }
    }
    handleEditPost(id) {
        console.log(id);
        this.editClick = !this.editClick;

        var username = document.getElementById(id + ":pb-user").innerHTML;
        var comment = document.getElementById(id + ":pb-comment").innerHTML;
        var key = false;
        if (username === "Anonimo") {
            key = true;
        }

        if (this.editClick) {
            this.setState({
                idEdit: id,
                commentEdit: comment,
                anonymusEdit: key
            }, () => this.forceUpdate())
        }
        else {
            this.setState({
                idEdit: "",
                commentEdit: '',
                anonymusEdit: false
            }, () => this.forceUpdate())
        }
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
    clickMenu(id) {
        var div = document.getElementById(id);
        var srt = "";
        if (this.clickMen) {
            this.clickMen = false;
            srt = "none";
        }
        else {
            this.clickMen = true;
            srt = "inline";
        }
        div.getElementsByClassName("menu-panel")[0].style.display = srt;
        div.getElementsByTagName("input")[0].style.display = srt;
        div.getElementsByTagName("input")[1].style.display = srt;
    }
    handlerLike(e) {
        console.log(e);
        var key = false;
        if (e.target.parentNode.className !== "pb-liked") {
            key = true;
        }
        var data = {
            like: key
        }

        var div = document.getElementById(e.target.parentNode.id);
        if (e.target.parentNode.className === "pb-liked") {
            div.className = "pb-like";
            div.childNodes[1].src = "/like.png";
        }
        else {
            div.className = "pb-liked";
            div.childNodes[0].src = "/liked.png";
            div.childNodes[1].src = "/liked.png";
        }

        var id = e.target.parentNode.id;
        id = id.split(':');
        id = id[0];
        fetch('/files/' + id, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })
            .catch(err => console.log(err))
    }
    eachComment(pic) {
        var media;
        if (pic.extension === "video") {
            media = <video src={"/" + pic.urlPhoto} controls height="140px" width="250px" />
        }
        else if (pic.extension === "audio") {
            media = <audio controls height="300px" width="250px">
                <source src={"/" + pic.urlPhoto} type="audio/mp3" />
            </audio>
        }
        else if (pic.extension === "image") {
            media = <img src={"/" + pic.urlPhoto} height="300px" width="300px" />
        }
        var user = "";
        if (pic.anonimus) {
            user = "Anonimo";
        }
        else {
            user = <a href={"/profile/" + pic.user}>{pic.user}</a>;
        }
        var menubar;
        if (document.cookie !== "") {
            if (document.cookie.split("=")[1] === pic.idUser) {
                menubar = <div class="pb-menu" id={pic._id} onClick={(e) => {
                    this.clickMenu(pic._id);
                }}><div class="containerMenu"></div>
                    <div id="menu-Post" class="menu-panel">
                        <input type="button" id="edit" onClick={() => {
                            this.handleEditPost(pic._id);
                        }} value="Editar" />
                        <input type="button" id="delete" onClick={() => {
                            this.handleDeletePost(pic._id);
                        }} value="Eliminar" />
                    </div>
                </div>;
            }
        }
        //var date = pic.datePost.toLocaleString();
        var date = new Date(pic.datePost).toLocaleString();

        var nameLiked = "";
        var likeBool = false;
        for (var jj = 0; jj < pic.liked.length; jj++) {
            try {
                if (pic.liked[jj].user === pic.loginUser) {
                    likeBool = true;
                    break;
                }
            }
            catch (e) {

            }
        }

        for (var jj = 0; jj < pic.liked.length; jj++) {
            if (pic.liked[jj].user !== undefined) {
                if (jj == 2) {
                    nameLiked += "y mas...";
                }
                else if (jj === pic.liked.length - 1) {
                    nameLiked += pic.liked[jj].user;
                }
                else {
                    nameLiked += pic.liked[jj].user + ", ";
                }
            }
            else {
                pic.liked.length = 0;
            }
        }

        var like;
        var pbLike;
        if (likeBool) {
            like = <img src="/liked.png" width="50px" height="50px" />;
            pbLike = "pb-liked";
        }
        else {
            like = <img src="/like.png" width="50px" height="50px" />;
            pbLike = "pb-like";
        }

        return (
            <div class="pb-Container">
                {menubar}
                <div class="pb-header">
                    <div id={pic._id + ":pb-user"} class="pb-user">{user}</div>
                    <div class="pb-date">{date}</div>
                </div>
                <div id={pic._id + ":pb-comment"} class="pb-comment">{pic.comment}</div>
                <div class="pb-file">{media}</div>
                <div class={pbLike} id={pic._id + ":Like"} onClick={(e) => {
                    if (document.cookie !== "") {
                        this.handlerLike(e);
                    }
                    else {
                        alert("you need register on the web page")
                    }
                }}>
                    <span>{pic.liked.length}</span>
                    {like}
                    <span class="pb-likeNames">{nameLiked}</span>
                </div>
            </div>
        );
    }
    render() {
        var editPost;
        if (this.editClick) {
            editPost = <ModalPostView id={this.state.idEdit}
                commentEdit={this.state.commentEdit} anonymusEdit={this.state.anonymusEdit}
                handleEditPost={this.handleEditPost}
            />
        }
        return (
            <div>
                <div id="pb-postView">
                    {this.state.commentArray}
                </div>
                <div>
                    {editPost}
                </div>
            </div>
        );
    }
}
class ModalPostView extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleComment = this.handleComment.bind(this);
        this.handleAnonymus = this.handleAnonymus.bind(this);
        this.state = {
            commentEdit: this.props.commentEdit,
            anonymusEdit: this.props.anonymusEdit
        }
    }
    handleComment(e) {
        this.setState({ commentEdit: e.target.value });
    }
    handleAnonymus(e) {
        this.setState({ commentEdit: e.target.checked });
    }
    handleSubmit(e) {
        e.preventDefault();
        fetch('/files?_id=' + this.props.id + "&comment=" + this.state.commentEdit + "&anonimus=" + this.state.anonymusEdit, {
            method: "put",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json())
            .then(data => {
                window.location.href = "/";
            })
    }
    handleComment(e) {
        this.setState({ commentEdit: e.target.value });
    }
    handleAnonymus(e) {
        this.setState({ anonymusEdit: e.target.checked });
    }
    render() {
        var sizeWidth = document.documentElement.clientWidth;
        var sizeHeight = document.documentElement.clientHeight;
        return (
            <div class="containerEdit" style={{ "width": sizeWidth, "height": sizeHeight - 47 }}>
                <div class="dialogEdit">
                    <div class="headerEdit">
                        <input type="button" value="X" onClick={() => this.props.handleEditPost(this.props.id)} />
                    </div>
                    <form onSubmit={this.handleSubmit} class="fm-editPost">
                        <div class="comment">
                            <textarea onChange={this.handleComment}>
                                {this.state.commentEdit}
                            </textarea>
                        </div>
                        <div class="Anonimo">
                            <label class="pc-lb-anonymus">Anonimo</label>
                            <label class="container" onChange={this.handleAnonymus}>
                                <input type="checkbox" name="anonimus" checked={this.state.anonymusEdit} />
                                <span class="checkmark "></span>
                            </label>
                        </div>
                        <div>
                            <input id="editPostSubmit" type="submit" value="Editar" />
                            <div class="arrowEdit"></div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}