class Navigation extends React.Component{
    render(){
        return(
            <nav class="Menu-principal-btn">
                <ul>
                    <li onClick={this.props.changeBody}>
                        Inicio
                    </li>
                    <li onClick={this.props.changeBody}>
                        FAQ
                    </li>
                    <li onClick={this.props.changeBody}>
                        Support
                    </li>
                </ul>
            </nav>
        );
    }
}