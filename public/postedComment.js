class PostCommet extends React.Component {
    constructor() {
        super();
        this.handlerSubmit = this.handlerSubmit.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.state = {
            user: [],
            userSelected: ''
        };
    }
    componentDidMount() {
        this.fetchMount();
    }
    fetchMount() {
        var id = "";
        if (document.cookie !== "") {
            id = document.cookie.split("=");
        }
        fetch('/users/' + id[1])
            .then(res => res.json())
            .then(data => {
                this.setState({
                    userSelected: data.user
                });
            });
    }

    handleChangeSelect(e) {
        this.setState({
            userSelected: e.target.value
        });
    }

    handlerSubmit(e) {
        e.preventDefault();
        console.log("send");
        var myForm = document.getElementById("myForm");
        var formData = new FormData(myForm);
        document.getElementById("myForm").reset();
        fetch('/files', {
            method: 'POST',
            body: formData
        })
        .then(response =>{
            this.props.setRender();
            return response;
        })
    }
    render() {
        return (
            <form id="myForm" onSubmit={(e) => {
                this.handlerSubmit(e);
            }} enctype="multipart/form-data" autoComplete="off">
                <div>
                    <textarea placeholder="let write a comment" name="comment"></textarea>
                </div>
                <div>
                    <label>Upload File</label>
                    <input type="file" name="file" />
                </div>
                <div>
                    <label>Anonimus</label>
                    <input type="checkbox" name="anonimus" />
                    <input type="submit" value="send" />
                </div>
            </form>
        );
    }
}