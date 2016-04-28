import { expect } from 'chai';
import React, { Component } from 'react';
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
      static displayName = 'Simple'
      render() {
        return <div></div>;
      }
    }
    expect(getDisplayName(Simple)).to.equal('Simple');
  });
  it('returns display name of html string component', () => {
    expect(getDisplayName('input')).to.equal('input');
  });
  it('returns display name for a stateless component', () => {
    const Simple = () => <div></div>;

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
  it('wraps a component successfully (HoCs) ', () => {
    const container = (WrappedComponent) => {
      class Container extends Component {
        static displayName = `Container(${getDisplayName(WrappedComponent)})`
        render() {
          return (
            <WrappedComponent />
          );
        }
      }
      return Container;
    };

    class HelloWorld extends Component {
      render() {
        return (
          <div>Hello</div>
        );
      }
    }

    const HelloWorldPrime = container(HelloWorld);

    expect(getDisplayName(HelloWorldPrime)).to.equal('Container(HelloWorld)');
    expect(HelloWorldPrime.displayName).to.equal('Container(HelloWorld)');
  });
});
