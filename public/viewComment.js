class ViewCommet extends React.Component {
    constructor() {
        super();
        this.state = {
            commentArray: []
        };
    }
    componentDidMount() {
        this.fetchMount();
    }
    fetchMount() {
        fetch('/files')
            .then(res => res.json())
            .then(data => {
                let comment = data.map(this.eachComment.bind(data));
                this.setState({ commentArray: comment });
            })
    }
    eachComment(pic) {
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
        return (
            <div style={{ "margin-top": "15px" }}>
                <div>{user}</div>
                <div>{pic.comment}</div>
                <div>{media}</div>
                <div>{pic.datePost}</div>
                <div>
                    <button value={pic._id}>Eliminar</button>
                    <button value={pic._id}>Editar</button>
                </div>
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