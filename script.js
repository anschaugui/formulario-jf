    const selections = {
        stairType: '',
        stairLocation: '',
        designHelp: '',
        railingType: '',
        treadType: ''
    };

    // Abre o modal
    function openModal() {
        document.getElementById('design-help-modal').style.display = 'flex';
    }

    // Fecha o modal
    function closeModal() {
        document.getElementById('design-help-modal').style.display = 'none';
    }

    // Alterna a visibilidade do modal "Details"
    function openDetailsModal() {
        document.getElementById('details-modal').style.display = 'flex';
    }

    function closeDetailsModal() {
        document.getElementById('details-modal').style.display = 'none';
    }

    // Fecha os modais ao clicar fora deles
    window.onclick = function (event) {
        const designHelpModal = document.getElementById('design-help-modal');
        const detailsModal = document.getElementById('details-modal');

        if (event.target === designHelpModal) {
            designHelpModal.style.display = 'none';
        }
        if (event.target === detailsModal) {
            detailsModal.style.display = 'none';
        }
    };

    // Navega para a etapa especificada
    function goToStep(stepNumber) {
        const currentStep = document.querySelector('.form-section.active');
        if (currentStep) currentStep.classList.remove('active');

        document.querySelectorAll('.form-section')[stepNumber - 1].classList.add('active');

        document.querySelectorAll('.step-header .step').forEach(step => step.classList.remove('active'));
        document.querySelector(`.step-header .step[data-step="${stepNumber}"]`).classList.add('active');

        // Atualiza o resumo ao chegar no final
        if (stepNumber === 6) {
            updateSummary();
        }
    }

    // Seleciona uma opção genérica em qualquer etapa
    function selectOption(element, selectionType, value, imagePath = null) {
        const parentSection = element.closest('.form-section');

        parentSection.querySelectorAll('.stair-option, .option').forEach(option => {
            option.classList.remove('selected');
        });

        element.classList.add('selected');
        selections[selectionType] = value;

        if (imagePath) {
            document.getElementById('image-container').style.backgroundImage = `url('img/${imagePath}')`;
        }

        if (selectionType === 'designHelp' && value === 'Não') {
            openModal();
        }
    }

    // Atualiza o resumo final com as escolhas
    function updateSummary() {
        document.getElementById('stair-type-section').textContent = selections.stairType || 'Not selected';
        document.getElementById('stair-location').textContent = selections.stairLocation || 'Not selected';
        document.getElementById('design-help').textContent = selections.designHelp || 'Not selected';
        document.getElementById('handrail-selection').textContent = selections.railingType || 'Not selected';
        document.getElementById('tread-section').textContent = selections.treadType || 'Not selected';
    }

    // Máscara para telefone
    function mascaraTelefone(input) {
        let value = input.value.replace(/\D/g, '');

        if (value.length > 11) {
            value = value.slice(0, 11);
        }

        if (value.length <= 2) {
            value = `(${value}`;
        } else if (value.length <= 7) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        }

        input.value = value;
    }

    document.addEventListener('DOMContentLoaded', function () {
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', () => mascaraTelefone(phoneInput));
        }
    });

    // Gerencia a decisão sobre alterar o Railing
    function handleRailingDecision(element, value) {
        document.querySelectorAll('#design-help-section .stair-option').forEach(option => {
            option.classList.remove('selected');
        });
        element.classList.add('selected');

        const nextButton = document.getElementById('next-railing');
        nextButton.dataset.nextStep = value === 'Sim' ? 'railing-selection-section' : 'tread-section';
        nextButton.disabled = false;
    }

    // Avança para a próxima etapa com base na escolha
    function goToNextStep() {
        const nextButton = document.getElementById('next-railing');
        const nextStepId = nextButton.dataset.nextStep;
    
        if (!nextStepId) {
            console.error('Próxima etapa não definida!');
            return;
        }
    
        // Remove a classe "active" da seção atual
        const currentSection = document.querySelector('.form-section.active');
        if (currentSection) currentSection.classList.remove('active');
    
        // Adiciona a classe "active" à próxima seção
        const nextSection = document.getElementById(nextStepId);
        if (nextSection) {
            nextSection.classList.add('active');
        } else {
            console.error(`Seção com ID ${nextStepId} não encontrada.`);
            return;
        }
    
        // Atualiza o cabeçalho superior
        let stepIndex;
        if (nextStepId === 'railing-selection-section') {
            stepIndex = 4; // Permanece na etapa Railing
        } else if (nextStepId === 'tread-section') {
            stepIndex = 5; // Avança para a etapa Treads
        }
    
        document.querySelectorAll('.step-header .step').forEach(step => step.classList.remove('active'));
        const stepToActivate = document.querySelector(`.step-header .step[data-step="${stepIndex}"]`);
        if (stepToActivate) {
            stepToActivate.classList.add('active');
        }
    }
    
