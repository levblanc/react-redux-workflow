'use strict';

import React from 'react';

export default class BreakView extends React.Component {
  render() {
    let label = this.props.breakLabel;
    let cssClassName = this.props.breakClassName;

    return (
      <li className={ cssClassName }>
        {label}
      </li>
    );
  }
};
