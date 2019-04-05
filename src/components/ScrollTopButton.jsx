/* global window */

import React, { Component } from 'react';
import styles from '../../styles/cspace/ScrollTopButton.css';
import topIcon from '../../images/top.svg';

const scrollTop = () => {
  window.scroll({
    left: 0,
    top: 0,
  });
};

export default class ScrollTopButton extends Component {
  constructor() {
    super();

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

  setVisibility() {
    const { visible } = this.state;
    const nextVisible = window.document.scrollingElement.scrollTop > 0;

    if (visible !== nextVisible) {
      this.setState({
        visible: nextVisible,
      });
    }
  }

  handleScroll() {
    this.setVisibility();
  }

  render() {
    const { visible } = this.state;

    return (
      <button
        className={visible ? styles.common : styles.hidden}
        type="button"
        onClick={scrollTop}
      >
        <img
          alt="Back to top"
          src={topIcon}
        />
      </button>
    );
  }
}
