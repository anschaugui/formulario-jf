const selections = {
    stairWidth: '',
    stairHeight: '',
    treadType: '',
    handrail: ''
};

// Open the modal
function openModal() {
    document.getElementById('design-help-modal').style.display = 'flex';
}

// Close the modal
function closeModal() {
    document.getElementById('design-help-modal').style.display = 'none';
}

// Função para abrir o modal de "Details"
function openDetailsModal() {
    const detailsModal = document.getElementById('details-modal');
    detailsModal.style.display = 'flex'; // Torna o modal visível
}

// Função para fechar o modal de "Details"
function closeDetailsModal() {
    const detailsModal = document.getElementById('details-modal');
    detailsModal.style.display = 'none'; // Oculta o modal
}

// Combina os eventos de clique para fechar ambos os modais
window.onclick = function (event) {
    const designHelpModal = document.getElementById('design-help-modal');
    const detailsModal = document.getElementById('details-modal');

    // Fecha o modal de "Need Design Help" se clicar fora dele
    if (event.target === designHelpModal) {
        designHelpModal.style.display = 'none';
    }

    // Fecha o modal de "Details" se clicar fora dele
    if (event.target === detailsModal) {
        detailsModal.style.display = 'none';
    }
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

    // Exibe ou esconde o banner
    const banner = document.getElementById('dimension-banner');
    if (stepNumber === 1) {
        banner.style.display = 'flex';
    } else {
        banner.style.display = 'none';
    }

    // Atualiza o resumo na etapa final
    if (stepNumber === 4) {
        updateSummary();
        activatePhoneMask();
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

    // Atualiza a imagem do container
    const imageUrl = `img/${imagePath}`;
    document.getElementById('image-container').style.backgroundImage = `url('${imageUrl}')`;
}

function updateSummary() {
    // Atualiza os elementos do resumo com base nas seleções
    document.getElementById('width-selection').textContent = selections.stairWidth || 'Not selected';
    document.getElementById('height-selection').textContent = selections.stairHeight || 'Not selected';
    document.getElementById('treadType-selection').textContent = selections.treadType || 'Not selected';
    document.getElementById('handrail-selection').textContent = selections.handrail || 'Not selected';
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
function mascaraTelefone(input) {
    let value = input.value.replace(/\D/g, ''); // Remove tudo que não for número
    
    // Limita o número de caracteres a 11
    if (value.length > 11) {
        value = value.slice(0, 11);
    }

    // Aplica a máscara no formato (XX) XXXXX-XXXX
    if (value.length <= 2) {
        value = `(${value}`;
    } else if (value.length <= 7) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    }

    input.value = value; // Atualiza o valor do campo
}

// Ativar a máscara no evento 'input'
document.addEventListener('DOMContentLoaded', function () {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function () {
            mascaraTelefone(phoneInput);
        });
    }
});
