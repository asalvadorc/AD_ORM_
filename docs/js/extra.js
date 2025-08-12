document.querySelectorAll('pre').forEach((block) => {
    const button = document.createElement('button');
    button.innerText = 'Copy';
    button.classList.add('copy-button');
    block.parentNode.insertBefore(button, block);
  
    button.addEventListener('click', () => {
      navigator.clipboard.writeText(block.innerText).then(() => {
        button.innerText = 'Copied!';
        setTimeout(() => (button.innerText = 'Copy'), 2000);
      });
    });
  });
  