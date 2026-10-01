const catalogueHome = document.getElementById('catalogue-home');
const collectionPages = Array.from(document.querySelectorAll('.collection-page'));
const categoryCards = Array.from(document.querySelectorAll('[data-collection]'));
const backButtons = Array.from(document.querySelectorAll('.back-button'));

function showCollection(name, updateHistory = true) {
  const selectedCollection = document.getElementById(`collection-${name}`);

  if (!selectedCollection) {
    return;
  }

  catalogueHome.style.display = 'none';

  collectionPages.forEach((collection) => {
    collection.classList.remove('active');
    collection.setAttribute('aria-hidden', 'true');
  });

  selectedCollection.classList.add('active');
  selectedCollection.setAttribute('aria-hidden', 'false');

  if (updateHistory) {
    history.pushState({ collection: name }, '', `#${name}`);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showCatalogue(updateHistory = true) {
  collectionPages.forEach((collection) => {
    collection.classList.remove('active');
    collection.setAttribute('aria-hidden', 'true');
  });

  catalogueHome.style.display = 'block';

  if (updateHistory) {
    history.pushState({}, '', window.location.pathname);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openFromHash(updateHistory = false) {
  const name = window.location.hash.replace('#', '').trim();

  if (!name) {
    showCatalogue(false);
    return;
  }

  const collection = document.getElementById(`collection-${name}`);

  if (collection) {
    showCollection(name, updateHistory);
  } else {
    showCatalogue(false);
  }
}

categoryCards.forEach((card) => {
  card.addEventListener('click', (event) => {
    event.preventDefault();
    showCollection(card.dataset.collection);
  });
});

backButtons.forEach((button) => {
  button.addEventListener('click', () => {
    showCatalogue();
  });
});

window.addEventListener('popstate', () => {
  openFromHash(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && document.querySelector('.collection-page.active')) {
    showCatalogue();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  openFromHash(false);
});
/* =========================================================
   HIDE HEADER WHILE SCROLLING DOWN
   SHOW HEADER WHILE SCROLLING UP
========================================================= */

const catalogueHeader =
    document.querySelector(".catalogue-header");

let lastScrollY =
    window.scrollY;

let scrollDifference =
    0;


window.addEventListener("scroll", () => {

    if (!catalogueHeader) {
        return;
    }


    const currentScrollY =
        window.scrollY;


    /*
       Always show header when we're
       very close to the top.
    */

    if (currentScrollY < 40) {

        catalogueHeader.classList.remove(
            "header-hidden"
        );

        lastScrollY =
            currentScrollY;

        return;

    }


    /*
       Scrolling DOWN
    */

    if (currentScrollY > lastScrollY) {

        catalogueHeader.classList.add(
            "header-hidden"
        );

    }


    /*
       Scrolling UP
    */

    else if (currentScrollY < lastScrollY) {

        catalogueHeader.classList.remove(
            "header-hidden"
        );

    }


    lastScrollY =
        Math.max(
            currentScrollY,
            0
        );

});
/* =========================================================
   HOME HEADER SCROLL BEHAVIOUR
========================================================= */

const siteHeader =
    document.querySelector(".site-header");

let previousScrollY =
    window.scrollY;


window.addEventListener("scroll", () => {

    if (!siteHeader) {
        return;
    }


    const currentScrollY =
        window.scrollY;


    /*
       Always visible at top
    */

    if (currentScrollY < 40) {

        siteHeader.classList.remove(
            "header-hidden"
        );

        previousScrollY =
            currentScrollY;

        return;

    }


    /*
       Down = hide
    */

    if (currentScrollY > previousScrollY) {

        siteHeader.classList.add(
            "header-hidden"
        );

    }


    /*
       Up = show
    */

    else {

        siteHeader.classList.remove(
            "header-hidden"
        );

    }


    previousScrollY =
        Math.max(
            currentScrollY,
            0
        );

});