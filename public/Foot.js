class Footer extends React.Component{
    render(){
        var data = new Date();
        var title = document.querySelector("title").innerHTML;
        return(
            <div>
                <hr/>
                <footer>
                    Copyright &copy; {title} {data.getFullYear()}
                </footer>
            </div>
        );
    }
}