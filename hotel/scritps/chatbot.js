document.addEventListener("DOMContentLoaded", () => {
    const chatbotButton = document.getElementById("chatbot-button");
    const chatbotWindow = document.getElementById("chatbot-window");
    const closeChat = document.getElementById("close-chat");
    const chatMessages = document.getElementById("chatbot-messages");
    const botMenu = document.getElementById("bot-menu");

    const responses = {
        servicos: `
            <strong>Nossos Serviços</strong><br>
            Oferecemos uma variedade de facilidades para sua estadia:
            <ul>
                <li>Internet Gratuita de Alta Velocidade</li>
                <li>Serviço de Quarto 24h</li>
                <li>Estacionamento Privativo</li>
                <li>Restaurante Gourmet</li>
                <li>Lavanderia</li>
            </ul>
        `,
        acomodacoes: `
            <strong>Nossas Acomodações</strong><br>
            Temos o quarto perfeito para você, incluindo:
            <ul>
                <li>Suíte Master</li>
                <li>Suíte Nupcial</li>
                <li>Quarto Superior</li>
            </ul>
            Todos com o máximo de conforto e elegância.
        `,
        localizacao: `
            <strong>Localização & Contato</strong><br>
            Estamos na Av. Interventor Manoel Ribas, 490, em União da Vitória - PR.<br><br>
            <b>Telefone/WhatsApp:</b><br> (42) 3251-1600
        `,
        reservas: `
            Para fazer sua reserva, por favor, clique no botão <strong>"Reservas"</strong> no canto superior direito da página ou entre em contato diretamente conosco pelo WhatsApp.
        `,
        default: "Desculpe, não entendi essa opção. Por favor, escolha uma das opções do menu."
    };

    // --- FUNÇÕES DO CHAT ---

    const scrollToBottom = () => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const addBotMessage = (htmlContent) => {
        const div = document.createElement("div");
        div.className = "bot-msg";
        div.innerHTML = htmlContent; 
        chatMessages.appendChild(div);
        scrollToBottom();
    };
    
    const addUserMessage = (textContent) => {
        const div = document.createElement("div");
        div.className = "user-msg";
        div.textContent = textContent;
        chatMessages.appendChild(div);
        scrollToBottom();
    };

    const showTypingIndicator = () => {
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('typing-indicator');
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(typingIndicator);
        scrollToBottom();
    };

    const hideTypingIndicator = () => {
        const indicator = chatMessages.querySelector('.typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    };
    
    const addBackButton = () => {
        const wrapper = document.createElement("div");
        wrapper.className = "bot-menu"; 
        const btn = document.createElement("button");
        btn.textContent = "Voltar ao menu principal";
        btn.className = "menu-btn";
        btn.addEventListener("click", resetChat);
        wrapper.appendChild(btn);
        chatMessages.appendChild(wrapper);
        scrollToBottom();
    };

    const resetChat = () => {
        chatMessages.innerHTML = ''; 
        addBotMessage("Olá! Sou o assistente do Hotel Riad. Como posso ajudar?");
        chatMessages.appendChild(botMenu); 
        scrollToBottom();
    };

    const handleOption = (option, optionText) => {
        addUserMessage(optionText);
        if (botMenu.parentNode === chatMessages) {
            chatMessages.removeChild(botMenu);
        }

        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();
            const botResponse = responses[option] || responses.default;
            addBotMessage(botResponse);
            
            addBackButton();
        }, 1200); 
    };



    chatbotButton.addEventListener("click", () => {
        chatbotWindow.style.display = "flex";
        chatbotButton.style.display = "none";
    });

    closeChat.addEventListener("click", () => {
        chatbotWindow.style.display = "none";
        chatbotButton.style.display = "flex";
    });

    botMenu.addEventListener("click", (e) => {
        if (e.target.classList.contains("menu-btn")) {
            const option = e.target.getAttribute("data-option");
            const optionText = e.target.textContent;
            handleOption(option, optionText);
        }
    });

    resetChat();
});