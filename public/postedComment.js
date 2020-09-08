class PostCommet extends React.Component {
    constructor() {
        super();
        this.handlerSubmit = this.handlerSubmit.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.viewPrew;
        this.buttonView;
        this.state = {
            user: [],
            userSelected: '',
            classText:'selectFile'
        };
    }

    handleChangeSelect(e) {
        this.setState({
            userSelected: e.target.value
        });
    }
    handleFile(e) {
        //console.log(e.target);
        //var img = document.getElementById("pc-image");
        var file = e.target.files[0];
        console.log(URL.createObjectURL(e.target.files[0]))
        var typeFile = file.type.split("/");
        if (typeFile[0] === "image") {
            this.viewPrew = <img src={URL.createObjectURL(e.target.files[0])} id="pc-view" widht="70px" height="70px" />;
        }
        else if (typeFile[0] === "video") {
            this.viewPrew = <video src={URL.createObjectURL(e.target.files[0])} id="pc-view" widht="50px" height="50px" />;
        }
        else {
            this.viewPrew = <img src="audio.jpg" id="pc-view" widht="70px" height="70px" />;
        }

        this.buttonView=<label class="pc-close" onClick={this.clickClouse.bind(this)}>x</label>;

        this.setState({ classText: 'fileSelected' }, () => this.forceUpdate());

    }
    clickClouse(){
        this.viewPrew = [];
        this.buttonView=[];
        document.getElementById("pc-file").value = "";
        this.setState({ classText: 'selectFile' }, () => this.forceUpdate());
    }
    handlerSubmit(e) {
        e.preventDefault();
        //console.log("send");
        var myForm = document.getElementById("myForm");
        var formData = new FormData(myForm);
        document.getElementById("myForm").reset();
        this.viewPrew = [];
        fetch('/files', {
            method: 'POST',
            body: formData
        })
    }
    render() {
        return (
            <form id="myForm" onSubmit={(e) => {
                this.handlerSubmit(e);
            }} enctype="multipart/form-data" autoComplete="off">
                    <textarea id="pc-comment" placeholder="let write a comment" name="comment"></textarea>
                    <div class="pc-image">
                        {this.viewPrew}
                        {this.buttonView}
                        <b class={this.state.classText} onClick={()=>document.getElementById("pc-file").click()}>
                            Añade tu multimedia
                        </b>
                        <input id="pc-file" type="file" name="file" onChange={this.handleFile} />
                    </div>
                <div class="pc-footer">
                    <label class="pc-lb-anonymus">Anonimo</label>
                    <label class="container">
                        <input type="checkbox" name="anonimus" />
                        <span class="checkmark "></span>
                    </label>
                    <input id="pc-submit" type="submit" value="send" />
                </div>
            </form>
        );
    }
}