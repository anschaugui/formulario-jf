
async function loadStaircases() {
    const response = await fetch('backend/package.json'); // Atualize para a URL do seu JSON
    const staircases = await response.json();

    const galleryContainer = document.getElementById('staircase-gallery');
    const customizationForm = document.getElementById('customization-form');
    const previewImage = document.getElementById('preview-image');

    staircases.forEach(staircase => {
        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = staircase.imageUrl;
        img.alt = staircase.name;

        const title = document.createElement('h3');
        title.classList.add('card-title');
        title.textContent = staircase.name;

        const button = document.createElement('button');
        button.textContent = 'Personalizar';
        button.onclick = () => {
            customizationForm.style.display = 'block';
            previewImage.src = staircase.imageUrl;

            const stepSelect = document.getElementById('step-select');
            const handrailSelect = document.getElementById('handrail-select');

            // Atualiza o preview conforme as seleções
            stepSelect.onchange = () => {
                const stepImage = staircase.options.steps[stepSelect.value];
                previewImage.src = stepImage || previewImage.src;
            };

            handrailSelect.onchange = () => {
                const handrailImage = staircase.options.handrails[handrailSelect.value];
                previewImage.src = handrailImage || previewImage.src;
            };
        };

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(button);
        galleryContainer.appendChild(card);
    });
}

loadStaircases();