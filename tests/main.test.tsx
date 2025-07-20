describe('main.tsx', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
  });

  it('should mount App component without errors', async () => {
    await import('@/main');

    const rootElement = document.getElementById('root');
    expect(rootElement).not.toBeNull();
  });
});
