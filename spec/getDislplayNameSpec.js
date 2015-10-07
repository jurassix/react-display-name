import {expect} from 'chai';
import React, {Component} from 'react';
import getDisplayName from '../getDisplayName';

describe('getDisplayName', () => {
  it('returns display name for component when displayName is set', () => {
    class Simple extends Component {
      render() {
        return <div></div>;
      }
    }
    Simple.displayName = 'Simple';
    expect(getDisplayName(Simple)).to.equal('Simple');
  });
  it('returns display name for component when displayName is set from staic initializer', () => {
    class Simple extends Component {
      static displayName = 'Simple';
      render() {
        return <div></div>;
      }
    }
    expect(getDisplayName(Simple)).to.equal('Simple');
  });
  it('returns display name for a stateless component', () => {
    const Simple = (props) => <div></div>

    expect(getDisplayName(Simple)).to.equal('Simple');
  });
  it('returns display name for component', () => {
    class Simple extends Component {
      render() {
        return <div></div>;
      }
    }

    expect(getDisplayName(Simple)).to.equal('Simple');
  });
  it('returns default display name non react classes', () => {
    const Simple = {};
    expect(getDisplayName(Simple)).to.equal('Component');
  });
});
