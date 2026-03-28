export const createStatCard = (label, value) => {
  const card = document.createElement('div');
  card.classList.add('stat-card');

  const labelElement = document.createElement('p');
  labelElement.textContent = label;

  const valueElement = document.createElement('p');
  valueElement.textContent = value;

  card.appendChild(labelElement);
  card.appendChild(valueElement);

  return card;
};
