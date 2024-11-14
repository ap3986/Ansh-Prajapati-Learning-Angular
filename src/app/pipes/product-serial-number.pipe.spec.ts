import { ProductSerialNumberPipe } from './product-serial-number.pipe';

describe('ProductSerialNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new ProductSerialNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
