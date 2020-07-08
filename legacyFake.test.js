describe('legacy fake timers', () => {
  jest.useFakeTimers('legacy');

  test('Promise.race without "then"', async () => {
    const shortPromise = new Promise(resolve => setTimeout(() => resolve('short'), 1000));
    const longPromise = new Promise(resolve => setTimeout(() => resolve('long'), 2000));
    
    const racedPromise = Promise.race([shortPromise, longPromise]);

    jest.runAllTimers();
    const result = await racedPromise;

    expect(result).toBe('short');
  });

  test('Promise.race with "then"', async () => {
    const shortPromise = new Promise(resolve => setTimeout(resolve, 1000)).then(() => 'short');
    const longPromise = new Promise(resolve => setTimeout(() => resolve('long'), 2000));
    
    const racedPromise = Promise.race([shortPromise, longPromise]);

    jest.runAllTimers();
    const result = await racedPromise;
    
    // Surprise! It's 'long'.
    expect(result).toBe('short');
  });
});
