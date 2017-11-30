// demo

import { expect } from 'chai';
import 'mocha';

function demoFunUpper(str: string): string {
  return str.toUpperCase();
}

describe('加法函数的测试', () => {
  it('b upCase should return B', () => {
    expect(demoFunUpper('b')).to.be.equal('B');
  });
});
