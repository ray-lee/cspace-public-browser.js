/* global window */

import React, { Component } from 'react';
import styles from '../../styles/cspace/ScrollTopButton.css';
import topIcon from '../../images/top.svg';

export default class ScrollTopButton extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);

    this.setVisibility();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleClick() {
    window.scroll({
      left: 0,
      top: 0,
    });
  }

  handleScroll() {
    this.setVisibility();
  }

  setVisibility() {
    const { visible } = this.state;
    const nextVisible = window.document.scrollingElement.scrollTop > 0;

    if (visible !== nextVisible) {
      this.setState({
        visible: nextVisible,
      });
    }
  }

  render() {
    const { visible } = this.state;

    return (
      <button
        className={visible ? styles.common : styles.hidden}
        onClick={this.handleClick}
      >
        <img
          alt="Back to top"
          src={topIcon}
        />
      </button>
    );
  }
}
