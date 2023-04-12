(function () {
  let currentPath;
  const currentPathElement = document.querySelector('#currentPath');
  const iframeElement = document.querySelector('#iframe');

  function handleClickNavButton(e) {
    currentPath = e.target.dataset.href;
    document.querySelector('#nav .current')?.classList.remove('current');
    e.target.classList.add('current');
    currentPathElement.href = currentPath;
    currentPathElement.innerHTML = currentPath;
    iframeElement.src = currentPath;
  }

  function initialize() {
    document.querySelectorAll('#nav button').forEach((button) => {
      button.addEventListener('click', handleClickNavButton);
    });

    const firstNavButtonElement = document.querySelector('#nav button');
    firstNavButtonElement?.click();
  }

  initialize();
})();
