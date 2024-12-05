const selections = {
    stairWidth: '',
    stairHeight: '',
    treadType: '',
    handrail: ''
};

function goToStep(stepNumber) {
    const currentStep = document.querySelector('.form-section.active');
    const currentStepIndex = Array.from(document.querySelectorAll('.form-section')).indexOf(currentStep);

    // Validação antes de avançar
    if (stepNumber > currentStepIndex + 1) {
        if (!validateStep(currentStepIndex + 1)) {
            return;
        }
    }

    // Muda a seção ativa
    document.querySelectorAll('.form-section').forEach(section => section.classList.remove('active'));
    document.querySelectorAll('.step-header .step').forEach(step => step.classList.remove('active'));

    document.querySelector(`.form-section:nth-child(${stepNumber + 1})`).classList.add('active');
    document.querySelector(`.step-header .step[data-step="${stepNumber}"]`).classList.add('active');

    // Controla a exibição do banner na etapa "Dimension"
    const banner = document.getElementById('dimension-banner');
    if (stepNumber === 2) { // Supondo que a etapa "Dimension" seja a segunda
        banner.style.display = 'flex'; // Exibe o banner
    } else {
        banner.style.display = 'none'; // Esconde o banner em outras etapas
    }

    if (stepNumber === 4) {
        updateSummary();
        activatePhoneMask(); // Ativa a máscara de telefone apenas no resumo
    }
}

function validateStep(stepNumber) {
    switch (stepNumber) {
        case 1:
            if (!selections.stairWidth || !selections.stairHeight) {
                alert('Please select both the width and height!');
                return false;
            }
            break;
        case 2:
            if (!selections.treadType) {
                alert('Please select a tread type!');
                return false;
            }
            break;
        case 3:
            if (!selections.handrail) {
                alert('Please select a handrail!');
                return false;
            }
            break;
        default:
            return true;
    }
    return true;
}

function selectOption(element, selectionType, value, imagePath) {
    // Remove seleções anteriores na mesma categoria
    document.querySelectorAll(`.option`).forEach(option => option.classList.remove('selected'));
    element.classList.add('selected');

    // Atualiza o valor selecionado
    selections[selectionType] = value;

    // Atualiza a imagem do container com a nova imagem selecionada
    const imageUrl = `img/${imagePath}`;
    document.getElementById('image-container').style.backgroundImage = `url('${imageUrl}')`;
}


function updateSummary() {
    document.getElementById('summary-width').textContent = selections.stairWidth || 'Not selected';
    document.getElementById('summary-height').textContent = selections.stairHeight || 'Not selected';
    document.getElementById('summary-treadType').textContent = selections.treadType || 'Not selected';
    document.getElementById('summary-handrail').textContent = selections.handrail || 'Not selected';
}

// Atualiza as seleções de largura e altura
document.getElementById('stair-width').addEventListener('change', function () {
    selections.stairWidth = this.value;
});
document.getElementById('stair-height').addEventListener('change', function () {
    selections.stairHeight = this.value;
});

// Adiciona evento ao formulário de cadastro
document.getElementById('cadastro-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Formulário enviado com sucesso!');
});

// Máscara para o campo de telefone
function activatePhoneMask() {
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function () {
        let value = this.value.replace(/\D/g, ''); // Remove tudo que não for número
        
        // Limita o número de caracteres a 11
        if (value.length > 11) {
            value = value.slice(0, 11);
        }
        
        // Aplica a máscara
        value = value.replace(/^(\d{2})(\d{5})(\d{0,4})$/, '($1) $2-$3');
        this.value = value;
    });
}

// Função para buscar a escada selecionada
async function loadStairDetails() {
    const params = new URLSearchParams(window.location.search);
    const stairId = params.get('stairId');

    if (!stairId) {
        alert('Nenhuma escada selecionada!');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/stairs/${stairId}`);
        const stair = await response.json();

        // Preencher os detalhes da escada
        const detailsContainer = document.getElementById('stair-details');
        detailsContainer.innerHTML = `
            <img src="${stair.image}" alt="${stair.name}" style="max-width: 100%; height: auto;" />
            <h2>${stair.name}</h2>
            <p>${stair.description}</p>
            <span class="price-level">${stair.priceLevel}</span>
        `;
    } catch (error) {
        console.error('Erro ao carregar os detalhes da escada:', error);
    }
}

// Carregar os detalhes ao iniciar
loadStairDetails();
