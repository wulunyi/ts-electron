// demo

import { expect } from 'chai';
import 'mocha';
import demoFunUpper from '../src/main';

describe('加法函数的测试', () => {
  it('a upCase should return A', () => {
    expect(demoFunUpper('b')).to.be.equal('A');
  });
});