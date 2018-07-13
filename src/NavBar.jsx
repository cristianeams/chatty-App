import React from 'react';

export default function NavBar(props) {
  return (
    <nav className="navbar">
      <div>
      <i className="far fa-comments fa-3x"></i>
      <a href="/" className="navbar-brand">Chatty</a>
      </div>
      <span className="counter">{ props.counter } users online </span>
    </nav>
  );
}