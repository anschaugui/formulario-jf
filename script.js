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
    
        // Atualiza visualmente a seleção
        parentSection.querySelectorAll('.stair-option, .option').forEach(option => {
            option.classList.remove('selected');
        });
        element.classList.add('selected');
    
        // Atualiza o objeto de seleções
        selections[selectionType] = value;
    
        // Atualiza o background, se uma imagem for fornecida
        if (imagePath) {
            document.getElementById('image-container').style.backgroundImage = `url('img/${imagePath}')`;
        }
    
        // Mostra o modal se o usuário escolher "Não" em Design Help
        if (selectionType === 'designHelp' && value === 'Não') {
            openModal();
        }
    
        // Atualiza o botão "Next" para a próxima etapa dinamicamente
        if (selectionType === 'railingType') {
            const nextButton = document.getElementById('next-railing');
            if (nextButton) {
                nextButton.dataset.nextStep = 'tread-section';
                nextButton.disabled = false; // Habilita o botão, caso esteja desativado
            }
        }
    }
    

    // Atualiza o resumo final com as escolhas
    function updateSummary() {
        document.getElementById('summary-stair-type').textContent = selections.stairType || 'Not selected';
        document.getElementById('summary-stair-location').textContent = selections.stairLocation || 'Not selected'
        document.getElementById('summary-railing').textContent = selections.railingType || 'Not selected';
        document.getElementById('summary-tread').textContent = selections.treadType || 'Not selected';
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
    
        const railingOptions = document.getElementById('railing-options');
        const nextButton = document.getElementById('next-railing');
    
        if (value === 'Sim') {
            railingOptions.style.display = 'block'; // Mostra as opções de Railing
            nextButton.disabled = true; // Desativa o botão até que um tipo seja selecionado
        } else {
            railingOptions.style.display = 'none'; // Oculta as opções de Railing
            nextButton.dataset.nextStep = 'tread-section'; // Avança diretamente para Tread
            nextButton.disabled = false; // Habilita o botão "Next"
        }
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
        const stepIndex = parseInt(document.querySelector(`.step-header .step[data-step][class*="active"]`).dataset.step, 10) + 1;
    
        document.querySelectorAll('.step-header .step').forEach(step => step.classList.remove('active'));
        const stepToActivate = document.querySelector(`.step-header .step[data-step="${stepIndex}"]`);
        if (stepToActivate) {
            stepToActivate.classList.add('active');
        }
    }
    
    
