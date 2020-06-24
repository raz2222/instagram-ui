import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
	return (
		<ul className="navbar-nav mr-auto">
			<li className="nav-item active">
				<Link className="nav-link" to="/">
					Home
					<span className="sr-only">(current)</span>
				</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/post/create">
					Create Post
				</Link>
			</li>
		</ul>
	);
}

export default Menu;
