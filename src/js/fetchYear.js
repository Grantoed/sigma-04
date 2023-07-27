function updateCopyrightYear() {
  const currentYear = new Date().getFullYear();
  const copyrightYearElement = document.querySelector('#copyrightYear');
  copyrightYearElement.textContent = currentYear;
}

updateCopyrightYear();
