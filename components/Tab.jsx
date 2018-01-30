export default class Tab extends React.Component {
    render() {
        return (
            <li>
                <a className='nav-link'>{this.props.name}</a>
            </li>
        );
    }
}

/*
li.nav-item
                a.nav-link.active#home-tab(data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true")
                    | Activities
 */