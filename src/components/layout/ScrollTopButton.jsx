/* global window */

import React, { Component } from 'react';
import { defineMessages } from 'react-intl';
import IconButton from './IconButton';
import styles from '../../../styles/cspace/ScrollTopButton.css';

const messages = defineMessages({
  label: {
    id: 'scrollTopButton.label',
    defaultMessage: 'Back to top',
  },
});

const scrollTop = () => {
  if (window.scrollTo) {
    window.scrollTo({
      left: 0,
      top: 0,
    });
  }
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

  handleScroll() {
    this.setVisibility();
  }

  setVisibility() {
    const {
      visible,
    } = this.state;

    const nextVisible = window.document.scrollingElement.scrollTop > 0;

    if (visible !== nextVisible) {
      this.setState({
        visible: nextVisible,
      });
    }
  }

  render() {
    const {
      visible,
    } = this.state;

    return (
      <IconButton
        className={visible ? styles.common : styles.hidden}
        labelMessage={messages.label}
        onClick={scrollTop}
      />
    );
  }
}
